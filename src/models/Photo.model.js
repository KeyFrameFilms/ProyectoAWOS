import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Photo = db.define("tbb_photos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
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
});

export default Photo;
