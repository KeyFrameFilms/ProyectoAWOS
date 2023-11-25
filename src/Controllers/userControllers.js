const formLogin =  (request, response) =>{
    response.render('auth/login', {
        authenticate: true
    })
}

const formRegister = (request, response) => {
    response.render('auth/register', {
        authenticate: true
    })
}

const homePage = (request, response) => {
    response.render('User/home', {
        authenticate: true
    })
}


export {
    formLogin, formRegister, homePage
}