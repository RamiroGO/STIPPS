// Lista de usuarios logueados
let users_log = [];

module.exports = {
	cant_users: users_log.length,
	// // Parámetros de un usuario:
	// Me aprovecho de que un usuario solo podrá modificar uno de los datos simultáneamente: uso de 3.
	// 'nombre' es proporcionado por el usuario
	// 'contra' es el identificador del equipo del usuario
	// 'id' es proporcionado por el servidor después de loguearse
	Initialization: function (user_exist) {


		if (user_exist) {
			return user_exist;
		}
		else {
			const user_default = {
				nombre: "",
				contra: "",
				id: 0,
				isAuthenticated: function () {
					return users_log.lastIndexOf(-1).id > 0;
				}
			};

			users_log.push(user_exist);
			return user_default;
		}

	},
	SignIn: function (user) {
		users_log.push({
			nombre: user.nombre,
			contra: user.contra,
			id: user.id
		});

		return {
			nombre: user.nombre,
			contra: user.contra,
			id: user.id,
			isAuthenticated: function () {
				return users_log.lastIndexOf(-1).id > 0;
			}
		};
	},
	users_log: users_log
}