import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createArticleValidations = [
    body('title')
        .notEmpty()
        .withMessage('El titulo no debe estar vacio')
        .isLength({min:3,max:300})
        .withMessage('El titulo debe tener entre 3 y 300 caracteres'),
    body('content')
        .notEmpty()
        .withMessage('El contenido no debe estar vacio')
        .isLength({min:50})
        .withMessage('el minimo de caracteres es de 50'),
    body('excerpt')
        .optional()
        .isLength({max:500})
        .withMessage('El resumen debe tener maximo 500 caracteres'),
    body('status')
        .notEmpty()
        .withMessage('El estado no debe estar vacio')
        .custom((status) =>{
            if(status === 'published' || status === 'archived' ){
                console.log('Estados correctos')
            }else{
                throw new Error('Estado de no valido')
            }
            return true
        }),
]

export const updateArticleValidations = [
    param('id').notEmpty().withMessage('el ID del articulo no debe estar vacio'),
    body('title')
        .optional()
        .isLength({min:3,max:300})
        .withMessage('El titulo debe tener entre 3 y 300 caracteres'),
    body('content')
        .optional()
        .isLength({min:50})
        .withMessage('el minimo de caracteres es de 50'),
    body('excerpt')
        .optional()
        .isLength({max:500})
        .withMessage('El resumen debe tener maximo 500 caracteres'),
    body('status')
        .optional()
        .custom((status) =>{
            if(status == 'published' || status == 'archived' ){
                console.log('Estados correctos')
            }else{
                throw new Error('Estado de no valido')
            }
            return true
        }),
]