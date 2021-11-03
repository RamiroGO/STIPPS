const express = require("express");
const router = express.Router();
const { join } = require('path');

// Solo se debe implementar en las rutas que se desean proteger, no en las rutas de acceso.
const { isNotLoggedIn } = require("../../lib/is_logged.js");

// Ventana de Inicio de la página web
router.get("/", isNotLoggedIn, (_req, res) => {
	console.log('get_init_Not Log');
	// Dibuja la página Principal para acceder a un usuario ya existente
	res.render("acceso");
});

// Cargar los archivos de las views sea cual se pida.
// router.get("/css/:file", (req, res) => {
// 	const patch_file = join(__dirname, "../../views/" + "css" + "/", req.params.file);
// 	res.sendFile(patch_file);
// });
// router.get("/img/:file", (req, res) => {
// 	const patch_file = join(__dirname, "../../views/" + "img" + "/", req.params.file);
// 	res.sendFile(patch_file);
// });
// router.get("/js/:file", (req, res) => {
// 	const patch_file = join(__dirname, "../../views/" + "js" + "/", req.params.file);
// 	res.sendFile(patch_file);
// });
router.get("/:ext/:file", (req, res) => {
	const patch_file = join(__dirname, "../../views/" + req.params.ext + "/", req.params.file);
	res.sendFile(patch_file);
});
module.exports = router;