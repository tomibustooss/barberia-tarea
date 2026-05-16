DROP DATABASE IF EXISTS db_barberos;
CREATE DATABASE db_barberos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_barberos;

CREATE TABLE especialidad (
    id     BIGINT       NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE barbero (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    nombre          VARCHAR(255) NULL,
    run             VARCHAR(255) NULL,
    especialidad_id BIGINT       NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_barbero_especialidad
        FOREIGN KEY (especialidad_id) REFERENCES especialidad (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO especialidad (id, nombre) VALUES
(1, 'Corte Clasico'),
(2, 'Barba'),
(3, 'Coloracion'),
(4, 'Afeitado Tradicional');

INSERT INTO barbero (id, nombre, run, especialidad_id) VALUES
(1, 'Marco Aurelio',   '15151515-5', 1),
(2, 'Tony El Tijeras', '17171717-7', 2),
(3, 'Don Pancho',      '19191919-9', 4);
