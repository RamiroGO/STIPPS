const connect_mysql = require("../database/connect_database_mysql");
const encrypt_psw = require("./encrypt_psw.js");

async function isAwait_userValidate(username, password) {
	// Busca el Usuario en la Base de Datos, a partir del username: Retornará una lista.
	const candidates = await connect_mysql.query(
		"SELECT * FROM `usuarios` WHERE `nombre` = ?",
		[username]
	);

	if (candidates.length == 0) {
		console.log('Usuario no encontrado');
		return false;
	} else if (candidates.length > 0) {
		return isAwait_passValidate(candidates[0], password);
	}

	async function isAwait_passValidate(candidate, password) {
		// Validación del Usuario
		console.log("Validando Usuario...");
		const passw_candidate = candidate.passw;
		// Comparación de la contraseña ingresada con la Registrada a través de un método en 'encrypt_psw'.
		const _is_valid = await encrypt_psw.matchPassword(password, passw_candidate);
		console.log("Validación exitosa: ", _is_valid);
		return _is_valid;
	}
}

module.exports = {
	register_database: class {
		// Crear un objeto temporal con el username, password y contrseña con los nombres de los parámetros exigidos por la base de datos.
		Fields_Database = {};
		constructor(Obj_MySQL) {
			this.Fields_Database = Obj_MySQL;
		}

		// Guardar usuario
		saveUserMySQL() {
			// No se deben enviar campos vacios
			if (this.Fields_Database.name_user === "" || this.Fields_Database.passw === "" || this.Fields_Database.mail_user === "")
				return "Campo vacio";

			// Convertir el password en un hash
			encrypt_psw.encryptPassword(this.Fields_Database.passw).then((hash_pass) => {
				// Guardar el nuevo Hash como pasword en la clase y en la base de datos.
				this.Fields_Database.passw = hash_pass;

				// Guardar el Usuario en la Base de Datos y recibir el id autogenerado por la base de datos.
				connect_mysql.query("INSERT INTO `usuarios` SET ?", [this.Fields_Database], (err, result) => {
					// Llorelo
					if (err) return "(U_,U)";
					// Disfrútelo
					else {
						// Guardamos el Id que MySQL generó tras la inserción.
						this.Fields_Database.id = result.insertId;
						console.log("Guardado con Id: ", this.Fields_Database.id);
						return this.Fields_Database.id;
					}
				});
			});
		}
		// Preguntar por la existencia de un usuario
		async IsSame(username, password) {
			// Busca el Usuario en la Base de Datos, a partir del username: Retornará una lista.
			const rows_users = connect_mysql.query(
				"SELECT * FROM `usuarios` WHERE `nombre` = ?",
				[username]
			);

			// Validación del Usuario
			if (rows_users.length > 0) {
				const user_row0 = rows_users[0];
				// Comparación de la contraseña ingresada con la Registrada a través de un método en 'helpers'.
				const validPassword = await encrypt_psw.matchPassword(
					password,
					user_row0.password
				);

				let mensaje = "";
				// Validación de Contraseña. 
				if (validPassword) {
					mensaje = "Welcome " + user_row0.username;
					console.log(mensaje)
				} else {
					mensaje = "Incorrect Password";
					console.log(mensaje)
				}
			} else {
				mensaje = "The Username does not exists";
				console.log(mensaje)
			}

			return mensaje;
		}
	},

	IsExist(username, password) {
		return isAwait_userValidate(username, password);
	},
}
