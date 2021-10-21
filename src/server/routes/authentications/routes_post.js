const express = require('express');
const router = express.Router();
// const passport = require('passport');
const new_register = require('../../../lib/registro_user');

// Traer las variables de autenticación del usuario desde el módulo passport
// const passport_user = require("../../../lib/passport_user");

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isNotLoggedIn } = require("../../../lib/is_logged");

// Para los post no se usa el 'render', sino el 'redirect'
// Los post en el HTML solo son capaces de enviar objetos a través de las rutas HTTP
// Los post en las rutas del HTTP solo son capaces de responder hacia otras rutas HTTP y no soportan enviar el render del HTML
// Para cambiar de view tras un post, hay que redirigir 'redirect' a una ruta 'get' para que haga el trabajo de enviar el render.

// Ruta para Registrar los datos del formulario 'SignUp'
// ('req', 'res') ={ } Los Request y Responses son innecesarios.
router.post("/signup", isNotLoggedIn, (req, res) => {
	console.log("Route POST signup NotLog: Authentication");

	// // Se reciben los datos originales del formulario
	// console.log("signup_post: ", req.body);

	// Los parámetros deben coincidir con los de la base de datos, sobretodo los que no se permiten como NULL.
	const Fields_Database_User = {
		nombre: req.body.name_user,
		correo: req.body.addr_user,
		passw: req.body.pass_user
	};

	// Generando Objeto con los elementos necesarios para ser enviado a la database.
	let register_database = new new_register(Fields_Database_User);

	// Guardar en la Base de Datos
	register_database.saveUserMySQL();

	// // terminado el registro en "post/signup" => Ir a la View "get/profile"
	res.redirect('/profile');
});

// Ruta para acceder con los datos ya ingresados en la página SignIn
// Dado que esto es un Middleware, se ejecuta antes que el resto de rutas, y su declaración hace uso de la función 'next'.
router.post("/signin", isNotLoggedIn, (req, res, next) => {
	console.log("Route POST signin NotLog: Authentication");
	passport.authenticate("local.signin", {
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true,
	})(req, res, next);
});

// Ruta para validar el acceso del usuario.
router.post("/profile", isNotLoggedIn, (req, res, next) => {
	console.log("Route POST profile NotLog: Authentication");
	passport.authenticate("local.signin", {
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: false,
	})(req, res, next);
});

module.exports = router;
