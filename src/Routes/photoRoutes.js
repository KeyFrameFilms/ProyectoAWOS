import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import {
    deletePhoto,
    findAllByUserPhoto,
    findAllPhoto,
    findOnePhoto,
    insertPhoto,
    updatePhoto,
    formPhoto,
    savePhoto,
    formAddImage,
    loadImage,
    admin,
    editPhoto,
    saveChangesPhoto
} from "../controllers/photoController.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/create", protectRoute, formPhoto);
router.post("/create", protectRoute, savePhoto);
router.get('/create/addImage/:idPhoto', protectRoute, formAddImage);
router.post('/addImage/:idPhoto', protectRoute, upload.single('image'), loadImage); 

// router.get('/home', protectRoute, findAllByUserPhoto);
router.get('/myPhotos', protectRoute, admin);

router.get("/edit/:idPhoto", protectRoute, editPhoto);

router.post('/edit/:idPhoto', protectRoute, saveChangesPhoto);


export default router;
