# ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE (ERS)
## Sistema de Gestión y Agendamiento - Barbería Norte
### Evaluación N°2 - DSY1104 / Versión 2.0

---

## 1. INTRODUCCIÓN

### 1.1 Propósito del Documento
El presente documento de Especificación de Requisitos de Software (ERS) versión 2.0 define los requisitos funcionales, no funcionales, reglas de negocio, arquitectura y especificaciones técnicas para el frontend del Sistema de Gestión y Agendamiento de **Barbería Norte**. 

Esta versión actualiza y expande la especificación inicial, documentando la migración hacia una arquitectura frontend moderna basada en **React**, diseño responsivo con **Bootstrap 5**, navegación por vistas, sistema de persistencia simulada con operaciones CRUD (Create, Read, Update, Delete), capa de integración con microservicios Spring Boot a través de API Gateway, y batería de pruebas unitarias configuradas con **Jasmine y Karma**.

### 1.2 Alcance del Sistema
El sistema proporciona una solución integral para clientes y personal de la barbería:
1. **Área Pública (Clientes)**: Exploración del catálogo de servicios clasificados por categorías, visualización de perfiles y especialidades de barberos, localización de sucursales, promociones vigentes con códigos de descuento, y un **flujo guiado de agendamiento de citas en 5 pasos** con verificación de disponibilidad horaria, prellenado de datos de sesión y pantallas de confirmación/error.
2. **Área Privada del Cliente**: Portal para consultar el historial de citas (activas, completadas y canceladas), cancelación de citas según reglas de negocio, y registro de calificaciones/reseñas.
3. **Panel Administrativo (Administrador / Barberos)**: Interfaz de gestión con navegación lateral para la administración completa (CRUD) de Servicios, Barberos, Sucursales, Citas, Promociones, Clientes, Inventario de insumos y Empleados.

### 1.3 Audiencia y Usuarios del Sistema
- **Cliente Visitante**: Navega servicios, consulta información de sucursales y barberos.
- **Cliente Registrado**: Inicia sesión, agenda citas con datos precargados, consulta su historial y califica servicios.
- **Barbero**: Consulta su agenda de citas asignadas y actualiza el estado de atención.
- **Administrador**: Control total sobre el catálogo de servicios, barberos, sucursales, promociones, inventario, empleados y citas.

---

## 2. ARQUITECTURA GENERAL DEL SISTEMA

### 2.1 Backend (Preservado e Intacto)
El backend mantiene su arquitectura de microservicios desarrollada en Java con Spring Boot y base de datos relacional (MariaDB/MySQL puerto 3306):
- **API Gateway**: Puerto `8081` (Ruta centralizadora y Swagger UI)
- **service-clientes**: Puerto `8082` (`/clientes/**`, `/tipos-cliente/**`)
- **service-agendamiento**: Puerto `8083` (`/api/v1/citas/**`)
- **service-barberos**: Puerto `8084` (`/api/v1/barberos/**`, `/api/v1/especialidades/**`)
- **service-servicios**: Puerto `8085` (`/api/v1/servicios/**`)
- **service-pagos**: Puerto `8086` (`/api/v1/pagos/**`)
- **service-sucursales**: Puerto `8087` (`/sucursales/**`)
- **service-resenas**: Puerto `8088` (`/resenas/**`)
- **service-promociones**: Puerto `8089` (`/promociones/**`)
- **service-inventario**: Puerto `8090` (`/inventario/**`)
- **service-empleados**: Puerto `8091` (`/empleados/**`)

### 2.2 Frontend (Nuevo y Modular)
El frontend implementa una Single Page Application (SPA) modular estructurada en:
- `components/`: Componentes reutilizables (Navbar, Footer, ServiceCard, BarberCard, BranchCard, NotificationAlert, Modal).
- `pages/`: Vistas completas de la aplicación (Inicio, Servicios, Detalle, Barberos, Sucursales, Promociones, Agendamiento, Confirmación, Portal Cliente, Panel Admin).
- `services/api.js`: Capa de abstracción HTTP que consume el API Gateway en `http://localhost:8081` con detección automática de disponibilidad.
- `data/dbSimulada.js`: Almacén local de datos simulados con soporte CRUD completo y persistencia en `localStorage`. Permite que la aplicación funcione al 100% tanto con el backend Spring Boot encendido como en modo autónomo/simulado.
- `tests/`: Batería de pruebas unitarias configuradas para Jasmine y Karma.

---

## 3. EQUIVALENCIA CON EL MODELO DE REFERENCIA (TIENDA VS. BARBERÍA)

