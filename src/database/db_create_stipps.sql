-- Crear Base de Datos
DROP SCHEMA IF EXISTS `stipps`;
CREATE SCHEMA IF NOT EXISTS `stipps`;
USE `stipps`;

-- Crear Tablas Bases:
DROP TABLE IF EXISTS `stipps`.`docentes`;
CREATE TABLE IF NOT EXISTS `stipps`.`docentes` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `stipps`.`areas`;
CREATE TABLE IF NOT EXISTS `stipps`.`areas` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`)
);
-- Crear Tablas con llaves foraneas:
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

DROP TABLE IF EXISTS `stipps`.`usuarios`;
CREATE TABLE IF NOT EXISTS `stipps`.`usuarios` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `curso_id` INT UNSIGNED NOT NULL,
  `descripcion` MEDIUMTEXT NULL,
  FOREIGN KEY (`curso_id`) REFERENCES `stipps`.`cursos`(`id`),
  PRIMARY KEY (`id`)
);