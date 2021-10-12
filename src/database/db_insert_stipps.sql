USE `stipps`;
-- [Tablas sin llaves foraneas]:
-- Insertar Áreas
INSERT INTO `stipps`.`areas`
	(`nombre`,          `descripcion`)
VALUES
	("Ambiental",       "Poner Ambiente"),
    ("Derecho",         "Poner Derecho"),
    ("Programación",    "Poner Programa"),
    ("Social",          "Poner Social"),
    ("Tecnología",      "Poner Tecno")
;
-- Insertar Docentes
INSERT INTO `stipps`.`docentes`
	(`nombre`,    `correo`,              `passw`,`descripcion`)
VALUES
	("Jaime",     "Jaime@correo.com",    "1234", "Curso 1 de Jaime"),
	("Fonseca",   "Fonseca@correo.com",  "1234", "Curso 1 de Fonseca"),
	("Margarita", "Margarita@correo.com","1234", "Curso 1 de Margarita")
;
-- Insertar Usuarios
INSERT INTO `stipps`.`usuarios`
	(`nombre`,  `correo`,             `passw`,`descripcion`)
VALUES
	("Alberto", "Alberto@correo.com", "1234", "Curso 1 de Jaime"),
	("Alvaro",  "Alvaro@correo.com",  "1234", "Curso 1 de Fonseca"),
	("Andrea",  "Andrea@correo.com",  "1234", "Curso 1 de Margarita")
;
-- [Tablas con llave foranea]:
INSERT INTO `stipps`.`cursos`
	(`nombre`,                                                  `descripcion`, `area_id`)
VALUES
    ("Tratamiento Residuos Solidos Organicos",                  "1",            1),
    ("Tratamiento de Aguas Residuales",                         "2",            1),
    ("Instalacion de Baño Seco y Tratamiento Excretas",         "3",            1),
    ("Sistemas de Compostaje",                                  "4",            1),
    ("Derecho Agrario",                                         "5",            2),
    ("Derecho Comercial",                                       "6",            2),
    ("Derecho Constitucional",                                  "7",            2),
    ("Derecho Familia",                                         "8",            2),
    ("Derecho Laboral",                                         "9",            2),
    ("Derecho Penal",                                           "10",           2),
	("Introduccion a la Informatica",                           "11",           3),
    ("Programacion Uno",                                        "12",           3),
    ("Programacion Dos",                                        "13",           3),
    ("Programacion tres",                                       "14",           3),
    ("Asistencia A Familias",                                   "15",           4),
    ("Principios de Mecanica Basica",                           "16",           5),
    ("Motores",                                                 "17",           5),
    ("Extraccion de Agua con Bomba de Ariete",                  "18",           5),
    ("Sistemas Fotovoltaicos y Soluciones con Energia Solar",   "19",           5)
;
-- [Tablas con doble llave foranea]:
-- Insertar Relaciones Cursos - Usuarios
INSERT INTO `stipps`.`rel_cursos_usuarios`
    (curso_id, usuario_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (5, 1),
    (5, 2),
    (5, 3),
    (11, 3),
    (15, 1),
    (16, 2)
;
-- Insertar Relaciones Cursos - Docentes
INSERT INTO `stipps`.`rel_cursos_docentes`
    (curso_id, docentes_id)
VALUES
    (1, 1),
    (5, 2),
    (11, 3),
    (15, 1),
    (16, 2)
;