| Vista/Concepto Tienda (Profesor) | Implementación Adaptada Barbería Norte | Propósito y Comportamiento |
|---|---|---|
| Página Principal | Página de Inicio Barbería | Banner Hero con CTA, servicios destacados, video corporativo, testimonios |
| Catálogo de Productos | Catálogo de Servicios | Filtro por categorías (Cortes, Barba, Combos, Tratamientos), buscador y tarjetas |
| Categorías de Productos | Filtros de Categorías de Servicio | Segmentación rápida de servicios según tipo de atención |
| Detalle de Producto | Detalle de Servicio | Ficha con descripción, duración, precio, barberos recomendados y botón "Agendar" |
| Ofertas / Descuentos | Promociones y Cupones | Cupones de descuento activos (ej. PRIMERA-VEZ, DUO-BARBA) aplicables al agendar |
| Carrito de Compra | Resumen de Reserva en Proceso | Visualización en vivo del servicio, profesional, sucursal, fecha y costo |
| Checkout / Datos de Entrega | Selección de Sucursal, Barbero, Fecha y Hora | Formulario guiado de selección de parámetros de cita y datos de contacto |
| Compra Exitosa | Confirmación de Reserva Exitosa | Pantalla con comprobante, código de reserva, resumen y botón para ver en "Mis Citas" |
| Compra Fallida | Pantalla de Reserva No Confirmada | Aviso amigable de conflicto de horario o error de conexión con reintento |
| Historial de Compras | Portal del Cliente ("Mis Citas") | Listado de citas agendadas, estados (PENDIENTE/CONFIRMADA/CANCELADA) y cancelación |
| Panel Administrativo de Tienda | Panel Administrativo Barbería | Módulos CRUD para Servicios, Barberos, Sucursales, Citas, Promociones, Inventario |

---

## 4. REQUISITOS FUNCIONALES (RF)

### 4.1 Módulo Público y Catálogo
- **RF-01 (Navegación General)**: La barra de navegación debe permitir el acceso fluido a Inicio, Servicios, Barberos, Sucursales, Promociones, Iniciar Sesión y Agendar Cita.
- **RF-02 (Catálogo con Filtros y Búsqueda)**: El catálogo debe mostrar las tarjetas de servicios con imagen, título, duración, precio y categoría. Debe incluir un buscador por texto y filtro por categoría (Todos, Cortes, Barba, Combos, Tratamientos).
- **RF-03 (Detalle de Servicio)**: Al hacer clic en un servicio, se debe presentar su vista detallada con información ampliada, tiempo estimado, precio desglosado y acceso directo al agendamiento.
- **RF-04 (Directorio de Barberos)**: Visualización de los barberos del equipo con su especialidad, valoración, presentación y acceso a agendar directamente con dicho profesional.
- **RF-05 (Directorio de Sucursales)**: Listado de sucursales físicas con dirección, teléfono, horario de atención y mapa de referencia.
- **RF-06 (Módulo de Promociones)**: Presentación de ofertas vigentes con porcentaje de descuento, fechas de validez y código promocional para copiar.

### 4.2 Módulo de Agendamiento (Flujo de Checkout)
- **RF-07 (Paso 1 - Selección de Servicio)**: Permite seleccionar el servicio deseado o precargarlo desde el catálogo.
- **RF-08 (Paso 2 - Selección de Sucursal y Barbero)**: Permite elegir la sucursal de preferencia y el barbero asignado (o "Cualquier barbero disponible").
- **RF-09 (Paso 3 - Selección de Fecha y Bloque Horario)**: Selector de fecha con bloqueo de días pasados y selección de bloques de hora disponibles (ej. 10:00, 11:00, 12:00, 15:00, etc.). No debe permitir seleccionar horarios ya ocupados para el barbero y fecha elegidos.
- **RF-10 (Paso 4 - Identificación del Cliente)**: Si el usuario inició sesión, sus datos (nombre, correo, teléfono, RUT) se precargan automáticamente. Si es visitante, puede ingresarlos manualmente. Permite aplicar un código promocional.
- **RF-11 (Paso 5 - Confirmación y Resumen)**: Presentación del desglose completo antes de confirmar (servicio, precio, descuento aplicado, total, profesional, fecha y hora).
- **RF-12 (Resultado Exitoso)**: Al confirmar, se genera un número de reserva único (`CIT-XXXX`), se guarda la cita en persistencia y se muestra la pantalla de confirmación.
- **RF-13 (Resultado Fallido)**: En caso de conflicto de horario o error, se muestra la pantalla informativa de error con sugerencias claras.

### 4.3 Módulo de Autenticación y Perfil
- **RF-14 (Inicio de Sesión y Registro)**: Modal de inicio de sesión con roles (Cliente, Barbero, Administrador) y credenciales de prueba preconfiguradas para agilizar la evaluación académica. Formulario de registro para nuevos clientes.
- **RF-15 (Portal "Mis Citas")**: El cliente autenticado puede revisar sus citas activas e históricas, y cancelar una cita si su estado es `PENDIENTE` o `CONFIRMADA`.

### 4.4 Módulo CRUD y Persistencia Simulada
- **RF-16 (Operaciones CRUD Reutilizables)**: El archivo `data/dbSimulada.js` debe implementar y exportar funciones estandarizadas:
  - `obtenerTodos(coleccion)`: Lee todos los registros.
  - `obtenerPorId(coleccion, id)`: Busca un registro específico.
  - `crear(coleccion, nuevoItem)`: Inserta un nuevo registro con ID autoincremental.
  - `actualizar(coleccion, id, datosActualizados)`: Modifica un registro existente.
  - `eliminar(coleccion, id)`: Elimina un registro de la colección.
