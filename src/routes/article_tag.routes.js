import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createArticleTag, deleteArticleTag } from "../controllers/article_tag.controller.js";
import { createArticleTagValidations } from "../middlewares/validations/article_tag.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const articleTagRoutes = Router();

articleTagRoutes.post('/api/articleTag',authMiddleware,createArticleTagValidations,validate,createArticleTag)
articleTagRoutes.delete('/api/articleTag/:id',authMiddleware,deleteArticleTag)