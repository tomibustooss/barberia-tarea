DROP DATABASE IF EXISTS db_pagos;
CREATE DATABASE db_pagos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_pagos;

CREATE TABLE pago (
    id      BIGINT       NOT NULL AUTO_INCREMENT,
    cita_id BIGINT       NULL,
    monto   DOUBLE       NULL,
    metodo  VARCHAR(255) NULL,
    estado  VARCHAR(255) NULL,
    fecha   DATETIME(6)  NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO pago (id, cita_id, monto, metodo, estado, fecha) VALUES
(1, 1,  8000, 'EFECTIVO',      'PAGADO',    '2026-04-25 10:30:00'),
(2, 2, 12000, 'DEBITO',        'PENDIENTE', '2026-04-25 11:00:00'),
(3, 3, 25000, 'TRANSFERENCIA', 'PAGADO',    '2026-04-26 17:30:00');
