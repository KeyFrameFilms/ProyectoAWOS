const formularioLogin =  (request, response) =>{
    response.render('auth/login', {
        autenticado: true
    })
}

export {
    formularioLogin
}