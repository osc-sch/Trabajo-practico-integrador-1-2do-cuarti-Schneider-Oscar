import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createTag, deleteTag, getAllTags, getTagByPK, updateTag } from "../controllers/tags.controller.js";
import { createTagValidations, updateTagValidations } from "../middlewares/validations/tags.validations.js";

export const tagRoutes = Router();

tagRoutes.get('/api/tag',getAllTags)
tagRoutes.get('/api/tag/:id',getTagByPK)
tagRoutes.post('/api/tag',createTagValidations,validate,createTag)
tagRoutes.put('/api/tag/:id',updateTagValidations,validate,updateTag)
tagRoutes.delete('/api/tag/:id',deleteTag)