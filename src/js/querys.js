const express = require("express");
const cors = require("cors");
const db = require("../database/conexion");
const app = express();

// Settings

//Middlewares
// Acciones que se ejecutan antes de que se exploren las rutas
app.use(express.urlencoded({ extended: false }));
// Convertir de JSON a Variables:
app.use(express.json());
// Guardamos el puerto como una variable
const PORT = process.env.PORT || 3000;

app.use(cors());

// Servidor API REST
// Routers: Enrutamiento según la petición hecha en la página Web.
// PENDIENTE: Mover todas las peticiones al archivo:
// app.use(require('./routes/movimiento'));
app.get("/all", (req, res) => {
  const consulta_sql = "SELECT * FROM flujo";
  db.query(consulta_sql, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

app.post('', (req, res) => {
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

app.get("/:id", (req, res) => {
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

app.put("/:id", (req, res) => {
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

app.delete("/:id", (req, res) => {
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
app.listen(PORT, () => {
  console.log("Servidor on Port: " + PORT);
});

module.exports = app;