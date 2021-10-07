let database_1 = require("../../js/db");

let form_data = document.getElementById("formConsulta");

// Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", function (event) {
  // Cargar Lista de Areas y Cursos desde el DataBase
  let areasList = database_1.get("Areas");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Recorrer el arreglo y visualizar
  arrayJson.forEach((row) => {
    show_newRowInTable(row, "tableTransaction");
  });
});