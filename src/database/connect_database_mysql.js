const mysql = require("mysql");
const { database: key_database } = require('./key_irma.js');

// traer la información de la key_database para generar la conexión con la base de datos
const connect_mysql = mysql.createConnection(key_database);

connect_mysql.connect((err) => {
  if (err) {
    console.log("Error Connect to Database (U_U') ", err);
    return err;
  } else console.log("Connection Database SuccesFull! (^_^) ");
});

module.exports = connect_mysql;