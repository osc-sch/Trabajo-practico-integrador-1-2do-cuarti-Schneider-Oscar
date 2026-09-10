import { matchedData } from "express-validator"
import { UserModel } from "../models/user.model.js"
import { ProfileModel } from "../models/profile.model.js"
import { ArticleModel } from "../models/article.model.js"
import { hashPassword } from "../helpers/bcript.helper.js"

export const createUser = async (req,res)=>{
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
    
        return res.status(201).json({message:'se creo el usuario correctamente'})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el usuario",error})
    }
    
}

export const getAllUsers = async (req,res) =>{
    try {
        const users = await UserModel.findAll({
            include: { model: ProfileModel, as: 'profile' },
            attributes: { exclude: ['password'] }
        })
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los usuarios",error})
    }
}

export const getUserByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const user = await UserModel.findByPk(id, {
            include: [
                { model: ProfileModel, as: 'profile' },
                {model: ArticleModel, as:'articles'}
            ],
            attributes: { exclude: ['password'] }

        })
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el usuario",error})
    }
}

export const updateUser = async (req,res) =>{
    try {
        const dataValidated = matchedData(req,{locations:['body']})
        const {id} =  matchedData(req,{locations:['params']})

        console.log(id)

        const userExist = await UserModel.findByPk(id)

        if (!userExist) {
            return res.status(404).json({message:"usuario no encontrado"})
        }

        if (dataValidated.password) {
            dataValidated.password = await hashPassword(dataValidated.password)
        }

        const user = await userExist.update(dataValidated)
        return res.status(200).json({message:"Usuario actualizado exitosamente ",user})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al actualizar el usuario",error})
    }
}

export const deleteUser = async (req,res) =>{
    try {
        const {id} = req.params

        const userExist = await UserModel.findByPk(id)

        if (!userExist) {
            return res.status(404).json({message:"usuario no encontrado"})
        }

        const user = await userExist.destroy()
        return res.status(200).json({message:"Usuario eliminado exitosamente ",user})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al eliminar el usuario",error})
    }
}
