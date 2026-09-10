import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import { UserModel } from "./user.model.js"

export const ProfileModel = sequelize.define("Profile",{
    user_id:{
        type: DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        references:{
            model:"Users",
            key:"id"
        }
    },
    first_name:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    last_name:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    biography:{
        type: DataTypes.TEXT,
        allowNull:true
    },
    avatar_url:{
        type: DataTypes.STRING(255),
        allowNull:true
    },
    birth_date:{
        type: DataTypes.DATE,
        allowNull:true
    },
},{})

ProfileModel.belongsTo(UserModel,{foreignKey:"user_id", as:'user', onDelete:'CASCADE'})
UserModel.hasOne(ProfileModel,{foreignKey:'user_id',as:'profile', onDelete:'CASCADE'})