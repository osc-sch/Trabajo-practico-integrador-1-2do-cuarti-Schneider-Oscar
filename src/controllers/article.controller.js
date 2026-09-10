import { matchedData } from "express-validator"
import { ArticleModel } from "../models/article.model.js"

export const createArticle = async (req,res)=>{
    try {
        const validateData = matchedData(req)

        const newArticle = await ArticleModel.create(validateData)

        return res.status(201).json({message:"Exito al crear un articulo", article:newArticle})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el articulo",error})
    }
    
}

export const getAllMyArticles = async (req,res) =>{
    try {

        const { user_id, rol } = req.userData

        if (rol !== "admin" && rol !== "user") {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        const articles = await ArticleModel.findAll({where:{user_id}})

        return res.status(200).json({articles})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los articulos",error})
    }
}

export const getAllArticles = async (req,res) =>{
    try {
        const articles = await ArticleModel.findAll()
        return res.status(200).json({articles})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer los articulos",error})
    }
}

export const getArticleByPK = async (req,res) =>{
    try {
        const {id} = req.params
        const article = await ArticleModel.findByPk(id)
        return res.status(200).json({article})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el articulo",error})
    }
}

export const getMyArticleByPK = async (req,res) =>{
    try {

        const { user_id, rol } = req.userData

        if (rol !== "admin" && rol !== "user") {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        const { id } = req.params
        console.log(id)
        const article = await ArticleModel.findAll({where:{user_id,id}})
        return res.status(200).json({article})
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al extraer el articulo",error})
    }
}

export const updateArticle = async (req,res) =>{
    try {

        const {user_id,rol} = req.userData

        const dataValidated = matchedData(req,{locations:['body']})
        const {id} =  matchedData(req,{locations:['params']})

        const articleExist = await ArticleModel.findByPk(id)

        
        if (!articleExist) {
            return res.status(404).json({message:"articulo no encontrado"})
        }
        
        if (rol !== 'admin' && articleExist.user_id !== user_id) {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        const article = await articleExist.update(dataValidated)
        return res.status(200).json({message:"articulo actualizado exitosamente ",article})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al actualizar el articulo",error})
    }
}

export const deleteArticle = async (req,res) =>{
    try {

        const {user_id,rol} = req.userData

        const {id} = req.params

        const articleExist = await ArticleModel.findByPk(id)

        if (!articleExist) {
            return res.status(404).json({message:"articulo no encontrado"})
        }

        if (rol !== 'admin' && articleExist.user_id !== user_id) {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        const article = await articleExist.destroy()
        return res.status(200).json({message:"articulo eliminado exitosamente ",article})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al eliminar el articulo",error})
    }
}
