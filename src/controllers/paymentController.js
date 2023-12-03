// controllers/paymentController.js
const paypal = require('@paypal/checkout-server-sdk');
const paypalConfig = require('../config/paypal-config');

// Configurar la SDK de PayPal
const environment = new paypal.core.SandboxEnvironment(
  paypalConfig.clientId,
  paypalConfig.clientSecret
);

const client = new paypal.core.PayPalHttpClient(environment);

// Lógica para manejar los pagos con PayPal
const paymentController = {
  // Iniciar el proceso de pago
  iniciarPago: async (req, res) => {
    try {
      // Crear una orden de pago en PayPal
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '10.00', // Monto del pago
            },
          },
        ],
      });

      const order = await client.execute(request);

      // Redirigir al usuario a la URL de aprobación de PayPal
      return res.redirect(order.result.links.find(link => link.rel === 'approve').href);
    } catch (error) {
      console.error('Error al iniciar el pago:', error);
      return res.status(500).send('Error al iniciar el pago');
    }
  },

  // Procesar la respuesta después de que el usuario completa el pago en PayPal
  procesarPago: async (req, res) => {
    try {
      const token = req.query.token;

      // Obtener detalles de la orden usando el token de aprobación
      const request = new paypal.orders.OrdersGetRequest(token);
      const order = await client.execute(request);

      // Procesar la orden y confirmar la transacción
      // Aquí puedes actualizar tu base de datos o realizar otras acciones según tu lógica de negocio

      // Redirigir a una página de confirmación de pago
      return res.redirect('/pagos/confirmacion');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      return res.status(500).send('Error al procesar el pago');
    }
  },
};

module.exports = paymentController;
