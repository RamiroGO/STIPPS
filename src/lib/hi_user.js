// Lista de usuarios logueados
let users_log = [];
// Parámetros de un usuario:
let user_log = {
	code: "",
	device: "",
	id: 0,
};
// Me aprovecho de que un usuario solo podrá modificar uno de los datos simultáneamente: uso de 3.
// 'code' es proporcionado por el usuario
// 'device' es el identificador del equipo del usuario
// 'id' es proporcionado por el servidor después de loguearse
// hi_user(code_user, device_user);
function hi_user(code_user, device_user) {
	// Parámetros de un usuario:
	user_log = {
		code: code_user,
		device: device_user
	};

	// Añadir al nuevo usuario a la lista.
	users_log.push(user_log);
	
	return function isAuthenticated() {
		return user_log.id > 0;
	};
}

module.exports = hi_user;