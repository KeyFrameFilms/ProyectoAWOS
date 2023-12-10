// photoController.js
import { request, response } from "express";
import Category from "../models/Category.model.js";
import Price from "../models/Price.model.js";
import Photo from "../models/Photo.model.js";
import { validationResult, check } from "express-validator";

const insertPhoto = (request, response) => {
  return 0;
};

const updatePhoto = (request, response) => {
  return 0;
};

const deletePhoto = (request, response) => {
  return 0;
};

const findAllPhoto = (request, response) => {
  return 0;
};

const findAllByUserPhoto = async (req, res) => {
  try {
    const userId = req.User.id;
    const properties = await Photo.findAll({ where: { user_ID: userId } });

    res.render("home", { photos, page: "Home" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al recuperar las propiedades del usuario");
  }
};

const findOnePhoto = (request, response) => {
  return 0;
};

const formPhoto = async (request, response) => {
  console.log("Mostrando el formulario para la creación de una nueva Foto");
  console.log(request.body);

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);
  response.render("photo/create", {  // Cambiar a la nueva vista createPhoto.pug
    page: "New Photos",
    showHeader: true,
    data: request.body,
    categories,
    prices,
  });
};

const savePhoto = async (request, response) => {
  console.log("Validar y guardar datos en la BD de datos");

  const {
    title,
    description,
    nRooms,
    nParkinlots,
    nWC,
    priceRange,
    category,
    street,
    lat,
    lng,
  } = request.body;
  console.log(request.body);

  // Define las reglas de validación usando check
  const validationRules = [
    check("title")
      .notEmpty()
      .withMessage("The title is required")
      .isLength({ min: 15, max: 150 })
      .withMessage("The title photo must have between 15 and 150 characters"),
    check("description").notEmpty().withMessage("The description is required"),
    check("category")
      .notEmpty()
      .withMessage("All properties must be categorized")
      .isInt({ min: 1, max: 5 })
      .withMessage("The category is unknown"),
    check("priceRange")
      .notEmpty()
      .withMessage("All properties must have a price")
      .isInt({ min: 1, max: 8 })
      .withMessage("The price is unknown"),
    check("nRooms")
      .isInt({ min: 0, max: 10 })
      .withMessage("The number of rooms is unknown"),
    check("nWC")
      .isInt({ min: 0, max: 5 })
      .withMessage("The number of wc is unknown"),
    check("nParkinlots")
      .isInt({ min: 0, max: 5 })
      .withMessage("The number of parking lot is unknow"),
    check("street").notEmpty().withMessage("The name of the street is unknow"),
    check("lat")
      .isFloat({ min: -90, max: 90 })
      .withMessage("The latitude is not in the requested range"),
    check("lng")
      .isFloat({ min: -180, max: 180 })
      .withMessage("The longitude is not within the requested range."),
  ];

  // Aplica las reglas de validación a la solicitud
  await Promise.all(
    validationRules.map((validation) => validation.run(request))
  );

  // Obtiene los errores de validación
  const errors = validationResult(request);

  try {
    const loggedUser = request.User.id;

    if (loggedUser) {
      if (!errors.isEmpty()) {
        // Si hay errores de validación, renderiza el formulario nuevamente con los errores.
        const [categories, prices] = await Promise.all([
          Category.findAll(),
          Price.findAll(),
        ]);
        return response.render("photo/create", {
          page: "New Photos",
          showHeader: true,
          data: request.body,
          categories,
          prices,
          errors: errors.array(),
        });
      }

      // Si no hay errores, guarda la propiedad en la base de datos.
      const savedPhotos = await Photos.create({
        title,
        description,
        nRooms,
        nParkinlots,
        nWC,
        price_ID: priceRange,
        category_ID: category,
        address: street,
        lat,
        lng,
        user_ID: loggedUser,
      });

      // Termina la ejecución después de redirigir
      return response.redirect(`./create/addImage/${savedPhotos.id}`);
    }
  } catch (error) {
    console.error(error);
    return response.clearCookie("_token").redirect("/login");
  }
};

const formAddImage = async (req, res) => {
  console.log(`Visualizar el formulario para agregar imagenes`);

  const { idPhotos } = req.params;
  console.log(idPhotos);
  //const userID = req.user.id
  const photo = await Photos.findByPk(idPhotos);
  if (!photo) {
    return res.redirect("/home");
  }
  if (photo.published) {
    return res.redirect("/home");
  }
  if (req.User.id.toString() !== photo.user_ID.toString()) {
    return res.redirect("/home");
  }

  res.render("photo/addImage", {
    photo,
    page: `Add image to ${photo.title}`,
    idPhotos,
  });
};

const loadImage = async (req, res, next) => {
  console.log(`Visualizar el formulario para agregar imagenes`);

  const { idPhotos } = req.params;
  console.log(idPhotos);
  //const userID = req.user.id
  const photo = await Photos.findByPk(idPhotos);
  if (!photo) {
    return res.redirect("/home");
  }
  if (photo.published) {
    return res.redirect("/home");
  }
  if (req.User.id.toString() !== photo.user_ID.toString()) {
    return res.redirect("/home");
  }

  try {
    //ALMACENAR LA BASE Y PUBLICAR
    console.log(req.file);
    photo.image = req.file.filename;
    photo.published = 1;

    await photo.save();

    next();
  } catch (err) {
    console.log(err);
  }
};

export {
  insertPhoto,
  updatePhoto,
  deletePhoto,
  findAllPhoto,
  findAllByUserPhoto,
  findOnePhoto,
  formPhoto,
  savePhoto,
  formAddImage,
  loadImage,
};
