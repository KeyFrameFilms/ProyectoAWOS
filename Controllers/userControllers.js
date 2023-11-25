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


export {
    formLogin, formReegister
}