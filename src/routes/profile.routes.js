import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfile, deleteProfile, getAllProfiles, getProfileByPK, updateProfile } from "../controllers/profile.controller.js";
import { createProfileValidations, updatedProfileValidations } from "../middlewares/validations/profile.validations.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const profileRoutes = Router();

profileRoutes.get('/api/profile',authMiddleware,adminMiddleware,getAllProfiles)
profileRoutes.get('/api/profile/:id',authMiddleware,adminMiddleware,getProfileByPK)
profileRoutes.post('/api/profile',authMiddleware,adminMiddleware,createProfileValidations,validate,createProfile)
profileRoutes.put('/api/profile/:id',authMiddleware,adminMiddleware,updatedProfileValidations,validate,updateProfile)
profileRoutes.delete('/api/profile/:id',authMiddleware,adminMiddleware,deleteProfile)