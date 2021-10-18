
// Guardamos el Formulario en una variable
let form_user = document.getElementById('frmAcceso');
// Activamos los eventos de presionar botones.
form_user.addEventListener("submit", () => {
	console.log("Iniciar o Registrar");

	fetch('http://localhost:3000/profile',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: _string_dataUser
		}).then(console.log("enviado..."));
	// Reiniciar los valores de las casillas del formulario
	form_user.reset();
});