const mysql = require("mysql");
const { database: key_database } = require('./key_rami.js');

// traer la información de la key_database para generar la conexión con la base de datos
const connect_mysql = mysql.createConnection(key_database);

connect_mysql.connect((err) => {
  if (err) {
    console.log("Error Connect: =( ", err);
    return err;
  } else console.log("Connection SuccesFull! =D ");
});

module.exports = connect_mysql;