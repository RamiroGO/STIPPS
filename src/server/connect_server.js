// Importar Librerías
const express = require('express');
const morgan = require('morgan');
const patch = require('path');
const { id_user } = require('../lib/hi_user.js');

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

// Enrutador de peticiones:
connect_server.use((req, res, next) => {
  // PENDIENTE: Intentar llevar las variables del usuario al generador de la vista del HTML
  connect_server.locals.id_user = id_user;
  next();
});

// Routes
connect_server.use("/cursos", require('./routes/routes_cursos_database.js'));
connect_server.use("/profile", require('./routes/routes_profile_database.js'));
connect_server.use(require('./routes/authentications/routes_post'));
connect_server.use(require('./routes/authentications/routes_get'));
connect_server.use(require('./routes/routes'));

// Public
connect_server.use(express.static(patch.join(__dirname, 'public')));

// Starting the Server
connect_server.listen(connect_server.get('port'), () => {
  console.log('Server on Port', connect_server.get('port'));
});
