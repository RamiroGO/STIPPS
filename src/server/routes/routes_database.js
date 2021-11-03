// RUTAS DEL SERVIDOR
const express = require("express");
const database = require('../../database/connect_database_mysql.js');

const router = express.Router();
router.get("/all", (req, res) => {
  console.log("Petición Get All from DataBase")
  const consulta_sql = "SELECT * FROM cursos";
  database.query(consulta_sql, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
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

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  console.log("Enserio?")
  const values = req.params.id;
  const consulta_sql = "SELECT * FROM cursos WHERE id = ?;";
  database.query(consulta_sql, values, (err, data) => {
    if (err) {
      console.log("petición fallida");
      return err;
    } else {
      res.json(data);
      console.log("petición exitosa");
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
