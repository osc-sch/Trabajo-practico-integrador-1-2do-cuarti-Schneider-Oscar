import { matchedData } from "express-validator"
import { ArticleModel } from "../models/article.model.js"

export const createArticle = async (req,res)=>{
    try {
        const { user_id: ignoredUserId, ...articleData } = matchedData(req)
        const { user_id } = req.userData

        const newArticle = await ArticleModel.create({
            ...articleData,
            user_id
        })

        return res.status(201).json({message:"Exito al crear un articulo", article:newArticle})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el articulo",error})
    }
    
}

export const getAllMyArticles = async (req,res) =>{
    try {

        const { user_id } = req.userData

        const articles = await ArticleModel.findAll({where:{user_id, status: 'published'}})

        return res.status(200).json({articles})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los articulos",error})
    }
}

export const getAllArticles = async (req,res) =>{
    try {
        const articles = await ArticleModel.findAll({where:{status: 'published'}})
        return res.status(200).json({articles})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los articulos",error})
    }
}

export const getArticleByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const article = await ArticleModel.findByPk(id)
        if (!article) {
            return res.status(404).json({message:"articulo no encontrado"})
        }
        return res.status(200).json({article})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el articulo",error})
    }
}

export const getMyArticleByPK = async (req,res) =>{
    try {

        const { user_id } = req.userData

        const { id } = req.params
        const article = await ArticleModel.findOne({where:{user_id,id, status: 'published'}})
        if (!article) {
            return res.status(404).json({message:"articulo no encontrado"})
        }
        return res.status(200).json({article})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el articulo",error})
    }
}

export const updateArticle = async (req,res) =>{
    try {

        const { user_id: ignoredUserId, ...dataValidated } = matchedData(req,{locations:['body']})
        const {id} =  matchedData(req,{locations:['params']})

        const articleExist = await ArticleModel.findByPk(id)

        
        if (!articleExist) {
            return res.status(404).json({message:"articulo no encontrado"})
        }
        
        const article = await articleExist.update(dataValidated)
        return res.status(200).json({message:"articulo actualizado exitosamente ",article})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al actualizar el articulo",error})
    }
}

export const deleteArticle = async (req,res) =>{
    try {

        const {id} = req.params

        const articleExist = await ArticleModel.findByPk(id)

        if (!articleExist) {
            return res.status(404).json({message:"articulo no encontrado"})
        }

        const article = await articleExist.destroy()
        return res.status(200).json({message:"articulo eliminado exitosamente ",article})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al eliminar el articulo",error})
    }
}