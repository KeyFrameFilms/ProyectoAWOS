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


export {
    formLogin, formRegister
}