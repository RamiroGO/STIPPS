// Guardamos el Formulario en una variable
const form_user = document.getElementById('formRegisterUser');
// Activamos los eventos de presionar botones.
form_user.addEventListener("submit", (event) => {
	// Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
	event.preventDefault();
	const _dataUser = FormData2Obj(new FormData(form_user));
	const _string_dataUser = JSON.stringify(_dataUser);
	console.log(_string_dataUser);

	fetch('http://localhost:3000/profile',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: _string_dataUser
		}).then(console.log("enviado..."));
	// .done((result) => {
	// 		if ($("#txtUsuario").val() == usuario &&
	// 			$("#txtClave").val() == clave) {

	// 			alert("Bienvenido");
	// 			location.href = "consulta.html";

	// 		} else {
	// 			alert("usuario no existe o clave incorrecta");
	// 		}
	// 	})

	// Funciones Internas del evento
	function FormData2Obj(form_data) {
		return {
			name_user: form_data.get("txtNombre"),
			last_name: form_data.get("txtApellido"),
			telephone: form_data.get("txtTelefono"),
			address: form_data.get("txtDireccion"),
			psw: form_data.get("txtPsw1")
		};
	}
});