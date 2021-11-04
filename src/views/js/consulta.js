// Variables Globales 
let id_reg = 0;

// Funciones Utilitarias:
// Cargar los elementos 'options' en los 'select' del HTML
function show_getOptionsSelect_MySQLServer(url_get, IdSelectElement) {
  // Descargar datos de la base de datos con una petición del servidor
  fetch(url_get)
    // Llevar los datos recibidos al elemento de selección en el HTML
    // Convertir la respuesta en un Objeto JSON
    .then(list_areas => list_areas.json())
    .then(list_areas => {
      // Invocar al elemento de selección en el HTML
      let $select = document.getElementById(IdSelectElement);

      // Borrar elementos pre-existentes en la lista
      // excepto el elemento por defecto "--Seleccionar--"
      $select.options.length = 1;

      // Insertar elementos como opciones
      list_areas.forEach((area) => {
        // Generar un nuevo elemento 'option' para el 'select'
        let $newOption = document.createElement('option');

        // Darle un texto al elemento 'option' correspondiente con la información recibida de la petción.
        $newOption.text = area.nombre;

        // Añadir el nuevo elemento 'option' al elemento 'select'
        $select.options.add($newOption);
      });
    });
}

// Dibujar una fila en la tabla
function show_rowTable(idTable, elementJson, sel_fila) {
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


// Funciones de Eventos:
// EVENTO: Después de cargar la página.
document.addEventListener("DOMContentLoaded", (event) => {
  // Evitar recargas indeseadas en la página
  event.preventDefault();

  const idTable = "tblSalidaDato";

  // Petición al Servidor para Revisar la Base de Datos del Usuario
  show_getOptionsSelect_MySQLServer('http://localhost:3000/cursos/areas', "idArea");

  // Función para hacer petición de los cursos a los que se encuentra inscrito el usuario.
  fetch('http://localhost:3000/profile/1/cursos')
    .then(response_ => response_.json())
    .then((arrayJson) => {
      // Recorrer el arreglo y visualizar
      for (id_reg = 0; id_reg != arrayJson.length; id_reg++) {
        show_rowTable(idTable, arrayJson[id_reg], id_reg);
      }
    });
});

// EVENTO: Cuando se selecciona un área:
// - Se cargan los cursos correspondientes a esa área.
// - Se visualiza el elemento HTML para la selección de cursos.
// - Se elimina la opción de --Seleccionar-- de la lista de áreas.
document.getElementById("idArea").addEventListener('change', (event) => {
  const $areaSelect = document.getElementById("idArea").options[0];

  // Eliminar el elemento de opción nula por defecto.
  if ($areaSelect.text === '--Seleccionar--')
    $areaSelect.remove(0);

  // Visualizar lista de selección de opciones de cursos
  document.getElementById("idCurso").hidden = false;
  document.getElementById("labelSelectCurso").hidden = false;
  
  // S define la ruta URL con el área seleccionada.
  const url_getCursos = 'http://localhost:3000/cursos/' + event.target.value;
  // Se desarrolla una petición GET al servidor con la ruta para obtener los cursos correspondientes al Área seleccionada. 
  show_getOptionsSelect_MySQLServer(url_getCursos, 'idCurso');
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
  show_rowTable("tblSalidaDato", json_data, cant_fila);

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
  $tableBody.innerHTML = "";

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
      show_rowTable(idTable, arrayJson[id_reg], countRowDraw);
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
