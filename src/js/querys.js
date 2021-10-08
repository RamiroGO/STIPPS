const express = require("express");
const cors = require("cors");
const db = require("../database/conexion");
const query_server = express();

// Settings

//Middlewares
// Acciones que se ejecutan antes de que se exploren las rutas
query_server.use(express.urlencoded({ extended: false }));
// Convertir de JSON a Variables:
query_server.use(express.json());
// Guardamos el puerto como una variable
const PORT = process.env.PORT || 3000;

query_server.use(cors());

// Servidor API REST
// Routers: Enrutamiento según la petición hecha en la página Web.
// PENDIENTE: Mover todas las peticiones al archivo:
// query_server.use(require('./routes/movimiento'));
query_server.get("/all", (req, res) => {
  const consulta_sql = "SELECT * FROM flujo";
  db.query(consulta_sql, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

query_server.post('', (req, res) => {
  const values = Object.values(req.body);
  console.log(values);

  const consulta_sql =
    "INSERT INTO recursos.flujo (nombre_envia, nombre_recibe, tipo_recurso, cantidad, FechaHora) VALUES (?,?,?,?,?)";

  db.query(consulta_sql, values, (err, result) => {
    if (err) {
      console.log("inserción fallida :(");
      res.json({
        "esto es un mensaje": "inserción fallida :'(",
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

query_server.get("/:id", (req, res) => {
  console.log(req.params.id);
  const values = req.params.id;
  const consulta_sql = "SELECT * FROM flujo WHERE idflujo = ?;";
  db.query(consulta_sql, values, (err, data) => {
    if (err) {
      console.log("petición fallida");
      return err;
    } else {
      res.json(data);
      console.log("petición exitosa");
    }
  });
});

query_server.put("/:id", (req, res) => {
  const values = Object.values(req.body).concat(parseInt(req.params.id));
  console.log(values);

  const consulta_sql =
    "UPDATE recursos.flujo SET nombre_envia=?, nombre_recibe=?, tipo_recurso=?, cantidad=?, FechaHora=? WHERE idflujo=?";

  db.query(consulta_sql, values, (err, result) => {
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

query_server.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const values = parseInt(req.params.id);
  const consulta_sql = "DELETE FROM flujo WHERE idflujo = ?;";
  db.query(consulta_sql, values, (err, data) => {
    if (err) {
      console.log("eliminación fallida");
      return err;
    } else {
      res.json(data);
      console.log("eliminación exitosa");
    }
  });
});
query_server.listen(PORT, () => {
  console.log("Servidor on Port: " + PORT);
});

module.exports = query_server;