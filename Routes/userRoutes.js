import express from "express";
import { formLogin, formReegister, formularioLogin, homePage } from "../Controllers/userControllers.js";

const router = express.Router();

router.get('/login', formLogin);
router.get('/register', formReegister);router.get('/home', homePage );


export default router