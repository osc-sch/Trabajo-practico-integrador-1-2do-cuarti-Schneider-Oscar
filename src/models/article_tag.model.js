import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"
import { TagModel } from "./tag.model.js"
import { ArticleModel } from "./article.model.js"

export const ArticleTagModel = sequelize.define("Article_Tag",{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    article_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Articles',
            key:"id"
        }
    },
    tag_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Tags',
            key:"id"
        }
    }
},{})

TagModel.belongsToMany(ArticleModel,{
    through:ArticleTagModel,
    foreignKey: 'tag_id',
    as:'articles'
})

ArticleModel.belongsToMany(TagModel,{
    through:ArticleTagModel,
    foreignKey:'article_id',
    as:'tags'
})
