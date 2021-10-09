// let database_1 = require("../../database/conexion");
// let query_server = require("../../js/query_server.js");

let id_reg = 0;

// Evento: Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", function (event) {
  const idTable = "tblSalidaDato";

  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem("flujosDataLocalStorage");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Conteo Global de Elementos añadidos
  id_reg = 0;

  // Incrementamos el contador de filas dibujadas
  let count_fila = 0;
  // Recorrer el arreglo y visualizar
  arrayJson.forEach((elementJson) => {
    count_fila++;
    id_reg++;
    show_newRowTable(idTable, elementJson, count_fila);
  });
});

// Evento: Activamos los eventos de presionar botones.
function addRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();
  id_reg++;

  // Guardamos el Formulario en una variable
  const $form_user = document.getElementById("formConsulta"),
    cant_fila = document.getElementById("tblSalidaDato").rows.length,
    form_data = new FormData($form_user), // Almacenar la información del formulario en una variable.
    json_data = {
      // Convertir la información del formulario en un JSon
      // Añadimos el parámetro 'id' a la información json_data de cada fila, según la cantidad de filas de la tabla en el momento del evento del botón "agregar".
      id: id_reg,
      areaFormUser: form_data.get("nameArea"),
      cursoFormUser: form_data.get("nameCurso"),
      emailFormUser: "Ramiro",
    };

  // Guarda la información del formulario en el LocalStorage
  setDataBase("flujosDataLocalStorage", json_data);

  // Inserta la información en la tabla; Para no recargar la página.
  show_newRowTable("tblSalidaDato", json_data, cant_fila);

  // Reiniciar los valores de las casillas del formulario
  $form_user.reset();
  console.log("Curso Añadido");
}

// Función para eliminar una fila.
function delData(event, sel_row) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  console.log("Id Recibida" + sel_row);

  /// Eliminar elemento de la Base de Datos
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem("flujosDataLocalStorage");

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  const idTable = "tblSalidaDato",
    keyName = "flujosDataLocalStorage";

  // se reinicia la tabla
  let $tabla = document.getElementById(idTable);
  $tabla.innerHTML = "";

  /// Se recorre el arreglo de datos, pero se ignora el elemento que se quiere eliminar
  // Recorrer el arreglo y visualizar
  for (id_reg = 0, JSONData = []; id_reg != arrayJson.length; id_reg++)
    if (id_reg != sel_row) {
      JSONData.push(arrayJson[id_reg]);
      show_newRowTable(idTable, arrayJson[id_reg], id_reg);
    }

  // convertir JSON a texto
  let stringArrayJson = JSON.stringify(JSONData);

  // Guardar en el LocalStorage
  localStorage.setItem(keyName, stringArrayJson);
}

// Guarda la información
function setDataBase(keyName, JSONData) {
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem(keyName);

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Insertar JSONData para el arreglo previo al localStorage
  arrayJson.push(JSONData);

  // convertir JSON a texto
  let stringArrayJson = JSON.stringify(arrayJson);

  // Guardar en el LocalStorage
  localStorage.setItem(keyName, stringArrayJson);
}

// Dibujar una fila en la tabla
function show_newRowTable(idTable, elementJson, count_fila) {
  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  let $tableBody = document.getElementById(idTable);

  // Inserta una nueva fila a la tabla, ubicándola en la última posición, y guardará en una variable la referencia hacia esta fila.
  let $newRowTableBody = $tableBody.insertRow(-1);

  // Creamos una variable que representa a la nueva fila.
  let $newRow;

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(0);
  // Escribimos el contenido de la celda creada.
  $newRow.textContent = elementJson["id"];

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(1);
  // Escribimos el contenido de la celda creada.
  $newRow.textContent = elementJson["areaFormUser"];

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(2);
  // Escribimos el contenido de la celda creada.
  $newRow.textContent = elementJson["cursoFormUser"];

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(3);
  // Escribimos el contenido de la celda creada.
  $newRow.textContent = elementJson["emailFormUser"];

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(4);

  // Generamos los textos correspondientes a la creación de nuevas etiquetas html de tipo botones de envio de formulario (submit)
  const strBtnDel =
    "<input type='submit' key=" +
    elementJson["id"] +
    " onclick='delData(event," +
    count_fila +
    ")' value ='Borrar' />";

  // Guardamos en el HTML el texto necesario correspondiente para la generación de los nuevos elementos que estarán dentro de la celda recien creada.
  $newRow.innerHTML = strBtnDel;
}
