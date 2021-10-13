-- Crear Base de Datos
DROP SCHEMA IF EXISTS `stipps`;
CREATE SCHEMA IF NOT EXISTS `stipps`;
USE `stipps`;
-- Tablas sin llaves foraneas:
-- Eliminar Tabla: Tabla de Usuarios
DROP TABLE IF EXISTS `stipps`.`usuarios`;
-- Crear Tabla: Tabla de Usuarios
CREATE TABLE IF NOT EXISTS `stipps`.`usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `actividad_organizacion` VARCHAR(50) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `passw` VARCHAR(80) NOT NULL,
  `teléfono` VARCHAR(100) NOT NULL,
  `dirección` VARCHAR(80) NOT NULL,
  `descripcion` MEDIUMTEXT,
  PRIMARY KEY (`id`)
);

-- Eliminar Tabla: Tabla de Cursos
DROP TABLE IF EXISTS `stipps`.`cursos`;
-- Crear Tabla: Tabla de Cursos
CREATE TABLE IF NOT EXISTS `stipps`.`cursos` (
  `id` INT UNIQUE AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `area` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`)
);

-- Tablas con Doble Llaves Foraneas:
-- Eliminar Tablas: Tabla de Relaciones entre Usuarios y Curso:
DROP TABLE IF EXISTS `stipps`.`rel_cursos_usuarios`;
-- Crear Tablas: Tabla de Relaciones entre Usuarios y Curso:
CREATE TABLE IF NOT EXISTS `stipps`.`rel_cursos_usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `id_curso` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  FOREIGN KEY (`id_curso`) REFERENCES `stipps`.`cursos`(`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `stipps`.`usuarios`(`id`),
  PRIMARY KEY (`id`)
);
