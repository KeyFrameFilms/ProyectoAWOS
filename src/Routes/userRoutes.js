import express from "express";
import { formLogin, formRegister, homePage } from "../Controllers/userControllers.js";

const router = express.Router();

router.get("/login", formLogin);
router.get("/register", formRegister);
router.get("/home", homePage);

export default router;
