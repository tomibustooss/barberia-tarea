DROP DATABASE IF EXISTS db_clientes;
CREATE DATABASE db_clientes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_clientes;

CREATE TABLE tipo_cliente (
    id     BIGINT       NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE cliente (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    run             VARCHAR(255) NULL,
    nombres         VARCHAR(255) NULL,
    apellidos       VARCHAR(255) NULL,
    correo          VARCHAR(255) NULL,
    telefono        VARCHAR(255) NULL,
    tipo_cliente_id BIGINT       NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_cliente_tipo_cliente
        FOREIGN KEY (tipo_cliente_id) REFERENCES tipo_cliente (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ficha_cliente (
    id            BIGINT       NOT NULL AUTO_INCREMENT,
    preferencias  VARCHAR(255) NULL,
    alergias      VARCHAR(255) NULL,
    observaciones VARCHAR(255) NULL,
    cliente_id    BIGINT       NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_ficha_cliente_cliente_id UNIQUE (cliente_id),
    CONSTRAINT fk_ficha_cliente_cliente
        FOREIGN KEY (cliente_id) REFERENCES cliente (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tipo_cliente (id, nombre) VALUES
(1, 'Regular'),
(2, 'VIP'),
(3, 'Premium');

INSERT INTO cliente (id, run, nombres, apellidos, correo, telefono, tipo_cliente_id) VALUES
(1, '12345678-9', 'Juan Alberto', 'Perez Gonzalez', 'juan@correo.cl',     '+56911111111', 1),
(2, '11111111-1', 'Cachupin Pin', 'Perez Cotapo',   'cachupin@correo.cl', '+56922222222', 2),
(3, '22222222-9', 'Rosa',         'Contreras Soto', 'rosa@correo.cl',     '+56933333333', 3);

INSERT INTO ficha_cliente (id, preferencias, alergias, observaciones, cliente_id) VALUES
(1, 'Corte tipo militar, maquina N2 en los lados',   'Ninguna',             'Cliente puntual',           1),
(2, 'Barba con perfilado, sin productos con alcohol','Alcohol etilico',     'Atender solo por la tarde', 2),
(3, 'Color castano claro',                           'Tintes con amoniaco', 'Requiere pago anticipado',  3);
