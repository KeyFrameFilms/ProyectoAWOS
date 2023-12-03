// userRoutes.js

import express from "express";
import { formLogin, formRegister, homePage, formForgotPassword, registerAccount, resetPassword, changePassword, confirmAccount } from "../controllers/userController.js";

const router = express.Router();

router.get("/login", formLogin);
router.get("/register", formRegister);
router.post("/registerAccount", registerAccount);
router.get("/home", homePage);
router.get("/forgot-password", formForgotPassword);
router.post("/password-change", resetPassword);
router.get("/password-change/:tokenPassword", changePassword);

// Corrige la ruta de confirmAccount
router.get("/confirm/:token", confirmAccount);

export default router;
