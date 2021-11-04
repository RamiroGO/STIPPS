// RUTAS DEL SERVIDOR
const express = require("express");
const database = require('../../database/connect_database_mysql.js');

const router = express.Router();

// Rutas de Peticiones para redirigir a la Base de Datos.

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


router.post('', (req, res) => {
  const values = Object.values(req.body);
  console.log(values);

  const consulta_sql =
    "INSERT INTO stipps.cursos (area, nombre, descripcion) VALUES (?,?,?)";

  database.query(consulta_sql, values, (err, result) => {
    if (err) {
      console.log("inserción fallida :(");
      res.json({
        "Esto es un mensaje": "inserción fallida :'(",
      });
      return err;
    } else {
      console.log("inserción exitosa :)");
      res.json({
        "esto es un mensaje": "inserción exitosa",
        result,
      });
    }
  });
});

router.put("/:id", (req, res) => {
  const values = Object.values(req.body).concat(parseInt(req.params.id));
  console.log(values);

  const consulta_sql =
    "UPDATE stipps.cursos SET nombre_envia=?, nombre_recibe=?, tipo_recurso=?, cantidad=?, FechaHora=? WHERE id=?";

  database.query(consulta_sql, values, (err, result) => {
    if (err) {
      console.log("edición fallida :(");
      res.json({
        "esto es un mensaje": "edición fallida :'(",
      });
      return err;
    } else {
      console.log("edición exitosa :)");
      res.json({
        "esto es un mensaje": "edición exitosa",
        result,
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const values = parseInt(req.params.id);
  const consulta_sql = "DELETE FROM cursos WHERE id = ?;";
  database.query(consulta_sql, values, (err, data) => {
    if (err) {
      console.log("eliminación fallida");
      return err;
    } else {
      res.json(data);
      console.log("eliminación exitosa");
    }
  });
});


module.exports = router;
