import { matchedData } from "express-validator"
import { TagModel } from "../models/tag.model.js"
import {ArticleModel} from "../models/article.model.js"

export const createTag = async (req,res)=>{
    try {
        const validateData = matchedData(req)

        console.log(validateData)

        const newTag = await TagModel.create(validateData)

        return res.status(201).json({message:"Exito al crear el tag", tag:newTag})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el tag",error})
    }
    
}

export const getAllTags = async (req,res) =>{
    try {
        const tags = await TagModel.findAll()
        return res.status(200).json({tags})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los tags",error})
    }
}

export const getTagByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const tag = await TagModel.findByPk(id, {
            include:{model:ArticleModel, as: 'articles'}
        })
        if (!tag) {
            return res.status(404).json({message:"tag no encontrado"})
        }
        return res.status(200).json({tag})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el tag",error})
    }
}

export const updateTag = async (req,res) =>{
    try {
        const dataValidated = matchedData(req,{locations:['body']})
        const {id} =  matchedData(req,{locations:['params']})

        const tagExist = await TagModel.findByPk(id)

        if (!tagExist) {
            return res.status(404).json({message:"tag no encontrado"})
        }

        const tag = await tagExist.update(dataValidated)
        return res.status(200).json({message:"tag actualizado exitosamente ",tag})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al actualizar el tag",error})
    }
}

export const deleteTag = async (req,res) =>{
    try {
        const {id} = req.params

        const tagExist = await TagModel.findByPk(id)

        if (!tagExist) {
            return res.status(404).json({message:"tag no encontrado"})
        }

        const tag = await tagExist.destroy()
        return res.status(200).json({message:"tag eliminado exitosamente ",tag})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al eliminar el tag",error})
    }
}
