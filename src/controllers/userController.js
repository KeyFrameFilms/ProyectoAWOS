import { check, validationResult } from 'express-validator';//Check: va a revisar por un campo en específico y validationResult va a guardar el resultado de la validación.
import dotenv from 'dotenv';
import User from "../models/User.model.js";
import { generateID, jwtToken } from '../lib/tokens.js';
import { emailRegister, emailResetPassword } from '../lib/emails.js';
import bcrypt from 'bcrypt';

dotenv.config({ path: "src/.env" })

// Luego puedes usar User y Seller en tu código

const formLogin = (request, response) => {
  response.render("auth/login.pug", {
    showHeader: false,
    page: 'Login',
    isLogged: true
  });
}
const formRegister = (request, response) => {
  response.render("auth/register.pug", {
    page: "Create your account",
    isLogged: true
  });
}
const formRecovery = (request, response) => {
  response.render("auth/recovery.pug", {
    page: "Forgot your password?",
    isLogged: true
  });
}
//async nos sirve por que puede que la base no este en nuestro
const insertUser = async (request, response) => {
  // console.log("El Usuario está intentando registrar sus datos en la BD");
  // console.log(`Nombre: ${request.body.name}`);/*Leer la información que se ingresa en el formulario y habilitando la lectura de los formularios. */

  /*Validación */
  await check('name').notEmpty().withMessage('Name field is required').run(request);/*await trabaja de manera secuencial.*/

  await check('email').notEmpty().withMessage('Email field is requered').isEmail().withMessage("This field should be an Email (user@marislas.ext) and not empy").run(request);

  await check('password').notEmpty().withMessage('Password field is required').isLength({ min: 8 }).withMessage('Password must contain at least of 8 characteres').isLength({ max: 20 }).withMessage('Password must contain less than 20 characteres').equals(request.body.repeatPassword).withMessage('Both password must be the same').run(request);

  let result = validationResult(request)
  /*res.json(result.array())
  console.log(`El resultado de la validación ha encontrado ${result.array.length} errores`);//Dice cual es el resultado de la validación*/

  //Verificar que el resultado este vacio.
  //Desestructurar un objeto


  if (result.isEmpty()) {
    //Desestructure Object Body
    const { name, email, password } = request.body;
    const token = generateID();
    console.log(`Intentando insertar al usuario: ${name}, con correo electrónico: ${email}, password: ${password} y token: ${token}`);

    const userExists = await User.findOne({ where: { email: email } });
    console.log(userExists)

    if (userExists) {
      return response.render("auth/register.pug", {
        page: `Creating New Account`,
        errors: [{ msg: `The user with email: ${email} already exists.` }],
        //! Seding params to pug
        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
        token
      });

      // Sending confirmation email
      emailRegister({
        name,
        email,
        token
      });

      response.render('templates/message.pug', {
        page: 'User Created Successfully',
        message: `We have sent you an email to: ${email}, please verify your account`,
        type: "Information"
      });
    }
  } else {
    return response.render("auth/register.pug", {
      page: `Creating New Account`,
      errors: result.array(),
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  }
};




const confirmAccount = async (request, response, next) => {
  //Get token of URL (request)
  const { token } = request.params;
  //Veryfi is token exists
  let userToken = await User.findOne({ where: { token } });



  if (!userToken) {

    console.log(`This token is invalid`);
    response.render("templates/message", {
      page: "Error in validation process",
      message: "The token is invalid ",
      type: "Warning"
    })
  } else {
    console.log(`This token is valid`);
    //Actualizar el status de verificación en la BD.
    userToken. verified = true;
    //Eliminar el token.
    userToken.token = null;
    userToken.save();
    //Pintar la página de respuesta.
    response.render("templates/message", {
      page: "Validation Complete",
      message: "Your account has been confirmed",
      type: "Information"
    })

  }
}
const resetPassword = async (request, response) => {
  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);

  let result = validationResult(request);

  // Validar la existencia del usuario a través del Email
  const { email } = request.body;
  const userExists = await User.findOne({ where: { email } });

  // Validar que result no tenga errores
  if (result.isEmpty()) {
    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      console.log(`El usuario con correo ${email} no existe.`);
      return response.render('templates/message.pug', {
        page: "Recovery Password",
        message: "The provided email is not associated with any account.",
        type: "Error"
      });
    }

    // Crear el token para cambiar la contraseña
    const tokenPassword = generateID();
    userExists.token = tokenPassword;
    await userExists.save();

    // Enviar correo de acceso al cambio de contraseña
    emailResetPassword({
      email,
      tokenPassword
    });

    console.log(`Se ha enviado un correo a ${email} para restablecer la contraseña.`);
    response.render('templates/message.pug', {
      page: "Recovery Password",
      message: "An email with instructions to reset your password has been sent to your email address.",
      type: "Information"
    });
  } else {
    return response.render("auth/recovery.pug", {
      page: `Recovery Password`,
      errors: result.array(),
      user: {
        email: request.body.email
      }
    });
  }
};

