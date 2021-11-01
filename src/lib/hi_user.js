// Lista de usuarios logueados
let history_users_log = [];

// // Parámetros de un usuario:
// Me aprovecho de que un usuario solo podrá modificar uno de los datos simultáneamente: uso de 3.
// 'nombre': Nombre del Usuario
// 'contra': Es el password o contraseña proporcionado por el usuario
// 'id': Es el idnetificador del usuario proporcionado por la base de datos al momento de registrarse.

let actual_user = {
	nombre: "",
	contra: "",
	id: 0
};

module.exports = {
	SignIn: function (user) {
		// Modificar el Usuario Actual
		actual_user.nombre = user.nombre;
		actual_user.contra = user.contra;
		actual_user.id = user.id;

		// Enviar la información del acceso del usuario al historial del servidor.
		history_users_log.push(actual_user);
	},
	// La autenticación es un proceso para comprobar que el usuario que está desarrollando las peticiones al servidor
	// está haciéndolo desde su cuenta personal posterior a la comprobación de su acceso.
	// la variable 'actual_user':
	// - Representa los parámetros que identifican al usuario autenticado.
	// - 'actual_user' debería de provenir del request que recibe el servidor desde el usuario.
	// - Si el servidor almacena 'actua_user' entonces será incapaz de mantener la sesión iniciada para mútliples usuarios, porque entrarían en conflicto.
	isAuthenticated: function () {
		let is_exist = false;

		// Comprobación de usuario actual válido para autenticación.
		if (actual_user.id !== 0){
			// Buscar la existencia del usuario actual en el historial de usuarios logueados
			for (let index = 0; index != history_users_log.length && !is_exist; index++) {
				const _user = history_users_log[index];
				if (actual_user.nombre === _user.nombre &&
					actual_user.contra === _user.contra &&
					actual_user.id === _user.id) {
					is_exist = true;
				}
			}
		}
		return is_exist;
	}
}