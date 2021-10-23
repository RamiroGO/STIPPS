const bcrypt = require('bcryptjs');

const encrypt_psw = {};

// Encriptar la contraseña
encrypt_psw.encryptPassword = async (password) => {
	// A mas número de veces mejor será el encriptado.
	const level_security = 10;
	// Generar un patrón de cifrado
	const salt = await bcrypt.genSalt(level_security);
	// Ciframos la contraseña a partir del patrón.
	const hashpass = bcrypt.hash(password, salt);
	
	return hashpass;
}

// Comparador de Contraseña para realizar el logeo del usuario
// La desencriptación es un trabajo que no se puede secuenciar en los procesos, por tanto hay que esperarlo.
encrypt_psw.matchPassword = async (password, savedPassword) => {
	try {
		// Guardamos la función asíncrona en una promesa.
		const fcn_compare = await bcrypt.compare(password, savedPassword);
		// Ejecutamos la promesa.
		return fcn_compare;
	}
	catch (e) {
		console.log(e);
	}
}

module.exports = encrypt_psw;
