INSERT INTO `stipps`.`rel_cursos_usuarios`
    (`id`, `id_usuario`, `id_curso`)
VALUES
    (19, 3,       (SELECT `id` FROM `stipps`.`cursos` WHERE nombre = "Derecho Agrario"))
;
