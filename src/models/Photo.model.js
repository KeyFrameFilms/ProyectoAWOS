import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.model.js";
import Category from './Category.model.js';
import Price from './Price.model.js';


const Photo = db.define("tbb_photos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "por definir",
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  // Nueva columna para almacenar el ID del usuario que subió la foto
  user_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Photo.belongsTo(User,{foreignKey: 'user_ID'});
Category.hasOne(Photo,{foreignKey: 'category_ID'});
Price.hasOne(Photo,{foreignKey: 'price_ID'});

export default{
    User,
    Category,
    Price,
    Photo
}
