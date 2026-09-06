import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const ArticleTagModel = sequelize.define("Article_Tag",{
    article_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tag_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{})

