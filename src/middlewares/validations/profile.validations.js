import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";

export const createProfileValidations = [
    body('user_id')
        .notEmpty()
        .withMessage('el Id de usuario es obligatorio'),
    body('first_name')
        .notEmpty()
        .withMessage('el first_name no debe estar vacio')
        .isLength({min:2,max:50})
        .withMessage('El first_name debe tener entre 2 y 50 caracteres')
        .isString()
        .withMessage('solo debe tener letras'),
    body('last_name')
        .notEmpty()
        .withMessage('el last_name no debe estar vacio')
        .isLength({min:2,max:50})
        .withMessage('El last_name debe tener entre 2 y 50 caracteres')
        .isString()
        .withMessage('solo debe tener letras'),
    body('biography')
        .optional()
        .isLength({max:500})
        .withMessage('El biography debe tener un maximo de 500'),
    body('avatar_url')
        .optional()
        .notEmpty()
        .withMessage('el avatar_url no debe estar vacio')
        .isURL()
        .withMessage('La url de la imagen no es valida'),
    body('birth_date')
        .optional()
        .isDate()
        .withMessage('La fecha es incorrecta')
]

export const updatedProfileValidations = [
    param('id')
        .isNumeric()
        .withMessage('El ID debe ser numerico')
        .custom( async(id) =>{
            const existProfile = await ProfileModel.findByPk(id)
            if (!existProfile) {
                throw new Error("usuario no encontrado")
            }
            return true
        }),
    body('user_id')
        .notEmpty()
        .withMessage('el Id de usuario es obligatorio'),
    body('first_name')
        .optional()
        .isLength({min:2,max:50})
        .withMessage('El first_name debe tener entre 2 y 50 caracteres')
        .isString()
        .withMessage('solo debe tener letras'),
    body('last_name')
        .optional()
        .isLength({min:2,max:50})
        .withMessage('El last_name debe tener entre 2 y 50 caracteres')
        .isString()
        .withMessage('solo debe tener letras'),
    body('biography')
        .optional()
        .isLength({max:500})
        .withMessage('El biography debe tener un maximo de 500'),
    body('avatar_url')
        .optional()
        .isURL()
        .withMessage('La url de la imagen no es valida'),
    body('birth_date')
        .optional()
        .isDate()
        .withMessage('La fecha es incorrecta')
]