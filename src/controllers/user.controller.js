import { matchedData } from "express-validator"
import { UserModel } from "../models/user.model.js"

export const createUser = async (req,res)=>{
    try {
        const validateData = matchedData(req)

        const newUser = await UserModel.create(validateData)

        return res.status(201).json({message:"Exito al crear el usuario", user:newUser})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error al crear el usuario"})
    }
    
}