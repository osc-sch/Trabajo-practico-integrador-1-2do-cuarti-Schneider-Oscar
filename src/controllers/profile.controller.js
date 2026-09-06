import { matchedData } from "express-validator"
import { ProfileModel } from "../models/profile.model.js"


export const createProfile = async (req,res)=>{
    try {
        const validateData = matchedData(req)

        const newProfile = await ProfileModel.create(validateData)

        return res.status(201).json({message:"Exito al crear el Perfil", profile:newProfile})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el Perfil",error})
    }
    
}

export const getAllProfiles = async (req,res) =>{
    try {
        const profile = await ProfileModel.findAll()
        return res.status(200).json({profile})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los Perfils",error})
    }
}

export const getProfileByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const profile = await ProfileModel.findByPk(id)
        return res.status(200).json({profile})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el Perfil",error})
    }
}

export const updateProfile = async (req,res) =>{
    try {
        const dataValidated = matchedData(req,{locations:['body']})
        const {id} =  matchedData(req,{locations:['params']})

        console.log(id)

        const profileExist = await ProfileModel.findByPk(id)

        if (!profileExist) {
            return res.status(404).json({message:"Perfil no encontrado"})
        }

        const profile = await profileExist.update(dataValidated)
        return res.status(200).json({message:"Perfil actualizado exitosamente ",profile})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al actualizar el Perfil",error})
    }
}

export const deleteProfile = async (req,res) =>{
    try {

        const {id} = req.params

        const profileExist = await ProfileModel.findByPk(id)

        if (!profileExist) {
            return res.status(404).json({message:"Perfil no encontrado"})
        }

        const profile = await profileExist.destroy()
        return res.status(200).json({message:"Perfil eliminado exitosamente ",profile})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al eliminar el Perfil",error})
    }
}
