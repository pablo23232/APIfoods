const Express = require('express');
const validator= require('./utils/validator')
const app = require('./App.js')
const port = 3001;

const Router = Express.Router();

app.listen(port,() => {
    console.log(`Ejemplo de app escuchando por el puerto ${port}`)
})

module.exports = Router;