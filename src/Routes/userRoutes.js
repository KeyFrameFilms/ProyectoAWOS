// userRoutes.js
import express from "express";
import {
  formLogin,
  formRegister,
  homePage,
  formForgotPassword,
  registerAccount,
  resetPassword,
  changePassword,
  confirmAccount,
  login, // Asegúrate de importar la función de login
} from "../controllers/userController.js";

const router = express.Router();

router.get("/login", formLogin);
router.post("/home", login); // Agrega la ruta POST para manejar el formulario de inicio de sesión
router.get("/register", formRegister);
router.post("/registerAccount", registerAccount);
router.get("/home", homePage);
router.get("/forgot-password", formForgotPassword);
router.post("/password-change", resetPassword);
router.get("/password-change/:tokenPassword", changePassword);
router.get("/auth/confirm/:token", confirmAccount);

export default router;
