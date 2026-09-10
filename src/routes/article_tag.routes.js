import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createArticleTag, deleteArticleTag } from "../controllers/article_tag.controller.js";
import { createArticleTagValidations } from "../middlewares/validations/article_tag.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { param } from "express-validator";

export const articleTagRoutes = Router();

articleTagRoutes.post('/api/articleTag',authMiddleware,ownerMiddleware,createArticleTagValidations,validate,createArticleTag)
articleTagRoutes.post('/api/articles-tags',authMiddleware,ownerMiddleware,createArticleTagValidations,validate,createArticleTag)
articleTagRoutes.delete('/api/articleTag/:id',authMiddleware,deleteArticleTag)
articleTagRoutes.delete('/api/articles-tags/:id',authMiddleware,param('id').isInt({min:1}).withMessage('El ID de la relacion debe ser un entero positivo'),validate,deleteArticleTag)