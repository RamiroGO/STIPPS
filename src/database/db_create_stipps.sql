-- Crear Base de Datos
DROP SCHEMA IF EXISTS `stipps`;
CREATE SCHEMA IF NOT EXISTS `stipps`;
USE `stipps`;
-- Tablas sin llaves foraneas:
-- Crear Tabla de docentes:
DROP TABLE IF EXISTS `stipps`.`docentes`;
CREATE TABLE IF NOT EXISTS `stipps`.`docentes` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` MEDIUMTEXT NULL,
  `passw` VARCHAR(50),
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`docentes`;
SHOW INDEX FROM `stipps`.`docentes`;
-- Crear Tabla: Tabla de Usuarios
DROP TABLE IF EXISTS `stipps`.`usuarios`;
CREATE TABLE IF NOT EXISTS `stipps`.`usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `correo` MEDIUMTEXT NULL,
  `passw` VARCHAR(50),
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`usuarios`;
SHOW INDEX FROM `stipps`.`usuarios`;
-- Crear Tabla de Áreas:
DROP TABLE IF EXISTS `stipps`.`areas`;
CREATE TABLE IF NOT EXISTS `stipps`.`areas` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`areas`;
SHOW INDEX FROM `stipps`.`areas`;
-- Tablas con llave foranea:
-- Crear Tabla: Tabla de Cursos
DROP TABLE IF EXISTS `stipps`.`cursos`;
CREATE TABLE IF NOT EXISTS `stipps`.`cursos` (
  `id` INT UNIQUE AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `area_id` INT NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  FOREIGN KEY (`area_id`) REFERENCES `stipps`.`areas`(`id`),
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`cursos`;
SHOW INDEX FROM `stipps`.`cursos`;
-- Tablas con Doble Llaves Foraneas:
-- Crear Tablas: Tabla de Relaciones entre Usuarios y Curso:
DROP TABLE IF EXISTS `stipps`.`cursos_usuarios`;
CREATE TABLE IF NOT EXISTS `stipps`.`cursos_usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `curso_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  FOREIGN KEY (`curso_id`) REFERENCES `stipps`.`cursos`(`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `stipps`.`usuarios`(`id`),
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`cursos_usuarios`;
SHOW INDEX FROM `stipps`.`cursos_usuarios`;
-- Crear Tablas: Tabla de Relaciones entre Docentes y Curso:
DROP TABLE IF EXISTS `stipps`.`cursos_docentes`;
CREATE TABLE IF NOT EXISTS `stipps`.`cursos_docentes` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `curso_id` INT NOT NULL,
  `docente_id` INT NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  FOREIGN KEY (`curso_id`) REFERENCES `stipps`.`cursos`(`id`),
  FOREIGN KEY (`docente_id`) REFERENCES `stipps`.`docentes`(`id`),
  PRIMARY KEY (`id`)
);
DESCRIBE `stipps`.`cursos_docentes`;
SHOW INDEX FROM `stipps`.`cursos_docentes`;
