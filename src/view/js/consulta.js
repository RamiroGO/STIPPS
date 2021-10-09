// let database_1 = require("../../database/conexion");
// let query_server = require("../../js/query_server.js");

let cant_fila=0;

// Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", function (event) {
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem("flujosDataLocalStorage");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Recorrer el arreglo y visualizar
  arrayJson.forEach((row) => {
    show_newRowTable(row, "tblSalidaDato");
    cant_fila++;
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

  // Convertir la información del formulario en un JSon
  const json_data = FormData2Obj(form_data);

  cant_fila++;

  // Añadimos el parámetro id a la información json_data de cada fila, según la cantidad de filas de la tabla en el momento del evento del botón "agregar".
  json_data.idRow = cant_fila;// document.getElementById("tblSalidaDato").rows.length;

  // Guarda la información del formulario en el LocalStorage
  saveObjData("flujosDataLocalStorage", json_data);

  // Inserta la información en la tabla
  show_newRowTable(json_data, "tblSalidaDato");

  // Reiniciar los valores de las casillas del formulario
  form_user.reset();

  console.log("Curso Añadido");
}

// Función para eliminar una fila.
function delRow(event,idRow) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  let tableBody = document.getElementById("tblSalidaDato");

  // Ejecutar instrucción de eliminar la fila identificada
  tableBody.deleteRow(idRow);
}

// Función para obtener los valores de toda la database.
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
    emailFormUser: "Ramiro"
  };
}
// Dibujar una fila en la tabla
function show_newRowTable(diccForm, idTable) {
  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  let tableBody = document.getElementById(idTable);

  // Inserta una nueva fila a la tabla, ubicándola en la última posición, y guardará en una variable la referencia hacia esta fila.
  let newRowTableBody = tableBody.insertRow(-1);

  // Creamos una variable que representa a la nueva fila.
  let newRow;

  // Creamos la primera celda de la fila creada.
  newRow = newRowTableBody.insertCell(0);
  // Escribimos el contenido de la celda creada.
  newRow.textContent = diccForm["areaFormUser"];

  // Creamos la primera celda de la fila creada.
  newRow = newRowTableBody.insertCell(1);
  // Escribimos el contenido de la celda creada.
  newRow.textContent = diccForm["cursoFormUser"];

  // Creamos la primera celda de la fila creada.
  newRow = newRowTableBody.insertCell(2);
  // Escribimos el contenido de la celda creada.
  newRow.textContent = diccForm["emailFormUser"];

  // Creamos la primera celda de la fila creada.
  newRow = newRowTableBody.insertCell(3);
  // Escribimos el contenido de la celda creada y creamos una etiqueta 'div' dentro de esta celda, en el HTML.
  newRow.textContent = document.createElement("div");

  // console.log(diccForm['idRow']);
  // Generamos los textos correspondientes a la creación de nuevas etiquetas html de tipo botones de envio de formulario (submit)
  // const strBtnEdit =
  //   "<input type='submit' onclick='updRow(event);' value='Editar' />";
  const strBtnDel =
    "<input type='submit' onclick='delRow(event," + diccForm['idRow'] + ")' value ='Borrar' />";

  // Guardamos en el HTML el texto necesario correspondiente para la generación de los nuevos elementos que estarán dentro de la celda recien creada.
  newRow.innerHTML =
    //  strBtnEdit +
    strBtnDel;
}
