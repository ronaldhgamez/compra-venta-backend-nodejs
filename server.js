// Configuración del servidor
// Express: framework para crear el servidor, permite definir rutas
const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));

//----------------------------------PROTOCOLOS PARA EL BACKEND (LOCALHOST) ---------------------------------
cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,"
  );
  res.header("content-type: application/json; charset=utf-8");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//---------------------------------------------------------------------

// rutas
app.use(require('./src/routes/routes'));

const port = 4000;
app.listen(port);
console.log("Servidor corriendo en puerto " + port);