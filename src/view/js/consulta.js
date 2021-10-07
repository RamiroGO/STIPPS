// let database_1 = require("../../database/conexion");
import app from "../../js/querys.js";

let form_user = document.getElementById("formConsulta");

// Activamos los eventos de presionar botones.
form_user.addEventListener("btnAgregar", function (event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Almacenar la información del formulario en una variable
  const form_data = new FormData(form_user);
  //Convertir la información del formulario en un JSon
  const json_data = FormData2Obj(form_data);

  // Guarda la información del formulario en el LocalStorage
  saveObjData("transactionData", json_data);

  // Inserta la información en la tabla
  show_newRowInTable(json_data, "tableTransaction");

  // Reiniciar los valores de las casillas del formulario
  form_user.reset();
});

// Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", function (event) {
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem("transactionData");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Recorrer el arreglo y visualizar
  arrayJson.forEach((row) => {
    show_newRowInTable(row, "tableTransaction");
  });
});

// Guarda la información
function saveObjData(key_data, JSONData) {
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem(key_data);

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Insertar JSONData para el arreglo previo al localStorage
  arrayJson.push(JSONData);

  // convertir JSON a texto
  let stringArrayJson = JSON.stringify(arrayJson);

  // Guardar en el LocalStorage
  localStorage.setItem(key_data, stringArrayJson);
}

function FormData2Obj(form_data) {
  return {
    typeTransaction: form_data.get("nameTypeTransaction"),
    descriptionTransaction: form_data.get("nameDescriptionTransaction"),
    amountTransaction: form_data.get("nameAmountTransaction"),
    categoryTransaction: form_data.get("nameCategoryTransaction"),
  };
}

function show_newRowInTable(diccForm, idTable) {
  console.log(diccForm);
  let tableRef = document.getElementById(idTable);
  let newRowRef = tableRef.insertRow(-1);

  let newCell;
  newCell = newRowRef.insertCell(0);
  newCell.textContent = diccForm["typeTransaction"];

  newCell = newRowRef.insertCell(1);
  newCell.textContent = diccForm["descriptionTransaction"];

  newCell = newRowRef.insertCell(2);
  newCell.textContent = diccForm["amountTransaction"];

  newCell = newRowRef.insertCell(3);
  newCell.textContent = diccForm["categoryTransaction"];
}
