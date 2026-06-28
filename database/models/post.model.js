import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../config/db.config.js";
import { User } from "./user.model.js";


const Post = sequelize.define(
    'Post', {
    id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
            
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        } 
   } 
)

Post.sync()


export default Post;