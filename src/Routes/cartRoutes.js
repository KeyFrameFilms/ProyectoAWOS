  import express from 'express';
  const router = express.Router();

  import { 
    addToCart, 
    viewCart,
    removeFromCart, 
    checkout 
  } from "../controllers/cartController.js";

  // Rutas del carrito de compras
  router.get('/', viewCart); // Ver el contenido del carrito
  router.post('/cart/add/:productId', addToCart); // Agregar un producto al carrito
  router.post('/cart/remove/:productId', removeFromCart); // Eliminar un producto del carrito
  router.post('/cart/checkout', checkout); // Finalizar el pago del carrito

  export default router;
