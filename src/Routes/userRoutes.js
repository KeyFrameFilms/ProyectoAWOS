import express from "express";
import { formLogin, formRegister, homePage, formForgotPassword, registerAccount } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/login", formLogin);

router.get("/register", formRegister);
router.post("/registerAccount", registerAccount);

router.get("/home", homePage);
router.get("/forgot-password", formForgotPassword);

export default router;
