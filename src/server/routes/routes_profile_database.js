// RUTAS DEL SERVIDOR
const express = require("express");
const database = require('../../database/connect_database_mysql.js');
const id_user = require("../../lib/hi_user.js").id_user;

const router = express.Router();

// Rutas de Peticiones para redirigir a la Base de Datos.
router.get("/id", (req, res) => {
  res.json(id_user());
});

router.get("/all", (req, res) => {
  console.log("Petición Get All from DataBase")
  const consulta_sql = "SELECT * FROM cursos";
  consulta_query(consulta_sql, [], res);
});
// Ruta para pedir los cursos inscritos por el usuario junto con sus respectivas áreas.
router.get("/:id/cursos", (req, res) => {
  console.log("Petición Get cursos from User")
  const values = [req.params.id];

  // Consulta a la Base de Datos:
  // Filtrar los datos que requiere un usuario para determinar los cursos a los que se encuentra inscrito
  //  a partir del id del usuario.
  let consulta_sql =
    "SELECT " +
    " rel_cursos_usuarios.id AS id" +
    " , stipps.areas.nombre AS areaFormUser" +
    " , cursos.nombre AS cursoFormUser" +
    " , docentes.nombre AS docente" +
    " , cursos.id AS id_curso" +
    " FROM stipps.rel_cursos_usuarios" +
    " INNER JOIN stipps.cursos				      ON stipps.cursos.id 					          = stipps.rel_cursos_usuarios.id_curso" +
    " INNER JOIN stipps.areas				        ON stipps.areas.id 						          = stipps.cursos.id_area" +
    // " -- Solicitar el nombre del Docente a partir de la tabla de relación curso_docente." +
    " INNER JOIN stipps.rel_cursos_docentes	ON stipps.rel_cursos_docentes.id_curso	= stipps.cursos.id" +
    " INNER JOIN stipps.docentes 		        ON stipps.docentes.id 	            		= stipps.rel_cursos_docentes.id_docente" +
    " WHERE id_usuario IN(?);";

  consulta_query(consulta_sql, values, res);
});

// Ruta para inscribir una asignatura a un usuario.
router.post('/cursos', (req, res) => {
  let values = Object.values(req.body);
  console.log(values);

  // Consulta para conocer el id_curso a partir del nombre del curso.
  let consulta_sql =
    "SELECT" +
    "  stipps.cursos.id       AS id_curso" +
    ", stipps.docentes.nombre AS nombre_docente" +
    " FROM stipps.cursos" +
    " INNER JOIN rel_cursos_docentes  ON rel_cursos_docentes.id_curso = cursos.id" +
    " INNER JOIN docentes             ON docentes.id                  = rel_cursos_docentes.id_docente" +
    ` WHERE cursos.nombre IN (?);`;

  database.query(consulta_sql, values[1], (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    else if (result.length == 0) res.json({
      "error de inscripción": "no hay docentes"
    })
    else {
      consulta_sql =
        "INSERT INTO stipps.rel_cursos_usuarios" +
        "   (`id_usuario`, `id_curso`)" +
        " VALUES" +
        `   (?,           ${result[0].id_curso})`;
      database.query(consulta_sql, values[0], (err, response) => {
        if (err) {
          res.json({ "Esto es un mensaje": "inserción fallida :'(" });
        }
        else {
          res.json({
            /// Se puede decidir retornar la id del curso o la id de la inscripción del curso
            /// Cuidando que el resto de rutas y códigos destinadas para la manipular la inscripción del curso sigan dicho sistema.
            // id: response.insertId,
            id: result[0].id_curso,
            docente: result[0].nombre_docente
          });
        }
      })
    };
  });
});

router.put("/:id", (req, res) => {
  const values = Object.values(req.body).concat(parseInt(req.params.id));
  console.log(values);

  const consulta_sql =
    "UPDATE stipps.cursos SET nombre_envia=?, nombre_recibe=?, tipo_recurso=?, cantidad=?, FechaHora=? WHERE id=?";

  consulta_query(consulta_sql, values, res);
});

// Ruta para eliminar todos los cursos del usuario
router.delete('/all', (req, res) => {
  const values = [parseInt(req.body.id), parseInt(req.body.cantidad)];
  console.log(values);
  const consulta_sql =
    "DELETE" +
    " FROM `stipps`.`rel_cursos_usuarios`" +
    " WHERE (" +
    ` id_usuario = ${values[0]}` +
    " AND" +
    " (" +
    "   SELECT COUNT(id_curso)" +
    "   FROM stipps.rel_cursos_usuarios" +
    "   WHERE (`id_usuario` = ?)" +
    "   ) IN(?)" +
    " );"

  consulta_query(consulta_sql, values, res);
});

// Ruta para eliminar un curso ya inscrito
router.delete('/del_curso', (req, res) => {
  // Con este comando, ya no interesa el nombre de los parámetros sino el orden.
  const values = Object.values(req.body);
  console.log(values);
  const consulta_sql =
    "DELETE" +
    " FROM `stipps`.`rel_cursos_usuarios`" +
    " WHERE (id_usuario = ?  AND id_curso = ?)";
  consulta_query(consulta_sql, values, res);
});

module.exports = router;

function consulta_query(consulta_sql, values, res, callback=()=>{}) {
  database.query(consulta_sql, values, (err, data) => {
    if (err) console.log(err);
    else {
      res.json(data);
      callback();
    }
  });
}
