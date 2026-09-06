import { body } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { TagModel } from "../../models/tag.model.js";

export const createArticleTagValidations = [
    body('article_id')
        .notEmpty()
        .withMessage('El ID del articulo es obligatorio')
        .isInt()
        .withMessage('El ID del articulo debe ser numerico')
        .custom( async (article_id) => {
            const existArticle = await ArticleModel.findOne({where:{id: article_id}})
            if (!existArticle) {
                throw new Error('El articulo no existe')
            } 
            return true
        }),
    body('tag_id')
        .notEmpty()
        .withMessage('El ID del articulo es obligatorio')
        .isInt()
        .withMessage('El ID del articulo debe ser numerico')
        .custom( async (tag_id) => {
            const existTag = await TagModel.findOne({where:{id: tag_id}})
            if (!existTag) {
                throw new Error('El Tag no existe')
            } 
            return true
        }),
]