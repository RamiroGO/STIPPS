const express = require('express');
const router = express.Router();

// Traer las variables de autenticación del usuario desde el módulo passport
const passport_user = require("../../../lib/passport_user");

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isLoggedIn, isNotLoggedIn } = require("../../../lib/is_logged");

// Se requieren dos enrutadores para hacer un Acceso de Usuario 'SignUp'
router.get("/signup", isNotLoggedIn, (req, res) => {
	console.log("Route GET signup NotLog: Authentication");
	console.log("Esto si lo dibuja...")
	res.render("registrarse");
});

// Ruta para visualizar el formulario SignIn
router.get("/signin", isNotLoggedIn, (req, res) => {
	console.log("Route GET signin NotLog: Authentication");
	console.log("dibujado?");
	// Construcción del response para visuLizar la página de acceso
	res.render("acceso");
});

// Ruta para renderizar el profile cuando este funciona.
router.get("/profile", (req, res) => {
	console.log("Authentication-Is Not Logged-post-profile");
	res.render("consulta");
});

// router.get("/profile", isNotLoggedIn, (req, res) => {
// 	console.log("Authentication-Is Not Logged-post-profile");
// 	res.render("consulta");
// });

// router.get("/profile", isLoggedIn, (req, res) => {
// 	console.log("Authentication-Is Logged-get-profile");
// 	res.render("consulta");
// });

router.get('/logout', isLoggedIn, (req, res) => {
	// Módulo de passport para cerrar session
	req.logOut();
	res.redirect('/acceso');
});

module.exports = router;
