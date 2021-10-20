// Guardamos el Formulario en una variable
const form_user = document.getElementById('formRegisterUser');
// Activamos los eventos de presionar botones.
form_user.addEventListener("submit", (event) => {
	// Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
	event.preventDefault();
	const _dataUser = FormData2Obj(new FormData(form_user));
	const _string_dataUser = JSON.stringify(_dataUser);
	console.log(_string_dataUser);

	fetch('http://localhost:3000/signup',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: _string_dataUser
		})
		.then(console.log("enviado..."))
		// .done(() => {
		// 	alert("Bienvenido");
		// 	location.href = "consulta.html";
		// });

	// Funciones Internas del evento
	function FormData2Obj(form_data) {
		return {
			name_user: form_data.get("txtNombre"),
			full_user: form_data.get("txtApellido"),
			pass_user: form_data.get("txtPsw1"),
			tele_user: form_data.get("txtTelefono"),
			addr_user: form_data.get("txtDireccion")
		};
	}
});