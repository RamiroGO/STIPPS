// Importar Librerías
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const patch = require('path');

// initializations
const conect_port_server = express();
const PORT = 3000;

// Settings
conect_port_server.set('port', process.env.PORT || PORT);
conect_port_server.set('views', patch.join(__dirname, 'views'));
conect_port_server.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: patch.join(conect_port_server.get('views'), 'layouts'),
	partialsDir: patch.join(conect_port_server.get('views'), 'partials'),
	extname: '.hbs',
	helpers: require('../lib/handlebars.js')
}));
conect_port_server.set('view engine', '.hbs');

// Middlewares
conect_port_server.use(morgan('dev'));
conect_port_server.use(express.urlencoded({ extended: false }));
conect_port_server.use(express.json());

// Global Variables
conect_port_server.use((req, res, next) => {
	next();
});

// Routes
conect_port_server.use(require('./routes/routes.js'));
conect_port_server.use(require('./routes/authentication'));
conect_port_server.use('/links', require('./routes/links.js'));

// Public
conect_port_server.use(express.static(patch.join(__dirname, 'public')));

// Starting the Server
conect_port_server.listen(conect_port_server.get('port'), () => {
	console.log('Server on Port', conect_port_server.get('port'));
});