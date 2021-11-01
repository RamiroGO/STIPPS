// 'isLoggedIn' 	: Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
// 'isNotLoggedIn' 	: Solo se debe implementar en las rutas para usuarios que no han accedido o no se han registrado.

const {isAuthenticated} = require("./hi_user");

module.exports = {
	// Método para determinar si existe un usuario loggueado.
	// Cuando se implementa este método, los usuarios que no están logueados no pueden acceder a las rutas donde se implementaron.
	isLoggedIn(req, res, next) {
		if (isAuthenticated()) {
			console.log("YA ESTÁ LOGUEADO!!! P(^o^)/");
			return next();
		}
		else
			return res.redirect('/signin'); // Redirigir al usuario no logueado a la página SignIn para loguearse.
	},

	// Cuando se implementa este método, los usuarios que están logueados no pueden acceder a las rutas donde se implementaron.
	isNotLoggedIn(req, res, next) {
		if (!isAuthenticated()) {
			console.log("No está logueado... ( -_-*)");
			return next();
		}
		else
			return res.redirect('/profile'); // Redirigir en su página de profile.
	}
};
