import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Photo = db.define("tbb_photos", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  propertyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});


export default Photo;
