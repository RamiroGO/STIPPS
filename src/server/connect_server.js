// Importar Librerías
const express = require('express');
const morgan = require('morgan');
const patch = require('path');
const { database } = require('../database/key_rami.js');
// Importar passport en el conector del servidor para poder ejecutar su código principal
const hi_user = require('../lib/hi_user');

// initializations
const connect_server = express();
const PORT = 3000;

// Settings
connect_server.set('port', process.env.PORT || PORT);
connect_server.set('views', patch.join(__dirname, "../views/html")); // Ubicar la carpeta de Views donde se encuentran los HTMLs
connect_server.engine('html', require('ejs').renderFile);
connect_server.set('view engine', 'html');

// Middlewares
connect_server.use(morgan("dev"));
connect_server.use(express.urlencoded({ extended: false }));
connect_server.use(express.json());

// Global Variables
let user_logued;
// El 'req' (Request): representa los parámetros que provienen de la petición.
connect_server.use((req, res, next) => {
  /*
  console.log("connect_server.js: Preparando next()")
  // Datos de validación del usuario activo
  console.log("connect_server recibe: " + [
    req.body.name_user,
    req.body.full_user,
    req.body.tele_user,
    req.body.pass_user,
    req.body.addr_user
  ]);
  // La variable user ahora será accesible desde el HTML
  connect_server.locals.user = req.body;*/
  req.body.user = hi_user.Initialization(user_logued);
  user_logued = req.body.user;
  console.log("Usuarios Actuales: ", hi_user.cant_users);
  next();
});

// Routes
connect_server.use(require('./routes/routes'));
connect_server.use(require('./routes/authentications/routes_get'));
connect_server.use(require('./routes/authentications/routes_post'));
connect_server.use("cursos", require('./routes/routes_database.js'));

// Public
connect_server.use(express.static(patch.join(__dirname, 'public')));

// Starting the Server
connect_server.listen(connect_server.get('port'), () => {
  console.log('Server on Port', connect_server.get('port'));
});