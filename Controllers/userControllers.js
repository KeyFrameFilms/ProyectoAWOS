import { request, response } from "express"

const formLogin =  (request, response) =>{
    response.render('auth/login', {
        authenticate: true
    })
}

const formReegister = (request, response) => {
    response.render('auth/register', {
        authenticate: true
    })
}


const homePage = (request, response) =>{
    response.render('user/home')
}

export {
    formLogin, formReegister,
    homePage
}