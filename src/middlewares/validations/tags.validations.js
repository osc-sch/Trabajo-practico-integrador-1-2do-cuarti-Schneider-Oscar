import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('La etiqueta debe tener un nombre')
        .isLength({min:2,max:30})
        .withMessage('La etiqueta debe tener un nombre de minimo 2 caracteres y como maximo 30')
        .custom(async (name) =>{
            const existTag = await TagModel.findOne({where:{name}})
            if(existTag){
                throw new Error('Ya existe esta etiquetas')
            }
            return true
        })    
]

export const updateTagValidations = [
    param('id')
        .notEmpty()
        .withMessage('debe haber ID del tag'),
    body('name')
        .trim()
        .optional()
        .isLength({min:2,max:30})
        .withMessage('La etiqueta debe tener un nombre de minimo 2 caracteres y como maximo 30')
        .custom(async (name) =>{
            const existTag = await TagModel.findOne({where:{name}})
            if(existTag){
                throw new Error('Ya existe esta etiquetas')
            }
            return true
        })    
]