- **RF-17 (Persistencia Local)**: Los cambios deben persistir en `localStorage` del navegador para que se mantengan tras recargar la página. Se provee un botón para "Restablecer Datos Iniciales".
- **RF-18 (Integración Dual con Backend Spring Boot)**: La capa `services/api.js` intenta consumir los endpoints de Spring Boot a través del API Gateway (`http://localhost:8081`). Si los microservicios no están en ejecución, conmuta automáticamente a la fuente de datos simulada informando al usuario en pantalla de manera transparente.

### 4.5 Módulo Administrativo
- **RF-19 (Panel de Control)**: Métricas rápidas (citas del día, ingresos proyectados, total servicios y barberos).
- **RF-20 (CRUD de Servicios)**: Listado con tabla Bootstrap, botón "Nuevo Servicio", botón "Editar" y "Eliminar".
- **RF-21 (CRUD de Barberos)**: Gestión de profesionales, especialidad y estado.
- **RF-22 (CRUD de Sucursales)**: Alta, baja y modificación de locales.
- **RF-23 (Gestión de Citas)**: Listado completo de citas con filtros y opción de cambiar estado (`PENDIENTE`, `CONFIRMADA`, `COMPLETADA`, `CANCELADA`).
- **RF-24 (CRUD de Promociones e Inventario)**: Mantenimiento de códigos de descuento y control de stock de productos.

---

## 5. REQUISITOS NO FUNCIONALES (RNF)

- **RNF-01 (Usabilidad y Diseño Responsivo)**: La interfaz está construida con componentes Bootstrap 5, garantizando visualización y funcionamiento óptimo en smartphones, tablets y pantallas de escritorio.
- **RNF-02 (Estética Profesional)**: Paleta de colores sobria y elegante propia del rubro de barbería (negro grafito `#121212`, tonos dorados/ámbar `#d4af37`, grises neutros y blanco).
- **RNF-03 (Rendimiento)**: Carga inmediata sin dependencias pesadas innecesarias. Transiciones suaves y feedback visual en cada acción del usuario.
- **RNF-04 (Mantenibilidad)**: Código modular en componentes con responsabilidades únicas, tipado claro de props y manejo coherente del estado (useState, useEffect).
- **RNF-05 (Compatibilidad de Ejecución)**: La aplicación cuenta con una distribución preparada para doble clic directo en `index.html` (utilizando React 18 en navegador) y con la estructura modular completa de desarrollo en `frontend/` para npm y pruebas unitarias.

---

## 6. MATRIZ DE RASTREABILIDAD DE REQUISITOS Y VISTAS

| Vista / Componente | Requisitos Funcionales Cubiertos | Componente React |
|---|---|---|
| Navbar | RF-01, RF-14 | `<Navbar />` |
| Inicio | RF-01, RF-02, RF-04, RF-06 | `<HomePage />` |
| Catálogo de Servicios | RF-02 | `<ServicesCatalogPage />` |
| Detalle de Servicio | RF-03 | `<ServiceDetailPage />` |
| Barberos | RF-04 | `<BarbersPage />` |
| Sucursales | RF-05 | `<BranchesPage />` |
| Promociones | RF-06 | `<PromotionsPage />` |
| Flujo de Agendamiento | RF-07, RF-08, RF-09, RF-10, RF-11 | `<BookingPage />` |
| Confirmación Exitosa | RF-12 | `<BookingSuccessPage />` |
| Confirmación Fallida | RF-13 | `<BookingFailedPage />` |
| Portal Cliente (Mis Citas) | RF-14, RF-15 | `<ClientPortalPage />` |
| Panel Administrativo | RF-19, RF-20, RF-21, RF-22, RF-23, RF-24 | `<AdminDashboardPage />` |
| Persistencia y CRUD | RF-16, RF-17, RF-18 | `data/dbSimulada.js`, `services/api.js` |

---

## 7. ESPECIFICACIÓN DE PRUEBAS UNITARIAS (JASMINE & KARMA)

Siguiendo la exigencia oficial de la Evaluación 2, se implementan pruebas automatizadas organizadas en cuatro categorías:
1. **Pruebas de Renderizado**: Verificación de listas de servicios, barberos y renderizado condicional de alertas de error.
2. **Pruebas de Props**: Validación de paso de propiedades a botones, insignias y tarjetas de servicio.
3. **Pruebas de Estado**: Validación de cambios en campos de formulario y navegación de pasos del agendamiento.
4. **Pruebas de Eventos y CRUD**: Verificación de disparadores `onClick`, filtros de categoría y operaciones Create, Read, Update, Delete en el archivo de datos simulados.

---
*Documento aprobado para entrega académica - Barbería Norte DSY1104.*
