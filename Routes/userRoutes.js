import express from "express";
import { formLogin, formReegister, formularioLogin } from "../Controllers/userControllers.js";

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formReegister);

export default router