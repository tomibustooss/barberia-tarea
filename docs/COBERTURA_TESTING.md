# INFORME DE PRUEBAS UNITARIAS Y COBERTURA DE TESTING
## Sistema de Gestión y Agendamiento - Barbería Norte
### Evaluación N°2 - DSY1104 / Versión 2.0

---

## 1. OBJETIVO DE LAS PRUEBAS
El objetivo de la presente batería de pruebas unitarias es verificar y asegurar el correcto funcionamiento, renderizado, paso de propiedades (props), reactividad del estado, captura de eventos y persistencia de las operaciones CRUD (Create, Read, Update, Delete) en el frontend del sistema de barbería, cumpliendo estrictamente con las pautas de aseguramiento de calidad de la Evaluación 2 de DSY1104.

---

## 2. HERRAMIENTAS Y ENTORNO UTILIZADO
- **Framework de Pruebas**: [Jasmine](https://jasmine.github.io/) versión 5.1.2 (Sintaxis BDD: `describe`, `it`, `expect`, `spyOn`).
- **Test Runner**: [Karma](https://karma-runner.github.io/) versión 6.4.3 configurado con `karma.conf.js` (Lanzador Chrome / ChromeHeadless, preprocesador Webpack y Babel).
- **Test Runner Interactivo en Navegador**: `frontend/src/tests/test-runner.html` (permite ejecución visual inmediata sin dependencias externas en cualquier navegador con reporte gráfico).
- **Librería de Componentes y UI**: React 18, Bootstrap 5.3.3 y Bootstrap Icons.

---

## 3. COMPONENTES Y MÓDULOS PROBADOS
1. **Módulo de Renderizado**: Tarjetas de servicio (`ServiceCard`), perfiles de profesionales (`BarberCard`) y renderizado condicional de mensajes de error.
2. **Módulo de Propiedades (Props)**: Botones de acción, formateadores de moneda chilena (CLP), manejo de callbacks `onClick` y propagación de datos.
3. **Módulo de Estado (State)**: Campos de texto de formularios, máquina de estados del wizard de agendamiento (Pasos 1 al 5) y recálculo de descuentos/totales.
4. **Módulo de Eventos (Events)**: Clics en filtros de categorías, captura de eventos `submit` en formularios previniendo recarga de página y eventos `onChange` en selectores.
5. **Módulo CRUD y Persistencia**: Funciones de `data/dbSimulada.js` (`obtenerTodos`, `obtenerPorId`, `crear`, `actualizar`, `eliminar`, `restablecerDatos`).

---

## 4. MATRIZ DETALLADA DE CASOS DE PRUEBA

| ID Caso | Módulo | Descripción del Caso de Prueba | Resultado Esperado | Resultado Obtenido | Estado |
|---|---|---|---|---|:---:|
| **CP-01** | Render | Renderizar lista completa de servicios recibidos | Las tarjetas renderizan exactamente los 3 servicios con sus nombres | Renderiza 3 tarjetas idénticas a los datos mock | **APROBADO** |
| **CP-02** | Render | Renderizar tarjeta de barbero con especialidad y rating | Muestra nombre "Alex Silva", especialidad "Degradados Fade" y rating "4.9" | Datos visibles en el DOM correctamente | **APROBADO** |
| **CP-03** | Render | Renderizado condicional de alerta de error de horario | Al existir error aparece alerta roja; al eliminarse se destruye del DOM | Elemento aparece y desaparece según estado booleano | **APROBADO** |
| **CP-04** | Props | Botón recibe y renderiza etiqueta de texto desde props | El botón muestra "Confirmar y Reservar Cita" y type="submit" | Texto coincide exactamente con la prop | **APROBADO** |
| **CP-05** | Props | Botón ejecuta función espía `onClick` pasada por props | Al disparar click, el spy es invocado exactamente 1 vez | `spyOnClick.calls.count() === 1` | **APROBADO** |
| **CP-06** | Props | `ServiceCard` formatea precio en pesos chilenos | El valor 15000 se formatea como "$15.000" | Formato moneda visible correctamente | **APROBADO** |
| **CP-07** | Estado | Input actualiza el estado al escribir información | El estado refleja los nuevos valores de nombres y correo | Objeto de estado sincronizado | **APROBADO** |
| **CP-08** | Estado | Transición entre pasos (1 al 5) del wizard de agendamiento | Avanzar incrementa paso (1 -> 2 -> 3); retroceder disminuye (3 -> 2) | Navegación de pasos coherente y acotada | **APROBADO** |
| **CP-09** | Estado | Recálculo de total con cupón promocional | Precio $20.000 con 20% descuento resulta en $16.000 total | Cálculo matemático exacto | **APROBADO** |
| **CP-10** | Eventos | Clic en botón de filtro de categoría dispara callback | La función `onSelectCat` recibe el argumento "Barba" | Argumento recibido y estado actualizado | **APROBADO** |
| **CP-11** | Eventos | Envío de formulario ejecuta `preventDefault()` | No se recarga la página y se invoca la función `onSubmit` | Evento submit capturado limpiamente | **APROBADO** |
| **CP-12** | Eventos | Cambio en selector `select` actualiza id de sucursal | Al seleccionar valor "2", el estado registra la sucursal 2 | Evento `change` procesado con éxito | **APROBADO** |
| **CP-13** | CRUD | READ: Consultar todos los servicios registrados | Retorna un Array con longitud > 0 y objetos válidos | Retorna colección completa inicial | **APROBADO** |
| **CP-14** | CRUD | READ: Obtener servicio por ID único | `obtenerPorId('servicios', 2)` retorna "Perfilado Barba" | Encuentra y retorna el registro exacto | **APROBADO** |
| **CP-15** | CRUD | CREATE: Crear nuevo servicio con ID correlativo | Se inserta con nuevo ID autoincremental en la colección | Registro agregado y consultable inmediatamente | **APROBADO** |
| **CP-16** | CRUD | UPDATE: Modificar campos de servicio existente | Modifica precio a $18.000 conservando el mismo ID | Registro actualizado en persistencia local | **APROBADO** |
| **CP-17** | CRUD | DELETE: Eliminar servicio de la colección | Elimina el registro, retorna true y reduce longitud en 1 | Registro eliminado; consulta por ID retorna null | **APROBADO** |
| **CP-18** | CRUD | CRUD CITAS: Crear reserva y luego cancelarla | Crea cita `CIT-TEST` y cambia estado a `CANCELADA` | Estado actualizado según reglas de negocio | **APROBADO** |

---

## 5. RESUMEN DE EJECUCIÓN
- **Total de Pruebas Ejecutadas**: 18 especificaciones (specs).
- **Pruebas Aprobadas**: 18 (100%).
- **Pruebas Fallidas**: 0 (0%).
- **Tiempo de Ejecución Promedio**: < 0.15 segundos.

---

## 6. CÓMO EJECUTAR LAS PRUEBAS

### Opción A: Ejecución Directa en Navegador (Recomendada para Evaluación Rápida)
1. Navegar a la carpeta del proyecto:
   `barberia-tarea-main/frontend/src/tests/`
2. Abrir el archivo `test-runner.html` haciendo doble clic en él o abriéndolo con cualquier navegador (Chrome, Edge, Firefox).
3. Jasmine ejecutará automáticamente todas las suites de prueba en pantalla, mostrando el banner verde con el reporte: `18 specs, 0 failures`.

### Opción B: Ejecución por Terminal con Karma
1. Abrir terminal en la carpeta `frontend/`:
   ```bash
   cd frontend
   npm install
   npm test
   ```
2. Karma levantará ChromeHeadless, procesará los specs con Webpack/Babel y reportará el resultado en consola.

---

## 7. LIMITACIONES Y PRUEBAS PENDIENTES
- **Pruebas de Integración End-to-End**: Actualmente las pruebas automatizadas cubren componentes y capa de datos simulados en entorno unitario. Las pruebas integradas con los microservicios Java en vivo requieren tener levantados los contenedores MariaDB y los 11 puertos Spring Boot mediante `iniciar_proyecto.bat`.
- **Pruebas de Carga de Red**: No se midieron tiempos de respuesta bajo alta concurrencia en el API Gateway (limitación fuera del alcance de la Evaluación 2).

---
*Informe generado para la entrega de la Evaluación N°2 de DSY1104.*
