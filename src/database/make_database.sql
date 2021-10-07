-- Crear Base de Datos
CREATE SCHEMA `stipps` ;

-- Crear Tablas:
CREATE TABLE `stipps`.`cursos` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `stipps`.`docentes` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `stipps`.`usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`));