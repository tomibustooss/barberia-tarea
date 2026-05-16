DROP DATABASE IF EXISTS db_servicios;
CREATE DATABASE db_servicios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_servicios;

CREATE TABLE servicio (
    id               BIGINT       NOT NULL AUTO_INCREMENT,
    nombre           VARCHAR(255) NULL,
    duracion_minutos INT          NULL,
    precio           DOUBLE       NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO servicio (id, nombre, duracion_minutos, precio) VALUES
(1, 'Corte Cabello',        30,  8000),
(2, 'Corte + Barba',        45, 12000),
(3, 'Coloracion Completa',  60, 25000),
(4, 'Afeitado Tradicional', 30,  9000);
