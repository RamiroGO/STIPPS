const express = require('express');
const router = express.Router();

// Traer las variables de autenticación del usuario desde el módulo passport
const passport_user = require("../../lib/passport_user");

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isLoggedIn, isNotLoggedIn } = require("../../lib/is_logged");

// Se requieren dos enrutadores para hacer un Acceso de Usuario 'SignUp'
router.get("/signup", isNotLoggedIn, (req, res) => {
	console.log("Route GET signup NotLog: Authentication");
	console.log("Esto si lo dibuja...")
	res.render("registrarse");
});

// Ruta para recibir los datos del formulario de Acceso 'SignUp' (sin 'req' ni 'res')
router.post("/signup", isNotLoggedIn, passport_user.authenticate("local.signup", {
	successRedirect: "/profile", // Ir a la ruta profile para renderizar, la cual se define dentro de este mismo archivo
	failureRedirect: "/signup", // En caso de error, volver a ver el formulario inicial.
	failureFlash: true,
}));

// Una ruta igual a la siguente:
/* No se deben duplicar las rutas...
// // Ruta para recibir los datos del formulario
// router.post("/signup", (req, res) => {
// 	// Sería una falla de seguridad mostrar este dato
// 	console.log("SignUp-Post-Authentication: Falla de Seguridad: Datos Ingresados: ", req.body);
// 	passport.authenticate("local.signup", {
// 		successRedirect: "/profile", // Ir a la ruta profile que se define dentro de este mismo archivo
// 		failureRedirect: "/signup", // En caso de error, volver a ver el formulario inicial.
// 		failureFlash: true,
// 	});
// 	res.render("profile");
// });
*/

// Ruta para visualizar el formulario SignIn
router.get("/signin", isNotLoggedIn, (req, res) => {
	console.log("Route GET signin NotLog: Authentication");
	console.log("dibujado?");
	// Construcción del response para 
	res.render("acceso");
});

// Ruta para acceder con los datos ya ingresados en la página SignIn
// Dado que esto es un Middleware, se ejecuta antes que el resto de rutas, y su declaración hace uso de la función 'next'.
router.post("/signin", isNotLoggedIn, (req, res, next) => {
	console.log("Route POST signin NotLog: Authentication");
	passport_user.authenticate("local.signin", {
		successRedirect: "/profile",
		failureRedirect: "/nada",
		failureFlash: true,
	})(req, res, next);
});

// Ruta para validar el acceso del usuario.
router.post("/profile", isNotLoggedIn, (req, res, next) => {
	console.log("Route POST profile NotLog: Authentication");
	passport_user.authenticate("local.signin", {
		successRedirect: "/profile",
		failureRedirect: "/signin", // 
		failureFlash: false,
	})(req, res, next);
});

// Ruta para renderizar el profile cuando este funciona.
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
router.get("/profile", (req, res) => {
	console.log("Authentication-Is Not Logged-post-profile");
	res.render("nadando");
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
