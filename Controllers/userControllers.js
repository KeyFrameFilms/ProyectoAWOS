import { request, response } from "express"

const formularioLogin =  (request, response) =>{
    response.render('auth/login', {
        autenticado: true
    })
}

const homePage = (request, response) =>{
    response.render('user/home')
}

export {
    formularioLogin,
    homePage
}