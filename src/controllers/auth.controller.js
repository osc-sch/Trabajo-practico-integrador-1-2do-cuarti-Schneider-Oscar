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