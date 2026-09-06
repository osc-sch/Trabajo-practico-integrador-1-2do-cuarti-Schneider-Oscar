import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createArticle, deleteArticle, getAllArticles, getArticleByPK, updateArticle } from "../controllers/article.controller.js";
import { createArticleValidations, updateArticleValidations } from "../middlewares/validations/article.validations.js";

export const articleRoutes = Router();

articleRoutes.get('/api/article',getAllArticles)
articleRoutes.get('/api/article/:id',getArticleByPK)
articleRoutes.post('/api/article',createArticleValidations,validate,createArticle)
articleRoutes.put('/api/article/:id',updateArticleValidations,validate,updateArticle)
articleRoutes.delete('/api/article/:id',deleteArticle)