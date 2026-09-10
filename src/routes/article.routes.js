import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createArticle, deleteArticle, getAllArticles, getAllMyArticles, getArticleByPK, getMyArticleByPK, updateArticle } from "../controllers/article.controller.js";
import { createArticleValidations, updateArticleValidations } from "../middlewares/validations/article.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const articleRoutes = Router();

articleRoutes.get('/api/article',authMiddleware,getAllArticles)
articleRoutes.get('/api/article/user',authMiddleware,getAllMyArticles)
articleRoutes.get('/api/article/:id',authMiddleware,getArticleByPK)
articleRoutes.get('/api/article/user/:id',authMiddleware,ownerMiddleware,getMyArticleByPK)
articleRoutes.post('/api/article',authMiddleware,createArticleValidations,validate,createArticle)
articleRoutes.put('/api/article/:id',authMiddleware,ownerMiddleware,updateArticleValidations,validate,updateArticle)
articleRoutes.delete('/api/article/:id',authMiddleware,ownerMiddleware,deleteArticle)