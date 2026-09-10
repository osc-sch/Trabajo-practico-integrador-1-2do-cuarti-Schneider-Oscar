import { body, param } from "express-validator";

export const createArticleValidations = [
    body('title')
        .notEmpty()
        .withMessage('El titulo no debe estar vacio')
        .isLength({min:3,max:200})
        .withMessage('El titulo debe tener entre 3 y 200 caracteres'),
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
    param('id')
        .isInt({min:1})
        .withMessage('El ID del articulo debe ser un entero positivo')
        .custom(async (id) => {
            const { ArticleModel } = await import('../../models/article.model.js')
            if (!await ArticleModel.findByPk(id)) {
                throw new Error('El articulo no existe')
            }
            return true
        }),
    body('title')
        .optional()
        .isLength({min:3,max:200})
        .withMessage('El titulo debe tener entre 3 y 200 caracteres'),
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