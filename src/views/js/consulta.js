// Variables Globales 
let $_id_reg = 0;
let $_id_user = 0;

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
function show_rowTable(idTable, elementJson) {
  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  let $tableBody = document.getElementById(idTable);

  // Inserta una nueva fila a la tabla, ubicándola en la última posición, y guardará en una variable la referencia hacia esta fila.
  let $newRowTableBody = $tableBody.insertRow(-1);

  // Creamos una variable que representa a la nueva fila.
  let $newRow;

  // Creamos la primera celda de la fila creada.
  $newRow = $newRowTableBody.insertCell(0);
  // Escribimos el contenido de la celda creada.
  // La primera celda representa la numeración de filas
  $newRow.textContent = $_id_reg;
  $_id_reg++;

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
  const strBtnDel = `<input type='submit' onclick='delData(event,${elementJson["id_curso"]})' value ='Borrar' />`;

  // Guardamos en el HTML el texto necesario correspondiente para la generación de los nuevos elementos que estarán dentro de la celda recien creada.
  $newRow.innerHTML = strBtnDel;
}

// Petición al Servidor para Consultar en la Base de Datos la lista de cursos a los que se encuentra registrado el usuario.
function show_getCursosUsuario(idTable) {
  const url_get = "http://localhost:3000/profile/" + $_id_user + "/cursos";
  fetch(url_get)
    .then(response_ => response_.json())
    .then((arrayJson) => {
      // Recorrer el arreglo y visualizar
      $_id_reg = 1;
      arrayJson.forEach(elementJson => {
        show_rowTable(idTable, elementJson);
      });
    });
}

// Funciones de Eventos:
// EVENTO: Después de cargar la página.
document.addEventListener("DOMContentLoaded", () => {
  const idTable = "tblSalidaDato";

  // Petición al Servidor para Revisar la Base de Datos del Usuario
  show_getOptionsSelect_MySQLServer('http://localhost:3000/cursos/areas', "idSelectArea");

  // Función para traer las variables del Loggin
  fetch(`http://localhost:3000/profile/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(value => {
      $_id_user = value.id_user
    })
    // Función para hacer petición de los cursos a los que se encuentra inscrito el usuario.
    .then(() => { show_getCursosUsuario(idTable) });
});

// EVENTO: Cuando se selecciona un área:
// - Se cargan los cursos correspondientes a esa área.
// - Se visualiza el elemento HTML para la selección de cursos.
// - Se elimina la opción de --Seleccionar-- de la lista de áreas.
document.getElementById("idSelectArea").addEventListener('change', (event) => {
  // Eliminar el elemento de opción nula por defecto.
  const $areaSelect = document.getElementById("idSelectArea").options[0];
  if ($areaSelect.text === '--Seleccionar--')
    $areaSelect.remove(0);

  // Visualizar lista de selección de opciones de cursos
  document.getElementById("id_LabelCurso").hidden = false;

  // S define la ruta URL con el área seleccionada.
  const url_getCursos = 'http://localhost:3000/cursos/' + event.target.value;
  // Se desarrolla una petición GET al servidor con la ruta para obtener los cursos correspondientes al Área seleccionada. 
  show_getOptionsSelect_MySQLServer(url_getCursos, 'idSelectCurso');
});


// EVENTO: Cuando se selecciona un Curso:
// - Se visualiza el elemento HTML para la inserción del curso.
// - Se elimina la opción de --Seleccionar-- de la lista de áreas.
document.getElementById("idSelectCurso").addEventListener('change', () => {
  document.getElementById("idInsertCurso").hidden = false;
});

// Evento: Activamos los eventos de presionar botones.
async function addRow(event) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Guardamos el Formulario en una variable
  const $form_user = document.getElementById("formConsulta"),
    cant_fila = document.getElementById("tblSalidaDato").rows.length,
    form_data = new FormData($form_user); // Almacenar la información del formulario en un Objeto.

  // Añadimos el parámetro 'id' a la información json_data de cada fila, según la cantidad de filas de la tabla en el momento del evento del botón "agregar".
  let json_data = { id_user: $_id_user };

  // Convertir la información del formulario en un JSon
  json_data.cursoFormUser = form_data.get("nameCurso");

  // Convertir el JSON en una cadena String antes de enviar
  const string_data = JSON.stringify(json_data);

  // Función para hacer petición de los cursos a los que se encuentra inscrito el usuario.
  await fetch(`http://localhost:3000/profile/cursos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: string_data
  })
    // Convertir la respuesta del servidor en json
    .then(data => data.json())
    .then((response) => {
      // Llenar el Objeto json_data para para tener los elementos pedidos
      // para insertar en la tabla a partir de la Id en la Base de Datos.
      json_data.id = response.id;
      json_data.areaFormUser = form_data.get("nameArea");
      json_data.docente = response.docente;

      
      // Reiniciar elementos para ingresar cursos y ocultarlos
      //  :: También pudo haber funcionado simplemente el
      //  ocultar esta opción del HTML dándole un id y un hidden
      let $area_select = document.getElementById("idSelectArea");
      // Generar un nuevo elemento 'option' para el 'select'
      let $newOption = document.createElement('option');
      // Darle un texto al elemento 'option' correspondiente con la información recibida de la petción.
      $newOption.text = "--Seleccionar--";
      // Añadir el elemento 'option' al elemento 'select'
      $area_select.prepend($newOption);
      // Ocultar la lista de selección de opciones de cursos
      document.getElementById("id_LabelCurso").hidden = true;
    });

  // Inserta la información en la tabla; Para no recargar la página.
  show_rowTable("tblSalidaDato", json_data);

  // Reiniciar los valores de las casillas del formulario
  $form_user.reset();
  console.log("Curso Añadido: ", json_data);
}

function delAll(event, idTable) {
  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  // Petición para Eliminar los cursos de este usuario.
  fetch('http://localhost:3000/profile/all', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: $_id_user,
      cantidad: JSON.stringify(document.getElementById("tblSalidaDato").rows.length)
    })
  }).catch((res) => console.log(res));

  // Capturar el elemento, que se asume es una tabla, para que pueda ser manipulado.
  const $tableBody = document.getElementById(idTable);
  $tableBody.innerHTML = "";

  // Reiniciar los valores de las casillas del formulario
  document.getElementById("formConsulta").reset();
  console.log("Todo Borrado");
}

// Función para eliminar una fila.
function delData(event, id_curso) {
  const idTable = "tblSalidaDato";

  // Evitar el reinicio de la página dado al activar eventos. Al presionar botón.
  event.preventDefault();

  console.log("Id para Eliminar: " + id_curso);

  // Petición para Eliminar el curso seleccionado de este usuario.
  fetch('http://localhost:3000/profile/del_curso', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_usuario: $_id_user,
      id_curso: id_curso
    })
  }).catch((res) => console.log(res));

  // se reinicia la tabla
  let $tabla = document.getElementById(idTable);

  $tabla.innerHTML = "";

  // Función para hacer petición de los cursos a los que se encuentra inscrito el usuario.
  show_getCursosUsuario(idTable);
}
