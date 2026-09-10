import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserByPK, updateUser } from "../controllers/user.controller.js";
import { createUserValidations, updateUserValidations } from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidations } from "../middlewares/validations/auth.validations.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const userRoutes = Router();

userRoutes.get('/api/users',authMiddleware,adminMiddleware,getAllUsers)
userRoutes.get('/api/users/:id',authMiddleware,adminMiddleware,getUserByPK)
userRoutes.post('/api/users',authMiddleware,adminMiddleware,registerValidations,validate,createUser)
userRoutes.put('/api/users/:id',authMiddleware,adminMiddleware,updateUserValidations,validate,updateUser)
userRoutes.delete('/api/users/:id',authMiddleware,adminMiddleware,deleteUser)