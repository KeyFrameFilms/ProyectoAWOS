import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import {
    deleteProperty,
    findAllByUserProperty,
    findAllProperty,
    findOneProperty, // Corregido el nombre del controlador
    insertProperty,
    updateProperty,
    formProperty,
    saveProperty,
    formAddImage,
    loadImage,
} from "../controllers/propertyController.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();
//const upload = require("../middlewares/uploadImage.js");


router.get("/create", protectRoute, formProperty); // Se eliminó la barra al final de "/create"
router.post("/create", protectRoute, saveProperty);
router.get('/create/addImage/:idPhoto', protectRoute, formAddImage);
router.post('/addImage/:idPhoto', protectRoute, upload.single('image'), loadImage); // Se agregó '.single('imageBox')' para manejar el archivo único

router.get('/home', protectRoute, findAllByUserPhoto);


export default router;