const changePassword = async (request, response) => {
  const { tokenPassword } = request.params;

  // Verificar si el token ya existe
  const userToken = await User.findOne({ where: { token: tokenPassword } });

  // Página de respuesta
  if (!userToken) {
    console.log(`El token es inválido.`);
    response.render('templates/message.pug', {
      page: "Error in Validation Process",
      message: "The token is invalid.",
      type: "Warning"
    });
  } else {
    // Renderizar la vista de cambio de contraseña
    response.render("auth/password-change.pug", {
      page: `Change Password`,
      tokenPassword: tokenPassword
    });
  }
};

const updatePassword = async (request, response) => {
  const { tokenPassword } = request.params;
  const { newPassword, confirmPassword } = request.body;

  // Validar que las contraseñas coincidan
  if (newPassword !== confirmPassword) {
    return response.render('auth/password-change.pug', {
      page: `Change Password`,
      errors: [{ msg: 'Passwords do not match' }],
      tokenPassword: tokenPassword
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Verificar si el token ya existe
  const userToken = await User.findOne({ where: { token: tokenPassword } });

  if (!userToken) {
    console.log(`El token es inválido.`);
    response.render('templates/message.pug', {
      page: "Error in Validation Process",
      message: "The token is invalid.",
      type: "Warning"
    });
  } else {
    // Actualizar la contraseña en la base de datos
    userToken.token = null;
    userToken.password = hashedPassword;
    await userToken.save();

    response.render('templates/message.pug', {
      page: "Change Password Success",
      message: "Your password has been changed successfully.",
      type: "Information"
    });
  }
};



const authenticateUser = async (request, response) => {

  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage("The Email field should be an Email (user@domain.exit) and not empty").run(request);

  await check('password').notEmpty().withMessage('Password field is required').isLength({
    min: 8,
    max: 20
  }).withMessage(' The password is formed is formed between 8 and 20 chararcters.').run(request);

  //Desestructurar los datos del Body (Formulario)
  const { email, password } = request.body;
  let result = validationResult(request);
  if (result.isEmpty()) {
    //Desestructurar los datos del Body (Formulario)
    console.log("Los datos estan corectos...")

    // Validar que el correo electrónico exista.
    console.log(`Buscando al usuario: ${email} en la bd`)
    const userExists = await User.findOne({ where: { email } });

    // Validar que el correo exista
    if (!userExists) {
      console.log("Usuario No encontrado")
      // Página de error
      response.render('templates/message.pug', {
        page: "User not found",
        /*notificationTitle: `Error Email not Found`,*/
        message: `The user with email: ${email} do not exist.`,
        type: "Error"

      })
    } else {
      //  Validar que el usuario esté validado
      console.log("Usuario encontrado")
      if (!userExists.verified) {
        console.log(`El usuario con correo ${email} no esta verificado.`);
        response.render('templates/message.pug', {
          page: "Error in login",
          /*notificationTitle: ` Account is not validated `,*/
          message: `The user associated to the email: ${email} is not verified, please check your email.`,
          type: "Warning"
        })
      } else {
        console.log("El usuario esta verificado...")
        // Validar la contraseña asignada al correo electrónico (usuario)
        if (userExists.verifyPassword(password)) {
          // Generar el token de accesso (JWT).
          const token = jwtToken(userExists.id);
          console.log(`JWT generado es: ${token}`);


          //Almacenar el JWT en una cookie
          //Rendireccionar al home
          response.cookie('_token',token,{
            httpOnly: true,
            secure: true, //option to configure https protocol certified

          }).render('photo/admin.pug', {
            page: `My Photos`,
            showHeader: true,
            message: `Welcome ${userExists.name}!`,
            type: "Information",
            user: {
              page: 'My Photos',
              name: userExists.name
            },
            photos: []
          });

        } else {
          response.render("auth/login.pug", {
            page: `Login`,
            errors: [{
              msg: `The email or password doesn't match.`
            }],
            //! Sending params to pug 
            user: {
              email: request.body.email
            }
          });
        }
      }
    }
  }
  else {
    console.log("Los datos tienen errores..")
    return response.render("auth/login.pug", {
      page: `Login`,
      errors: result.array(),
      user: {
        email: request.body.email
      }
    });
  }


}

const homePage = (request, response) => {
  response.render('photo/admin.pug', {
    page: 'My Photos',
    showHeader: true,
    user: {
      page: 'My Photos',
      name: 'Romero'
    },
    photos: []
  });
}



export {
  formLogin,
  formRegister,
  formRecovery,
  insertUser,
  confirmAccount,
  resetPassword,
  changePassword,
  updatePassword,
  authenticateUser,
  homePage
};