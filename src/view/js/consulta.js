// let database_1 = require("../../database/conexion");
// let query_server = require("../../js/query_server.js");

// Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", function (event) {
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem("flujosDataLocalStorage");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Recorrer el arreglo y visualizar
  arrayJson.forEach((row) => {
    show_newRowInTable(row, "tblSalidaDato");
  });
});

// Guardamos el Formulario en una variable
let form_user = document.getElementById("formConsulta");

// Activamos los eventos de presionar botones.
// form_user.addEventListener("submit", function (event) {
//   // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
//   event.preventDefault();

//   // Almacenar la información del formulario en una variable.
//   const form_data = new FormData(form_user);

//   //Convertir la información del formulario en un JSon
//   const json_data = FormData2Obj(form_data);

//   // Guarda la información del formulario en el LocalStorage
//   saveObjData("flujosDataLocalStorage", json_data);

//   // Inserta la información en la tabla
//   show_newRowInTable(json_data, "tblSalidaDato");

//   // Reiniciar los valores de las casillas del formulario
//   form_user.reset();
// });

function addRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Almacenar la información del formulario en una variable.
  const form_data = new FormData(form_user);

  //Convertir la información del formulario en un JSon
  const json_data = FormData2Obj(form_data);

  // Guarda la información del formulario en el LocalStorage
  saveObjData("flujosDataLocalStorage", json_data);

  // Inserta la información en la tabla
  show_newRowInTable(json_data, "tblSalidaDato");

  // Reiniciar los valores de las casillas del formulario
  form_user.reset();

  console.log("Curso Añadido");
}

function updRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  console.log("Curso Editado");
}
function delRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  console.log("Curso Eliminado");
}
function getRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();
  console.log("Curso Consultado");
}

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
    areaFormUser: form_data.get("nameArea"),
    cursoFormUser: form_data.get("nameCurso"),
    emailFormUser: "Ramiro",
  };
}

function show_newRowInTable(diccForm, idTable) {
  // console.log(diccForm);
  let tableBody = document.getElementById(idTable);

  //
  let ref_newRowTableBody = tableBody.insertRow(-1);

  let newCell;
  newCell = ref_newRowTableBody.insertCell(0);
  newCell.textContent = diccForm["areaFormUser"];

  newCell = ref_newRowTableBody.insertCell(1);
  newCell.textContent = diccForm["cursoFormUser"];

  newCell = ref_newRowTableBody.insertCell(2);
  newCell.textContent = diccForm["emailFormUser"];

  newCell = ref_newRowTableBody.insertCell(3);

  const div_newCell = document.createElement("div"),
    strBtnEdit =
      "<input type='submit' onclick='updRow(event);' value='Editar' />",
    strBtnDel =
      "<input type='submit' onclick='delRow(event)' value = 'Borrar' />";
  div_newCell.innerHTML = strBtnEdit + strBtnDel;
  newCell.appendChild(div_newCell);
}
