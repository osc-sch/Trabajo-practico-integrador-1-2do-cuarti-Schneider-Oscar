import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByPK, updateUser } from "../controllers/user.controller.js";
import { createUserValidations, updateUserValidations } from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidations } from "../middlewares/validations/auth.validations.js";

export const userRoutes = Router();

userRoutes.get('/api/users',authMiddleware,getAllUsers)
userRoutes.get('/api/users/:id',authMiddleware,getUserByPK)
userRoutes.post('/api/users',authMiddleware,registerValidations,validate,createUser)
userRoutes.put('/api/users/:id',authMiddleware,updateUserValidations,validate,updateUser)
userRoutes.delete('/api/users/:id',authMiddleware,deleteUser)