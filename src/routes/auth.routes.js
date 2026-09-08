import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginValidations, registerValidations } from "../middlewares/validations/auth.validations.js";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

authRoutes.post('/api/register',registerValidations,validate,register)
authRoutes.post('/api/login',loginValidations,validate,login)
authRoutes.get('/api/logout',logout)
authRoutes.get('/api/home',authMiddleware,(req,res) =>{
    res.status(200).json({message:'paso la auth',data: req.dataUser})
})
