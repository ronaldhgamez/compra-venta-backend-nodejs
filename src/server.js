// Configuración del servidor
// Express: framework para crear el servidor, permite definir rutas
const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));

// rutas
app.use(require('./routes/routes'));

const port = 4000;
app.listen(port);
console.log("Servidor corriendo en puerto " + port);