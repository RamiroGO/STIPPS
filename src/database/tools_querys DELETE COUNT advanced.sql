SELECT COUNT(*) FROM `stipps`.`rel_cursos_usuarios`;

DELETE
 FROM `stipps`.`rel_cursos_usuarios`
 WHERE (
 `id_usuario` = 1 AND
	(
		SELECT COUNT(id_curso)
         FROM stipps.rel_cursos_usuarios
		 WHERE (`id_usuario` = 1)
     ) IN(3)
 );
