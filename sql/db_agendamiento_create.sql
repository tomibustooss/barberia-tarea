DROP DATABASE IF EXISTS db_agendamiento;
CREATE DATABASE db_agendamiento CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_agendamiento;

CREATE TABLE cita (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    fecha       DATE         NULL,
    hora        TIME         NULL,
    costo       DOUBLE       NULL,
    estado      VARCHAR(255) NULL,
    cliente_id  BIGINT       NULL,
    barbero_id  BIGINT       NULL,
    servicio_id BIGINT       NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cita (id, fecha, hora, costo, estado, cliente_id, barbero_id, servicio_id) VALUES
(1, '2026-04-25', '10:00:00',  8000, 'CONFIRMADA', 1, 1, 1),
(2, '2026-04-25', '11:00:00', 12000, 'PENDIENTE',  2, 2, 2),
(3, '2026-04-26', '16:30:00', 25000, 'PENDIENTE',  3, 1, 3);
