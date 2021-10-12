# Conceptualización de la Base de Datos:
## FILOSOFÍA DE DATOS:
### Relación Áreas - Cursos:
#### * **Un** Área posee muchos cursos
#### * **Un** curso solo puede ser parte de un área.
#### Ergo:
##### - Relación 1-N
##### - Las Áreas no se definen por los cursos que le conforman.

### Relación Cursos - Docentes:
#### Un Docente puede enseñar muchos Cursos.
#### Un curso puede ser enseñado por muchos Docentes.
#### Ergo:
##### - Relación M-N
##### - Los Docentes no se definen por los Cursos que enseñan.
##### - Los Cursos no se definen por los Docentes que los enseñan.

### Relación Cursos - Usuarios:
#### Un Usuario puede enseñar muchos Cursos.
#### Un Curso puede ser aprendido por muchos Usuario.
#### Ergo:
##### - Relación M-N
##### - Los Usuarios no se definen por los Cursos que aprenden.
##### - Los Cursos no se definen por los Usuaios que los aprenden.

## ESTRUCTURA DE DATOS:
## - STIPPS
### [Tablas sin llaves foraneas]:
#### * **Áreas**
##### - id
##### - nombre
##### - descripcion
#### * **Docentes**
##### - id
##### - nombre
##### - correo
##### - passw
##### - descripcion
#### * **Usuarios**
##### - id
##### - nombre
##### - correo
##### - passw
##### - descripcion
### [Tablas con llave foranea]:
#### * **Cursos**
##### - id
##### - nombre
##### - area_id
##### - descripcion
### [Tablas con doble llave foranea]:
#### * **Relacion**: Cursos_Usuarios
##### - id
##### - curso_id
##### - usuario_id
##### - descripcion
#### * **Relacion**: Cursos_Docentes
##### - id
##### - curso_id
##### - docente_id
##### - descripcion
