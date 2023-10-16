DROP DATABASE IF EXIST portafolio;
CREATE DATABASE portafolio;

update pg_database set encoding=8 where datname='portafolio';

CREATE TABLE IF NOT EXISTS rol(
	id serial PRIMARY KEY, 
	estado varchar(20),
	nombre_rol varchar(50)
);

INSERT INTO rol(nombre_rol) VALUES ('GESTOR ACADEMICO');
INSERT INTO rol(nombre_rol) VALUES ('SECRETARIA');
INSERT INTO rol(nombre_rol) VALUES ('DOCENTE');
INSERT INTO rol(nombre_rol) VALUES ('ADMINISTRADOR');

CREATE TABLE IF NOT EXISTS facultad(
	id serial PRIMARY KEY, 
	nombre varchar(100), 
	descripcion varchar(500),
	estado varchar(20)
);

CREATE TABLE IF NOT EXISTS carrera(
	id serial PRIMARY KEY, 
	nombre varchar(100),
	descripcion varchar(500), 
	id_facultad smallint REFERENCES facultad(id),
	estado varchar(20)
);

CREATE TABLE IF NOT EXISTS persona(
	id serial PRIMARY KEY, 
	cedula varchar(10) UNIQUE,
	pasaporte varchar(10) UNIQUE,
	nombre varchar(50), 
	apellido varchar(50), 
	correo varchar(25),
	telefono varchar(15),
	celular varchar(11), 
	direccion varchar(100), 
	id_carrera smallint REFERENCES carrera(id)
);


CREATE TABLE IF NOT EXISTS usuario(
	id serial PRIMARY KEY, 
	usuario varchar(25) UNIQUE,
	clave varchar(50), 
	estado varchar(20),
	id_persona smallint REFERENCES persona(id)
);


CREATE TABLE IF NOT EXISTS periodo_academico(
	id serial PRIMARY KEY, 
	fecha_inicio date, 
	fecha_fin date, 
	estado varchar(30) not null default 'ACTIVO',
	descripcion varchar(500),
	path_directorio varchar(100)
);

CREATE TABLE IF NOT EXISTS actividad_docente(
	id serial PRIMARY KEY, 
	descripcion varchar(500), 
	codigo varchar (25) UNIQUE NOT NULL,
	estado varchar(20)
);

CREATE TABLE IF NOT EXISTS portafolio_docente(
	id serial PRIMARY KEY, 
	fecha_creacion date, 
	fecha_fin date, 
	id_persona smallint REFERENCES persona(id), 
	id_periodo_academico smallint REFERENCES persona(id), 
	id_actividad_docente smallint REFERENCES actividad_docente(id),
	estado varchar(20)
);

CREATE TABLE IF NOT EXISTS documento(
	id serial PRIMARY KEY, 
	fecha_ingreso date, 
	id_portafolio_docente smallint REFERENCES portafolio_docente(id), 
	id_actividad_docente smallint REFERENCES actividad_docente(id)
);
CREATE TABLE IF NOT EXISTS periodo_academico_roles_usuario(
	id serial PRIMARY KEY, 
	id_periodo_academico smallint REFERENCES periodo_academico(id),
	id_usuario smallint REFERENCES usuario(id),
	id_rol smallint REFERENCES rol(id),
	estado varchar(20)
);

CREATE TABLE IF NOT EXISTS recuperacion_claves(	
	id serial PRIMARY KEY, codigo varchar(50), fecha_cambio date, 
	id_persona integer  REFERENCES persona(id)
);


CREATE TABLE IF NOT EXISTS actividad_docente_usuario(
	id serial PRIMARY KEY, 
	id_actividad_docente smallint REFERENCES actividad_docente(id), 
	id_periodo_academico smallint REFERENCES periodo_academico(id), 
	id_usuario smallint REFERENCES usuario(id)
);

INSERT INTO facultad(id, nombre, descripcion)
	VALUES (1, 'ADMIN', 'PERSONA O ENTIDAD QUE ADMINISTRA EL SISTEMA');

INSERT INTO carrera(id, nombre, descripcion, id_facultad)
	VALUES (1, 'ADMIN', 'PERSONA O ENTIDAD QUE ADMINISTRA EL SISTEMA', 1);

INSERT INTO persona(id, nombre, apellido, correo, telefono, celular, direccion, id_carrera)
	VALUES (1, 'ADMIN', 'ADMIN', 'ADMIN@UNL.EDU.EC', 'ADMIN', 'ADMIN', 'ADMIN' ,1);

INSERT INTO usuario(id, usuario, clave, estado, id_persona)
	VALUES (1, 'ADMIN@UNL.EDU.EC', 'ADMIN', 'ACTIVO' 1);

INSERT INTO periodo_academico(id, fecha_inicio, fecha_fin, estado, descripcion)
	VALUES (1, '2010-01-01', '2100-01-01','ACTIVO','PERIODO DEL ADMINISTRADOR');

INSERT INTO periodo_academico_roles_usuario(id, id_periodo_academico, id_usuario, id_rol)
	VALUES (1, 1, 1, 4);

INSERT INTO periodo_academico_roles_usuario(id, id_periodo_academico, id_usuario, id_rol)
	VALUES (1, 1, 1, 4);