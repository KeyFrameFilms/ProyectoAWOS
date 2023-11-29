import { check, validationResult } from "express-validator";
import { emailRegister, emailResetPassword } from "../lib/emails.js";
import { generateID, jwtToken } from "../lib/tokens.js";

import User from "../models/User.model.js"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
import { request } from "express";

const formLogin =  (request, response) =>{
    response.render('auth/login', {
        authenticate: true,
        page: "Login"
    })
}

const formRegister = (request, response) => {
    response.render('auth/register', {
        authenticate: true,
        page: "Register"
    })
}

const registerAccount = async (request, response) => {
    console.log('El usuario está intentando registrar sus datos en la base de datos');
    await check('name').notEmpty().withMessage('Name field is required').run(request);
    await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('This field should be an Email (user@domain.ext) and not empty').run(request);
  
    //! validate min and max password
    await check('password').notEmpty().withMessage('Password field is required').isLength({ min: 8 }).withMessage('Password must contain at least of 8 characters').isLength({ max: 20 }).withMessage('Password must contain less than 20 characters').equals(request.body.repeatPassword).withMessage("Both password must be the same.").run(request);
    // validate repeat password
  
    let result = validationResult(request);
  
  
    // Validate duplicate emails
  
    if (result.isEmpty()) {
      // Desestructure OAject Body
      const { name, email, password } = req.body;
      const token = generateID();
      console.log(`Intentando insertar al usuario: ${name}, con correo electrónico: ${email}, password: ${password} y token: ${token}`);
  
      const userExists = await User.findOne({ where: { email: email } })
      console.log(userExists);
      if (userExists) {
        return response.render("auth/register", {
          page: `Creating New Account`,
          errors: [{ msg: `The user with: ${email} already exists.` }],
          //! Sending params to pug 
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
  
        //! Sending confirmation email 
        emailRegister({
          name,
          email,
          token
        })
        // response when user was created
        response.render('templates/message', {
          page: "User Created Successfull",
          message: `We have sent you an email to: ${email}, please verify your account`,
          type: "Info"
        })
      }
  
    } else {
      return response.render("auth/register", {
        page: `Creating New Account`,
        errors: result.array(),
        //! Sending params to pug 
        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    }
  }

  
const confirmAccount = async (request, response, next) => {
    //Get token of URL (request)
    const { token } = request.params;
    //check if the token exists
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
      //Update the verification status in the DB.
      userToken. verified = true;
      //Delete the token
      userToken.token = null;
      userToken.save();
      //Paint the response page.
      response.render("templates/message", {
        page: "Validation Complete",
        message: "Your account has been confirmed",
        type: "Information"
      })
    }
}  

const changePassword = async (request, response) => {
    const { tokenPassword } = request.params;
  
    // Verify if token already exists
    let userToken = await User.findOne({ where: { token: tokenPassword } });
    // Paginas de respuesta
    if (!userToken) {
      console.log(`This token is invalid `);
      response.render('templates/message', {
        page: "Error in Validation Process",
        /*notificationTitle: "The token is invalid ",*/
        message: "The token is invalid ",
        type: "Warning"
      })
    } else {
      response.render("auth/password-change", {
        page: `Change Password`,
        tokenPassword: tokenPassword
      });
    }
}

const resetPassword = async (request, response) => {

  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);

  let result = validationResult(request);

  // Validar la existencia del usuario a tráves del Email
  const { email } = request.body;
  const userExists = await User.findOne({ where: { email } });

  // Validar que result no tenga errores
  if (result.isEmpty()) {
    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      console.log(`El usuario con correo ${email}`);
      response.render('templates/message', {
        page: "Recovery Password",
        //           notificationTitle: `Error Email not Found`,
        message: "The token is invalid ",
        type: "Error"
      })
    } else {
      //  Crear el token para cambiar la contraseña
      const tokenPassword = generateID();
      userExists.token = tokenPassword;
      userExists.save();

      //  Enviar correo de acceso al cambio de contraseña
      emailResetPassword({
        email,
        tokenPassword
      })
      console.log(`El usuario con correo ${email}`);
      response.render('templates/message', {
        page: "Recovery Password",
        //notificationTitle: ` Email Found`,
        message: "The  is invalid ",
        type: "Information"
      })

    }
  } else {
    return response.render("auth/forgot-password", {
      page: `Recovery Password`,
      errors: result.array(),
      //! Sending params to pug 
      user: {
        email: request.body.email
      }
    });
  }
}

const homePage = (request, response) => {
    response.render('User/home', {
        authenticate: true,
        page: "Home"
    })
}

const formForgotPassword = (request, response) => {
    response.render('auth/forgot-password', {
        authenticate: true,
        page: "Forgot Password"
    })
}

export {
    formLogin, formRegister, homePage, formForgotPassword, registerAccount,resetPassword,changePassword,confirmAccount
}
