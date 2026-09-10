import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createArticle, deleteArticle, getAllArticles, getAllMyArticles, getArticleByPK, getMyArticleByPK, updateArticle } from "../controllers/article.controller.js";
import { createArticleValidations, updateArticleValidations } from "../middlewares/validations/article.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const articleRoutes = Router();

articleRoutes.get('/api/article',authMiddleware,getAllArticles)
articleRoutes.get('/api/articles',authMiddleware,getAllArticles)
articleRoutes.get('/api/article/user',authMiddleware,getAllMyArticles)
articleRoutes.get('/api/articles/user',authMiddleware,getAllMyArticles)
articleRoutes.get('/api/article/user/:id',authMiddleware,ownerMiddleware,getMyArticleByPK)
articleRoutes.get('/api/articles/user/:id',authMiddleware,ownerMiddleware,getMyArticleByPK)
articleRoutes.get('/api/article/:id',authMiddleware,getArticleByPK)
articleRoutes.get('/api/articles/:id',authMiddleware,getArticleByPK)
articleRoutes.post('/api/article',authMiddleware,createArticleValidations,validate,createArticle)
articleRoutes.post('/api/articles',authMiddleware,createArticleValidations,validate,createArticle)
articleRoutes.put('/api/article/:id',authMiddleware,ownerMiddleware,updateArticleValidations,validate,updateArticle)
articleRoutes.put('/api/articles/:id',authMiddleware,ownerMiddleware,updateArticleValidations,validate,updateArticle)
articleRoutes.delete('/api/article/:id',authMiddleware,ownerMiddleware,deleteArticle)
articleRoutes.delete('/api/articles/:id',authMiddleware,ownerMiddleware,deleteArticle)