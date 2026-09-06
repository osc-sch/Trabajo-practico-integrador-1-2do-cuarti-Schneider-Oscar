import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createProfile, deleteProfile, getAllProfiles, getProfileByPK, updateProfile } from "../controllers/profile.controller.js";
import { createProfileValidations, updatedProfileValidations } from "../middlewares/validations/profile.validations.js";

export const profileRoutes = Router();

profileRoutes.get('/api/profile',getAllProfiles)
profileRoutes.get('/api/profile/:id',getProfileByPK)
profileRoutes.post('/api/profile',createProfileValidations,validate,createProfile)
profileRoutes.put('/api/profile/:id',updatedProfileValidations,validate,updateProfile)
profileRoutes.delete('/api/profile/:id',deleteProfile)