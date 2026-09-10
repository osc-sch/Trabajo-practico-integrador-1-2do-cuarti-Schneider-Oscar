import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcript.helper.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { generateToken } from "../helpers/jwt.helper.js";


export const register = async (req, res) => {
  try {
    const {username,email,password,role,...dataProfile} = matchedData(req,{locations:['body']})
 
    const hashedPassword = await hashPassword(password)

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role
    })

    const user_id = newUser.id

    await ProfileModel.create({
      ...dataProfile,
      user_id
    })

    return res.status(201).json({message:'se registro correctamente'})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor"});
  }
};

export const login = async (req,res) =>{
  try {
    const {username,password} = matchedData(req,{locations:['body']})

    const userExist = await UserModel.findOne({ where: { username } })
    

    if (!userExist) {
      return res.status(401).json({message:'credenciales invalidas'})
    }

    const validPassword = await comparePassword(password, userExist.password)
    

    if (!validPassword) {
      return res.status(401).json({message:'credenciales invalidas'})
    }

    console.log(userExist.role)
    const token = generateToken({ 
      user_id: userExist.id,
      username:userExist.username,
      rol:userExist.role });
    
    // Enviar token como cookie
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(201).json({message: "Usuario logueado correctamente"});

  } catch (error) {
    return res.status(500).json({ message: "Error al loguearse",error });
  }
}

export const logout = (req,res) =>{
  res.clearCookie("token"); // Eliminar cookie del navegador
  return res.json({ message: "Logout exitoso" });
}

export const getAuthenticatedProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      where: { user_id: req.userData.user_id },
      include: { model: UserModel, as: 'user', attributes: { exclude: ['password'] } }
    })

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' })
    }

    return res.status(200).json({ profile })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el perfil', error })
  }
}

export const updateAuthenticatedProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ['body'] })
    const profile = await ProfileModel.findOne({ where: { user_id: req.userData.user_id } })

    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' })
    }

    const updatedProfile = await profile.update(data)
    return res.status(200).json({ message: 'Perfil actualizado exitosamente', profile: updatedProfile })
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el perfil', error })
  }
}