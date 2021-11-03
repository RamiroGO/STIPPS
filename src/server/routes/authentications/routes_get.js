const express = require('express');
const router = express.Router();


const util = require('util');
const sleep = util.promisify(setTimeout);

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isLoggedIn, isNotLoggedIn } = require("../../../lib/is_logged");

// Se requieren dos enrutadores para hacer un Acceso de Usuario 'SignUp'
router.get("/signup", isNotLoggedIn, (req, res) => {
	console.log("Route GET signup NotLog");
	// Construcción del response para visuLizar la página de acceso
	res.render("registrarse");
});

// Ruta para visualizar el formulario SignIn
router.get("/signin", isNotLoggedIn, (req, res) => {
	console.log("Route GET signin NotLog");
	// Construcción del response para visuLizar la página de acceso
	res.render("acceso");
});

// Ruta para renderizar el profile cuando este funciona.
router.get("/profile", isLoggedIn, (req, res) => {
	// Esta ruta get / profile se dañó, hay que mandarla a otra ruta get para que funcione.
	console.log("Route GET profile Is_Log");
	// el 'res' debe mandar la orden de redirect al formulario HTML, para modificar el 'action' del formulario.
	res.render("consulta");
});

router.get('/logout', isLoggedIn, (req, res) => {
	// Módulo de passport para cerrar session
	req.logOut();
	res.redirect('/acceso');
});

module.exports = router;
