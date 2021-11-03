// let database_1 = require("../../database/conexion");
// let query_server = require("../../js/query_server.js");

let id_reg = 0;
const nameDataBase = "CursosLocalStorage";

// Evento: Instrucción que se ejecuta después de cargar la página.
document.addEventListener("DOMContentLoaded", (event) => {
  const idTable = "tblSalidaDato";

  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem(nameDataBase);

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  // Recorrer el arreglo y visualizar
  for (id_reg = 0; id_reg != arrayJson.length; id_reg++) {
    show_newRowTable(idTable, arrayJson[id_reg], id_reg);
  }
});

// Evento: Activamos los eventos de presionar botones.
function addRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Se autoincrementa antes de asignarse, para que comience en 1 la id del registro en la database.
  // id_reg++;

  // Reciclación de id's xd
  id_reg = generateNewIdToDataBase(nameDataBase);
  console.log("id generado", id_reg);
  
  
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
      docente: "Irma",
    };

  // Guarda la información del formulario en el LocalStorage
  setDataBase(nameDataBase, json_data);

  // Inserta la información en la tabla; Para no recargar la página.
  show_newRowTable("tblSalidaDato", json_data, cant_fila);

  // Reiniciar los valores de las casillas del formulario
  $form_user.reset();
  console.log("Curso Añadido: ", json_data);

  // Función para recibir el nuevo id de la base de datos.
  function generateNewIdToDataBase(nameDataBase) {
    // Revisar el localStorage
    let stringLocalStorage = localStorage.getItem(nameDataBase);

    // Convertir texto a JSON
    let arrayJson = JSON.parse(stringLocalStorage) || [];

    let isWorks;
    let correId = 1;
    let correJson;

    do {
      isWorks = true; // nuevo intento
      for (
        correJson = 0;
        correJson != arrayJson.length && isWorks;
        correJson++
      ) {
        const id_Local = arrayJson[correJson]["id"];
        let is_same = id_Local == correId;
        if (is_same) {
          isWorks = false;
        }
      }

      // Si no funcionó, siga con el siguiente id
      if (!isWorks) {
        correId++;
      }
    } while (!isWorks);

    return correId;
  }
}

function delAll(event, idTable, setNameDataBase) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Buscar el Database
  localStorage.setItem(setNameDataBase, "[]");

  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  const $tableBody = document.getElementById(idTable);
  $tableBody.innerHTML="";

  // Reiniciar los valores de las casillas del formulario
  const $form_user = document.getElementById("formConsulta");
  $form_user.reset();
  console.log("Todo Borrado");
}

// Función para eliminar una fila.
function delData(event, sel_row) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  console.log("Id para Eliminar: " + sel_row);

  /// Eliminar elemento de la Base de Datos
  // Revisar el localStorage
  let stringLocalStorage = localStorage.getItem(nameDataBase);

  // Convertir texto a JSON
  let arrayJson = JSON.parse(stringLocalStorage) || [];

  const idTable = "tblSalidaDato",
    keyName = nameDataBase;

  // se reinicia la tabla
  let $tabla = document.getElementById(idTable);

  // Definir objeto JSON que acumulará las variables a guardar en la base de datos
  let JSONData = [];
  $tabla.innerHTML = "";

  /// Se recorre el arreglo de datos, pero se ignora el elemento que se quiere eliminar
  // Recorrer el arreglo y visualizar
  id_reg = 0;
  for (let countRowDraw = 0; id_reg != arrayJson.length; id_reg++)
    if (id_reg != sel_row) {
      JSONData.push(arrayJson[id_reg]);
      show_newRowTable(idTable, arrayJson[id_reg], countRowDraw);
      countRowDraw++; // Solo cuenta filas dibujadas; Inicializa en 0.
    } else console.log("Borra el elemento: ", id_reg);

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
function show_newRowTable(idTable, elementJson, sel_fila) {
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
  $newRow.textContent = elementJson["docente"];

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(4);

  // Generamos los textos correspondientes a la creación de nuevas etiquetas html de tipo botones de envio de formulario (submit)
  const strBtnDel = `<input type='submit' key=${elementJson["id"]} onclick='delData(event,${sel_fila})' value ='Borrar' />`;

  // Guardamos en el HTML el texto necesario correspondiente para la generación de los nuevos elementos que estarán dentro de la celda recien creada.
  $newRow.innerHTML = strBtnDel;
}
