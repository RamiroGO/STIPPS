// PORQUERÍA ELITISTA NO FUNCIONÓ!
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// const connect_mysql = require("../database/connect_database_mysql");
// const encrypt_psw = require("./encrypt_psw.js");

// /* 'fields_user' será un objeto que posee los campos que requiere la función 'LocalStrategy' para funcionar, según su interface 'IStrategyOptions'
//  * El 'username' y 'password' presentes para definir 'fields_user' representan el 'name=""' de los input que hay en el HTML.
//  * Posteriormente, si se establece 'passReqToCallback: true' serán generados las siguientes variables según así se establezca por parte de la función que se seleccione como 'LocalStrategy'
// 		req: express.Request,
// 		username: string,
// 		password: string,
// 		done: (error: any, user?: any, options?: IVerifyOptions) => void
 
//  * Si se desea aportar mas datos además del 'username' y el 'password' a la base de datos de la session, será necesario disponer del objeto 'req' que se consigue al establecer 'passReqToCallback'=true de modo que sea posible reconstruir un nuevo objeto para el usuario, y que sea este nuevo objeto con los parámetros modificados el que pueda continuar su camino con el parámetro que se presenta como una función 'done()'.
//  */

// //	Nombre de los campos que escribre el usuario en el view del handlebars / HTML
// // Los campos en el HTML de 'registrarse' poseen los siguientes 'name'
// // const fields_user = {
// // 	usernameField: "txtNombre",
// // 	passwordField: "txtPsw1",
// // 	passReqToCallback: true
// // };

// // Los campos en el JavaScript de 'registrarse' poseen los siguientes 'parámetros'
// const fields_user = {
// 	usernameField: "name_user",
// 	passwordField: "pass_user",
// 	passReqToCallback: true
// };

// /*
// 	name_user: form_data.get("txtNombre"),
// 	full_user: form_data.get("txtApellido"),
// 	pass_user: form_data.get("txtPsw1"),
// 	tele_user: form_data.get("txtTelefono"),
// 	addr_user: form_data.get("txtDireccion")
// */

// // Recibir los campos digitados por el usuario para su Registro desde la View de SignUp
// passport.use('local.signup', new LocalStrategy(fields_user,
// 	// CallBack
// 	async (req, username, password, done) => {
// 		// La información ingresada por el usuario se mostrará por acá.
// 		// la contraseña debe ser cifrada.
// 		console.log("passport-fields_user", fields_user);
// 		console.log("Datos del usuario ingresados:", req.body);
// 		// En este punto podemos anexar más información del usuario además del username y el password.
// 		const newUser = {
// 			username: username,
// 			password: password,
// 			fullname: req.body.full_user,
// 		};

// 		// Cifrar Contraseña
// 		newUser.password = await encrypt_psw.encryptPassword(password);
// 		console.log("Datos del usuario cifrados:", newUser);

// 		// Guardar el Usuario en la Base de Datos y recibir el id autogenerado por la base de datos.
// 		const result = await connect_mysql.query("INSERT INTO `usuarios` SET ?", [newUser]);

// 		// Guarde el id como parte de los parámetros del usuario
// 		newUser.id = result.insertId;

// 		// Cuando el proceso culmine, permitir que el código pueda continuar y no muestre ningún error.
// 		// Se almacenarán los datos del usuario en la session.
// 		return done(null, newUser);
// 	}
// ));

// // Función de Ruta Local de Acceso para Ingresar a una cuenta ya creada con los datos de ingreso ya Ingresados en el formulario
// passport.use("local.signin", new LocalStrategy(fields_user,
// 	// CallBack
// 	async (req, username, password, done) => {
// 		// La información ingresada por el usuario se mostrará por acá.
// 		// console.log("Passport: Datos del usuario ingresados:", req.body);

// 		console.log("estoy en passport_user");
// 		console.log(req.body);

// 		// Busca el Usuario en la Base de Datos, a partir del username: Retornará una lista.
// 		const rows_users = await connect_mysql.query(
// 			"SELECT * FROM `usuarios` WHERE `nombre` = ?",
// 			[username]
// 		);

// 		// Validación del Usuario
// 		if (rows_users.length > 0) {
// 			const user = rows_users[0];
// 			// Comparación de la contraseña ingresada con la Registrada a través de un método en 'helpers'.
// 			const validPassword = await encrypt_psw.matchPassword(
// 				password,
// 				user.password
// 			);

// 			let mensaje = "";
// 			// Validación de Contraseña. 
// 			if (validPassword) {
// 				mensaje = "Welcome " + user.username;
// 				console.log(mensaje)
// 				done(null, user, req.flash('success', mensaje));
// 			} else {
// 				mensaje = "Incorrect Password";
// 				console.log(mensaje)
// 				done(null, false, req.flash('message', mensaje));
// 			}
// 		} else {
// 			mensaje = "The Username does not exists";
// 			console.log(mensaje)
// 			return done(null, false, req.flash('message', mensaje));
// 		}
		
// 	}
// ));

// // Guardar el usuario dentro de la session
// passport.serializeUser((user, done) => {
// 	// Callback para que continue..
// 	// Gracias al Id se mantiene iniciada la session.
// 	done(null, user.id);
// });

// // Deserializar es partir de la id para poder volver a obtener los datos del usuario.
// passport.deserializeUser(async (id, done) => {
// 	const rows = await connect_mysql.query("SELECT * FROM usuarios WHERE id = ?", [id]);
// 	done(null, rows[0]);
// });

// module.exports = passport;
