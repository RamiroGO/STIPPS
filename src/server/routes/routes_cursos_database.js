// RUTAS DEL SERVIDOR
const express = require("express");
const database = require('../../database/connect_database_mysql.js');

const router = express.Router();

// Rutas de Peticiones para redirigir a la Base de Datos y hacer consultas sobre las áreas y los cursos.
router.get("/areas", (req, res) => {
  console.log("Petición Get Areas from DataBase")
  const consulta_sql = "SELECT * FROM areas";
  database.query(consulta_sql, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

router.get("/all", (req, res) => {
  console.log("Petición Get All from DataBase")
  const consulta_sql = "SELECT * FROM cursos";
  database.query(consulta_sql, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

// Ruta para obtener la lista de cursos correspondientes a un área de estudio.
router.get("/:name_area", (req, res) => {
  console.log("Petición Get All from DataBase cursos/id_area");
  
  // Consulta a la Base de Datos: Filtrar la lista de cursos a partir del nombre del área.
  let values_area = [req.params.name_area];
  let consulta_sql =
    "SELECT cursos.nombre AS nombre " +
    "FROM areas " +
    "INNER JOIN cursos ON cursos.id_area = areas.id " +
    "WHERE areas.nombre IN(?);";
  database.query(consulta_sql, values_area, ((err, data) => {
    if (err) console.log(err);
    else res.json(data)
  }));
});

module.exports = router;
