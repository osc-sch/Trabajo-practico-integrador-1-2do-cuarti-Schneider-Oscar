import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createUserValidations = [
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
        })
        
]

export const updateUserValidations = [
    param('id')
        .isNumeric()
        .withMessage('El ID debe ser numerico')
        .custom( async(id) =>{
            const existUser = await UserModel.findByPk(id)
            if (!existUser) {
                throw new Error("usuario no encontrado")
            }
            return true
        }),
    body('username')
        .optional()
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
        .optional()
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
        .optional()
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una letra minúscula, una mayúscula y un número.'),
    body('rol')
        .optional()
        .custom((rol) =>{
            if(rol == "user" || rol == "admin" ){
                console.log('Tiene acceso')
            }else{
                throw new Error("El rol permitido debe ser 'user' o 'admin'")
            }
            return true
        })
        
]