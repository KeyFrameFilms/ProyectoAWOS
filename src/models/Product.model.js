import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Product = db.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING, // Puedes cambiar esto según tus necesidades, por ejemplo, BLOB si estás almacenando imágenes directamente en la base de datos.
    allowNull: true,
  },
  // Otros campos relacionados con las imágenes, como tamaño, formato, etc., podrían añadirse según tus necesidades.
});

Product.sync();

export default Product;
