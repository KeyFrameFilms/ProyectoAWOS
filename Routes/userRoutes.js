import express from "express";
import { formularioLogin, homePage } from "../Controllers/userControllers.js";

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/home', homePage );


export default router