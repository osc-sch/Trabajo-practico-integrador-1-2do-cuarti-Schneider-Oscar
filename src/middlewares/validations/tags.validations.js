import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('La etiqueta debe tener un nombre')
        .isLength({min:2,max:30})
        .withMessage('La etiqueta debe tener un nombre de minimo 2 caracteres y como maximo 30')
        .matches(/^\S+$/)
        .withMessage('La etiqueta no debe contener espacios')
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
        .isInt({min:1})
        .withMessage('El ID del tag debe ser un entero positivo')
        .custom(async (id) => {
            if (!await TagModel.findByPk(id)) {
                throw new Error('El tag no existe')
            }
            return true
        }),
    body('name')
        .trim()
        .optional()
        .isLength({min:2,max:30})
        .withMessage('La etiqueta debe tener un nombre de minimo 2 caracteres y como maximo 30')
        .matches(/^\S+$/)
        .withMessage('La etiqueta no debe contener espacios')
        .custom(async (name, { req }) =>{
            const existTag = await TagModel.findOne({where:{name}})
            if(existTag && String(existTag.id) !== String(req.params.id)){
                throw new Error('Ya existe esta etiquetas')
            }
            return true
        })    
]