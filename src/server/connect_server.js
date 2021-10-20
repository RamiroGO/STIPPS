// Importar Librerías
const express = require('express');
// const morgan = require('morgan');
const patch = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('../database/key_rami.js');
// Importar passport en el conector del servidor para poder ejecutar su código principal
const passport = require('passport');

// initializations
const connect_server = express();
const PORT = 3000;
// - Cargar el archivo passport que tenemos creado.
require('../lib/passport_user');

// Settings
connect_server.set('port', process.env.PORT || PORT);
connect_server.set('views', patch.join(__dirname, "../views/html")); // Ubicar la carpeta de Views donde se encuentran los HTMLs
connect_server.engine('html', require('ejs').renderFile);
connect_server.set('view engine', 'html');

// Middlewares
// - Importar servicio para enviar mensajes entre vistas.
// - Se requiere de un session
connect_server.use(session({
  secret: 'loginpageslinks',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database) // La sesion se almacenará en la base de datos de MySQL y no en el servidor.
}));

// connect_server.use(morgan("dev"));
connect_server.use(express.urlencoded({ extended: false }));
connect_server.use(express.json());
// - Passport para desarrollar el SignUp del Usuario
// - Al inicializar, se podrán generar los request con funciones incorporadas
connect_server.use(passport.initialize());
// - Para que passport pueda hacer uso de los datos de usuario requiere de iniciar una session.
connect_server.use(passport.session());

// Global Variables
// El 'req' (Request): representa los parámetros que provienen de la petición.
connect_server.use((req, res, next) => {
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
  connect_server.locals.user = req.body;
  next();
  console.log("connect_server.js: Terminando next()")
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