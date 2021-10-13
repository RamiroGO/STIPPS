const express = require("express");
const cors = require("cors");
const db = require("../database/conexion");
const query_server = express();

// Settings

//Middlewares
query_server.use(morgan('dev'));

// Acciones que se ejecutan antes de que se exploren las rutas
query_server.use(express.urlencoded({ extended: false }));
// Convertir de JSON a Variables:
query_server.use(express.json());
// Guardamos el puerto como una variable
const PORT = process.env.PORT || 3000;

query_server.use(cors());

// Servidor API REST
// Routers: Enrutamiento según la petición hecha en la página Web.

require('./routes/routes');

query_server.listen(PORT, () => {
  console.log("Servidor on Port: " + PORT);
});

module.exports = query_server;
