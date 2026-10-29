# Especificación de Requisitos del Sistema (ERS)

## 1. Objetivo del sistema
La aplicación de Barbería Norte es un sistema de gestión y agendamiento orientado a una barbería. Su propósito es permitir a los clientes consultar servicios, seleccionar barberos y sucursales, reservar citas y revisar su historial, mientras que los usuarios administrativos gestionan la información del negocio desde un panel específico.

## 2. Alcance
El sistema cubre la presentación pública de la barbería, el flujo de agendamiento, la administración de recursos principales y la integración con los microservicios Java existentes. La solución se desarrolló como frontend React con Bootstrap, manteniendo intacto el backend Java/Spring Boot del proyecto actual.

## 3. Tipos de usuarios
- Cliente: consulta servicios, selecciona barberos y sucursales, agenda citas y revisa reservas.
- Administrador: consulta y gestiona servicios, citas, inventario, pagos, promociones y sucursales.
- Barbero: revisa su agenda y atiende solicitudes vinculadas a su perfil.

## 4. Requisitos funcionales
- Mostrar la página de inicio con información general de la barbería.
- Listar servicios con nombre, descripción, precio, duración y categoría.
- Mostrar información de barberos con especialidades, experiencia y valoración.
- Mostrar sucursales con ubicación, horario y contacto.
- Presentar promociones activas con descuento y vigencia.
- Permitir el agendamiento de citas con validación de campos.
- Permitir consultar el historial de citas del cliente.
- Proveer un panel administrativo para revisión de registros clave.
- Diferenciar claramente el estado de reservas y mensajes de éxito/error.
- Mantener navegación entre las vistas públicas y administrativas.

## 5. Requisitos no funcionales
- La interfaz debe ser responsive y usable en móvil, tablet y escritorio.
- El frontend debe ser modular y reutilizable.
- Se debe mantener la separación entre frontend y backend.
- La aplicación debe integrar con endpoints reales cuando estén disponibles y usar datos simulados como respaldo para la demo.
- Debe existir validación del formulario y mensajes claros de error.

## 6. Vistas del frontend
- Inicio
- Servicios
- Barberos
- Sucursales
- Promociones
- Agendamiento
- Área del cliente
- Administración
- Inicio de sesión

## 7. Flujo de agendamiento
1. El cliente ingresa a la página principal.
2. Explora servicios y barberos.
3. Selecciona un servicio, sucursal, fecha y hora.
4. Ingresa sus datos.
5. Revisa el resumen de la cita.
6. Confirma la reserva.
7. Recibe un mensaje de confirmación o error en caso de validación.
8. Puede consultar su historial desde el área cliente.

## 8. Operaciones CRUD y persistencia
El backend Java mantiene las operaciones de negocio reales para servicios, barberos, clientes, sucursales y citas. El frontend centraliza la lógica en un servicio de acceso a datos con respaldo en datos simulados cuando el backend no está disponible. El proyecto conserva la arquitectura microservicios sin modificar el backend existente.

## 9. Seguridad y permisos
Se respetan los roles de cliente y administrador según lo implementado por el backend. El frontend simula la sesión de usuario para la demo y evita acceder a funciones administrativas desde el cliente.

## 10. Pruebas previstas
- Pruebas de renderizado para servicios y formularios.
- Pruebas de validación de formulario.
- Pruebas de eventos y callback en componentes clave.
- Verificación de la integración con datos simulados y API fallback.

## 11. Estado actual
El proyecto incluye frontend React, Bootstrap, navegación por rutas, flujo de agendamiento y pruebas unitarias configuradas con Jasmine y Karma.
