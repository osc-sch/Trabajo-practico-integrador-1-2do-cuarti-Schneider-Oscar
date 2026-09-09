import { matchedData } from "express-validator"
import { ArticleTagModel } from "../models/article_tag.model.js"
import { ArticleModel } from "../models/article.model.js"

export const createArticleTag = async (req,res) => {
    try {
        const {user_id,rol} = req.userData

        if (rol !== 'admin' && rol !== 'user') {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        const {article_id, tag_id} = matchedData(req)

        const existArticle = await ArticleModel.findByPk(article_id)

        if (!existArticle) {
            return res.status(404).json({message:"no existe el articulo"})
        }

        if (existArticle.user_id !== user_id) {
            return res.status(401).json({message:"usuario no autorizado"})
        }

        await ArticleTagModel.create({article_id, tag_id})

        return res.status(201).json({message:"se agragron los tags al articulo correctamente"})
        
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error",error})
    }
}

export const deleteArticleTag = async (req,res) => {
    try {

        const {id} = req.params

        const {user_id,rol} = req.userData

        if (rol !== 'admin' && rol !== 'user') {
            return res.status(401).json({ message: "usuario no autorizado" })
        }

        const existArticle = await ArticleModel.findByPk(id)

        if (!existArticle) {
            return res.status(404).json({message:"no existe el articulo"})
        }

        if (existArticle.user_id !== user_id) {
            return res.status(401).json({message:"usuario no autorizado"})
        }


        if (!existArticleTag) {
            return res.status(404).json({message:"no existe esa relacion"})
        }

        await existArticleTag.destroy()

        return res.status(201).json({message:"se eliminaron los tags al articulo correctamente"})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error",error})
    }
}