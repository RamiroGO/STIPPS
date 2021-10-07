var mysql = require("mysql");

var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "", // Para Ramiro
  password: 'root1234', // para Irma
  database: "stipps",
});

conexion.connect((err) => {
  if (err) {
    console.log("Error Connect: =( ", err);
    return err;
  } else console.log("Connection SuccesFull! =D ");
});

module.exports = conexion;
