import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createTag, deleteTag, getAllTags, getTagByPK, updateTag } from "../controllers/tags.controller.js";
import { createTagValidations, updateTagValidations } from "../middlewares/validations/tags.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const tagRoutes = Router();

tagRoutes.get('/api/tag',authMiddleware,getAllTags)
tagRoutes.get('/api/tag/:id',authMiddleware,getTagByPK)
tagRoutes.post('/api/tag',authMiddleware,createTagValidations,validate,createTag)
tagRoutes.put('/api/tag/:id',authMiddleware,updateTagValidations,validate,updateTag)
tagRoutes.delete('/api/tag/:id',authMiddleware,deleteTag)