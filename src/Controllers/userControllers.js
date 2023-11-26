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
    formLogin, formRegister, homePage, formForgotPassword
}