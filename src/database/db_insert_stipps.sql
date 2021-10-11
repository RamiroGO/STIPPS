USE `stipps`;
INSERT INTO `stipps`.`areas`
	(`nombre`, `descripcion`)
VALUES
	("Ambiental", "Poner Ambiente"),
    ("Derecho", "Poner Derecho"),
    ("Programación", "Poner Programa"),
    ("Social", "Poner Social"),
    ("Tecnología", "Poner Tecno")
;
SELECT * FROM `stipps`.`areas`;

INSERT INTO `stipps`.`cursos`
	(`nombre`, `descripcion`, `area_id`)
VALUES
    ("Tratamiento Residuos Solidos Organicos", "1", 1),
    ("Tratamiento de Aguas Residuales", "2", 1),
    ("Instalacion de Baño Seco y Tratamiento Excretas", "3", 1),
    ("Sistemas de Compostaje", "4", 1),
    ("Derecho Agrario", "5", 2),
    ("Derecho Comercial", "6", 2),
    ("Derecho Constitucional", "7", 2),
    ("Derecho Familia", "8", 2),
    ("Derecho Laboral", "9", 2),
    ("Derecho Penal", "10", 2),
	("Introduccion a la Informatica", "11", 3),
    ("Programacion Uno", "12", 3),
    ("Programacion Dos", "13", 3),
    ("Programacion tres", "14", 3),
    ("Asistencia A Familias", "15", 4),
    ("Principios de Mecanica Basica", "16", 5),
    ("Motores", "17", 5),
    ("Extraccion de Agua con Bomba de Ariete", "18", 5),
    ("Sistemas Fotovoltaicos y Soluciones con Energia Solar", "19", 5)
;
SELECT * FROM `stipps`.`cursos`;