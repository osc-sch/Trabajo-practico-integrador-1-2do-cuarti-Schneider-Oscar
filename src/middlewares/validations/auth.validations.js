import { body } from "express-validator"
import { UserModel } from "../../models/user.model.js"

export const registerValidations = [
    body('username')
        .notEmpty()
        .withMessage('el username no debe estar vacio')
        .isLength({min:3,max:20})
        .withMessage('El user name debe tener entre 20 y 30 caracteres')
        .isAlphanumeric()
        .withMessage('El user name debe ser alfanumerico obligatoriamente')
        .custom(async (username) =>{
            const existUsername = await UserModel.findOne({where:{username}})
            if (existUsername) {
                throw new Error('Ese nombre de usuario ya esta en uso')
            }
            return true
        }),
    body('email')
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio.')
        .isEmail()
        .withMessage('El formato del email no es válido.')
        .custom(async (email) => {
            const existEmail = await UserModel.findOne({where:{email}})
            if (existEmail) {
                throw new Error('Ese correo ya esta registrado')
            }
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número.'),
    body('role')
        .optional()
        .custom((rol) =>{
            if(rol == "user" || rol == "admin" ){
                console.log('Tiene acceso')
            }else{
                throw new Error("El rol permitido debe ser 'user' o 'admin'")
            }
            return true
        }),
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

export const loginValidations = [
    body('username')
        .notEmpty()
        .withMessage('el username no debe estar vacio')
        .isLength({min:3,max:20})
        .withMessage('El user name debe tener entre 20 y 30 caracteres')
        .isAlphanumeric()
        .withMessage('El user name debe ser alfanumerico obligatoriamente')
        .custom(async (username) =>{
            const existUsername = await UserModel.findOne({where:{username}})
            if (!existUsername) {
                throw new Error('credenciales incorectas')
            }
            return true
        }),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número.'),
]