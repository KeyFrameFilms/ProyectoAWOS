import express from 'express'
import userRoutes from './Routes/userRoutes.js'

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.use('/auth', userRoutes)

const  port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`)

})