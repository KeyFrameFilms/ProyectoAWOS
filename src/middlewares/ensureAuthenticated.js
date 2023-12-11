// middleware/ensureAuthenticated.js
export default function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login'); // Puedes redirigir a la página de inicio de sesión o a otra página según tu lógica
  }
  