import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const UserModel = sequelize.define("User",{
    username:{
        type:DataTypes.STRING(20),
        unique:true,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(100),
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM('user', 'admin'),
        allowNull:false,
        defaultValue:"user"
    }
},{
    paranoid:true
})


