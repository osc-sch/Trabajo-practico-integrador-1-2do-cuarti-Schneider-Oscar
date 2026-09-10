import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginValidations, registerValidations } from "../middlewares/validations/auth.validations.js";
import { getAuthenticatedProfile, login, logout, register, updateAuthenticatedProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authenticatedProfileValidations } from "../middlewares/validations/profile.validations.js";

export const authRoutes = Router();

authRoutes.post('/api/register',registerValidations,validate,register)
authRoutes.post('/api/login',loginValidations,validate,login)
authRoutes.post('/api/auth/register',registerValidations,validate,register)
authRoutes.post('/api/auth/login',loginValidations,validate,login)
authRoutes.get('/api/auth/profile',authMiddleware,getAuthenticatedProfile)
authRoutes.put('/api/auth/profile',authMiddleware,authenticatedProfileValidations,validate,updateAuthenticatedProfile)
authRoutes.post('/api/auth/logout',authMiddleware,logout)
authRoutes.get('/api/logout',authMiddleware,logout)
authRoutes.get('/api/home',authMiddleware,(req,res) =>{
    res.status(200).json({message:'paso la auth',data: req.userData})
})
