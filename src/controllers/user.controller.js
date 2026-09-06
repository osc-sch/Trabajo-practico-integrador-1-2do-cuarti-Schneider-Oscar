import { matchedData } from "express-validator"
import { UserModel } from "../models/user.model.js"

export const createUser = async (req,res)=>{
    try {
        const validateData = matchedData(req)

        const newUser = await UserModel.create(validateData)

        return res.status(201).json({message:"Exito al crear el usuario", user:newUser})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el usuario",error})
    }
    
}

export const getAllUsers = async (req,res) =>{
    try {
        const users = await UserModel.findAll()
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los usuarios",error})
    }
}

export const getUserByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const user = await UserModel.findByPk(id)
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
