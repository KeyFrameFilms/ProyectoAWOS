import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
import {
    deletePhoto,
    findAllByUserPhoto,
    findAllPhoto,
    findOnePhoto, // Corregido el nombre del controlador
    insertPhoto,
    updatePhoto,
    formPhoto,
    savePhoto,
    formAddImage,
    loadImage,
} from "../controllers/photoController.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();
//const upload = require("../middlewares/uploadImage.js");


router.get("/create", protectRoute, formPhoto); // Se eliminó la barra al final de "/create"
router.post("/create", protectRoute, savePhoto);
router.get('/create/addImage/:idPhoto', protectRoute, formAddImage);
router.post('/addImage/:idPhoto', protectRoute, upload.single('image'), loadImage); // Se agregó '.single('imageBox')' para manejar el archivo único

router.get('/home', protectRoute, findAllByUserPhoto);

router.get('/home', ensureAuthenticated, findAllByUserPhoto);


export default router;
