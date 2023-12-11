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

const findOnePhoto = (request, response) => {
  return 0;
};

const findAllByUserPhoto = async (req, res) => {
  try {
    if (!req.user) {
      console.log("Redireccionando al inicio porque no hay un usuario autenticado.");
      return res.redirect("/login");
    }

    const userId = req.user.id;
    const photos = await Photo.findAll({ where: { user_ID: userId, published: 1 } });

    if (photos && photos.length > 0) {
      return res.render("User/admin", { photos, page: "My Photos" });
    } else {
      console.log("No se encontraron fotos publicadas para el usuario.");
      return res.redirect("/home");
    }
  } catch (error) {
    console.error("Error al recuperar las propiedades del usuario:", error);
    res.status(500).send("Error retrieving user properties");
  }
};



const formPhoto = async (req, res) => {
  console.log("Showing form for creating a new Photo");
  console.log(req.body);

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);
  res.render("photo/create", {
    page: "New Photos",
    showHeader: true,
    data: req.body,
    categories,
    prices,
  });
};

const savePhoto = async (req, res) => {
  console.log("Validate and save data to the database");

  const { title, description, category, priceRange, street, lat, lng } = req.body;
  console.log(req.body);

  const validationRules = [
    check("title")
      .notEmpty()
      .withMessage("The title is required")
      .isLength({ min: 10, max: 150 })
      .withMessage("The title must have between 15 and 150 characters"),
    check("description").notEmpty().withMessage("The description is required"),
    check("category")
      .notEmpty()
      .withMessage("All photos must be categorized")
      .isInt({ min: 1, max: 5 })
      .withMessage("The category is unknown"),
    check("priceRange")
      .notEmpty()
      .withMessage("All photos must have a price")
      .isInt({ min: 1, max: 8 })
      .withMessage("The price is unknown"),
    check("street").notEmpty().withMessage("The name of the street is unknown"),
    check("lat")
      .isFloat({ min: -90, max: 90 })
      .withMessage("The latitude is not in the requested range"),
    check("lng")
      .isFloat({ min: -180, max: 180 })
      .withMessage("The longitude is not within the requested range."),
  ];

  // await Promise.all(validationRules.map((validation) => validation.run(req)));
  await Promise.all(validationRules.map(validation => validation.run(req)));

  const errors = validationResult(req);

  try {
    const loggedUser = req.User.id;

    if (loggedUser) {
      if (!errors.isEmpty()) {
        const [categories, prices] = await Promise.all([
          Category.findAll(),
          Price.findAll(),
        ]);
        return res.render("photo/create", {
          page: "New Photos",
          showHeader: true,
          data: req.body,
          categories,
          prices,
          errors: errors.array(),
        });
      }

      // Mover la declaración de savedPhoto aquí para evitar el error
      let savedPhoto;

      try {
        savedPhoto = await Photo.create({
          title,
          description,
          category_ID: category,
          price_ID: priceRange,
          address: street,
          lat,
          lng,
          user_ID: loggedUser,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send(error.message || "Error creating photo");
      }

      if (!(savedPhoto && savedPhoto.id)) {
        return res.status(500).send("Invalid saved photo instance");
      }

      return res.redirect(`./create/addImage/${savedPhoto.id}`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message || "Error creating photo");
  }
};



const formAddImage = async (req, res) => {
  console.log(`Visualizar el formulario para agregar imagenes`);

  const { idPhoto } = req.params;
  console.log(idPhoto);
  //const userID = req.user.id
  const photo = await Photo.findByPk(idPhoto);
  if (!photo) {
    return res.redirect("/home"); 
  }
  if (photo.published) {
    return res.redirect("/home"); 
  }
  if (
    req.user &&
    req.user.id &&
    photo.user_ID &&
    req.user.id.toString() !== photo.user_ID.toString()
  ) {
    return res.redirect("/home"); 
  }

  res.render("photo/addImage", {
    photo,
    page: `Add image to ${photo.title}`,
    idPhoto,
  });
};



const loadImage = async (req, res, next) => {
  try {
    const { idPhoto } = req.params;
    const photo = await Photo.findByPk(idPhoto);

    if (!photo) {
      return res.redirect("/home");
    }

    if (photo.published) {
      return res.redirect("/home");
    }

    // Verificar si req.user existe y tiene la propiedad id
    if (
      req.user &&
      req.user.id &&
      req.user.id.toString() !== photo.user_ID.toString()
    ) {
      return res.redirect("/home");
    }

    // ALMACENAR LA BASE Y PUBLICAR
    console.log(req.file);
    photo.image = req.file.filename;
    photo.published = 1;

    await photo.save();

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    // Manejo del error...
    // Puedes agregar un next(err) aquí si deseas pasar el error al siguiente middleware
  }
};


const admin = async (req, res) => {
  try {
    const { id } = req.user;
    const photos = await Photo.findAll({
      where: {
        user_ID: id,
      },
    });

    res.render('User/admin', {
      page: 'My Photos',
      photos,
    });
  } catch (error) {
    console.error('Error retrieving user photos:', error);
    res.status(500).send('Error retrieving user photos');
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
  admin
};
