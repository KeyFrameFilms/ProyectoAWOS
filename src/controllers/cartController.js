import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';  
import User from '../models/User.model.js';


// cartController.js

// cartController.js

const viewCart = async (req, res) => {
    try {
        // Asegúrate de que el usuario esté autenticado antes de acceder a req.user.id
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.user.id;

        // Obtén los elementos del carrito del usuario
        const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });

        res.render('cart/view', {
            authenticate: true,
            page: 'View Cart',
            cartItems: cartItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        // Verifica si el producto ya está en el carrito del usuario
        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Si el producto no está en el carrito, crea un nuevo elemento en el carrito
            await Cart.create({ userId, productId, quantity });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        // Busca y elimina el elemento del carrito
        await Cart.destroy({ where: { userId, productId } });

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        // Obtén los elementos del carrito del usuario
        const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });

        // Realiza el procesamiento de pago y cualquier lógica adicional aquí

        // Elimina los elementos del carrito después de finalizar el pago
        await Cart.destroy({ where: { userId } });

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { addToCart, removeFromCart, checkout, viewCart };