import express from "express";
import { formularioLogin } from "../Controllers/userControllers.js";

const router = express.Router();

router.get('/login', formularioLogin);


export default router