import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Cart = db.define("tbb_carts", {
    // Define las propiedades del carrito
    // Por ejemplo, un carrito podría contener una lista de productos, cantidad, etc.

    // Ejemplo:
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    // Agrega más propiedades según tus necesidades

    // Relación con el usuario
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// Puedes definir relaciones aquí si el carrito está asociado a usuarios, productos, etc.
// Por ejemplo, un carrito puede pertenecer a un usuario y tener muchas relaciones con productos.

export default Cart;
