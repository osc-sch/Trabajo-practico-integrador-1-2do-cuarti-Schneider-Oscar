import { matchedData } from "express-validator"
import { ArticleTagModel } from "../models/article_tag.model.js"

export const createArticleTag = async (req,res) => {
    try {
        const validateData = matchedData(req)

        await ArticleTagModel.create(validateData)

        return res.status(201).json({message:"se agragron los tags al articulo correctamente"})
        
    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error",error})
    }
}

export const deleteArticleTag = async (req,res) => {
    try {
        const {id} = req.params

        console.log(id)

        const existArticleTag = await ArticleTagModel.findByPk(id)


        if (!existArticleTag) {
            return res.status(404).json({message:"no existe esa relacion"})
        }

        await existArticleTag.destroy()

        return res.status(201).json({message:"se eliminaron los tags al articulo correctamente"})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error",error})
    }
}