const express = require('express');
const router = express.Router();

// Traer las variables de autenticación del usuario desde el módulo passport
const passport_user = require("../../../lib/passport_user");

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isLoggedIn, isNotLoggedIn } = require("../../../lib/is_logged");

// Se requieren dos enrutadores para hacer un Acceso de Usuario 'SignUp'
router.get("/signup", (req, res) => {
	console.log("Route GET signup NotLog");
	// Construcción del response para visuLizar la página de acceso
	res.render("registrarse");
});

// Ruta para visualizar el formulario SignIn
router.get("/signin", (req, res) => {
	console.log("Route GET signin NotLog");
	// Construcción del response para visuLizar la página de acceso
	res.render("acceso");
});

// Ruta para renderizar el profile cuando este funciona.
router.get("/profile", (req, res) => {
	console.log("Route GET profile -- ");
	// Esta ruta get/profile se puteó, hay que mandarla a otra ruta get para que funcione.
	// el 'res' debe mandar la orden de redirect al formulario HTML, para modificar el 'action' del formulario.
	res.redirect('/consulta');
});

// router.get("/profile", isNotLoggedIn, (req, res) => {
// 	console.log("Route GET profile NotLog");
// 	res.render("consulta");
// });

// router.get("/profile", isLoggedIn, (req, res) => {
// 	console.log("Route GET profile Is_Log");
// 	res.render("consulta");
// });

router.get("/consulta", (req, res) => {
	console.log("Route GET consulta -- ");
	// Si del lado del HTML hay un formulario con un GET esperando respuesta, este será capáz de ejecutar este response.render, el cual portará el documento HTML de la consulta.
	// Cargamos el documento HTML presente en la carpeta de "views/html" previamente definidas en el servidor
	// Se establece el archivo html para la ruta '/consulta'
	res.render('consulta');
});

router.get('/logout', (req, res) => {
	// Módulo de passport para cerrar session
	req.logOut();
	res.redirect('/acceso');
});

module.exports = router;
