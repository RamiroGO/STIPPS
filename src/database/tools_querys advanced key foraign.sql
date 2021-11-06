USE stipps;

SELECT rel_cursos_usuarios.id as id, areas.nombre as area, cursos.nombre as curso, docentes.nombre as docente
	FROM rel_cursos_usuarios
	INNER JOIN cursos ON cursos.id = rel_cursos_usuarios.id_curso
    INNER JOIN areas ON areas.id = cursos.id_area
    INNER JOIN rel_cursos_docentes ON rel_cursos_docentes.id_curso = cursos.id
    INNER JOIN docentes ON docentes.id = rel_cursos_docentes.id_docente
    WHERE id_usuario IN(1);
    
SELECT cursos.nombre
	FROM areas
    INNER JOIN cursos ON cursos.id_area = areas.id
    WHERE areas.nombre IN('Derecho');
    
SELECT *
	FROM rel_cursos_usuarios
	INNER JOIN cursos ON cursos.id = rel_cursos_usuarios.id_curso
    INNER JOIN areas ON areas.id = cursos.id_area
    INNER JOIN rel_cursos_docentes ON rel_cursos_docentes.id_curso = cursos.id
    INNER JOIN docentes ON docentes.id = rel_cursos_docentes.id_docente
    WHERE id_usuario IN(1);


-- Partir del nombre del curso para obtener el id del curso y el nombre del docente.
-- El id_curso servirá para realizar el proceso de inscripción, el nombre del docente para llenar la tabla en views.
SELECT stipps.cursos.id as idCursos, stipps.docentes.nombre as nombreDocente
 FROM cursos
 INNER JOIN rel_cursos_docentes ON rel_cursos_docentes.id_curso = cursos.id
 INNER JOIN docentes ON docentes.id = rel_cursos_docentes.id_docente
 WHERE `cursos`.`nombre` IN("Motores");

SELECT * -- stipps.cursos.id, stipps.docentes.nombre
FROM stipps.cursos
INNER JOIN stipps.rel_cursos_docentes ON stipps.rel_cursos_docentes.id_curso = stipps.cursos.id
INNER JOIN stipps.docentes ON stipps.docentes.id = stipps.rel_cursos_docentes.id_docente
WHERE stipps.cursos.nombre IN ("Derecho Familia");

SELECT
 rel_cursos_usuarios.id AS id
 , stipps.areas.nombre AS areaFormUser
 , cursos.nombre AS cursoFormUser
 , docente.nombre AS IDdocente
 FROM stipps.rel_cursos_usuarios
 INNER JOIN stipps.cursos				ON stipps.cursos.id 					= stipps.rel_cursos_usuarios.id_curso
 INNER JOIN stipps.areas				ON stipps.areas.id 						= stipps.cursos.id_area
 -- Solicitar el nombre del Docente a partir de la tabla de relación curso_docente.
 INNER JOIN stipps.rel_cursos_docentes	ON stipps.rel_cursos_docentes.id_curso	= stipps.cursos.id
 INNER JOIN stipps.docentes 			ON stipps.docentes.id 					= stipps.rel_cursos_docentes.id_docente
 WHERE id_usuario IN(195);
 
 SELECT * FROM stipps.rel_cursos_usuarios;
 