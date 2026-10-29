# Documento de cobertura de testing

## 1. Objetivo
Validar que los componentes principales del frontend renderizan la información correcta, que los formularios responden a eventos y que la interfaz presenta mensajes de validación y confirmación en flujos clave de la barbería.

## 2. Herramientas utilizadas
- React 18
- Bootstrap 5
- Testing Library React
- Jasmine
- Karma
- Webpack
- jsdom

## 3. Componentes probados
- ServiceCard
- LoginPage

## 4. Casos de prueba
1. Renderizado de información del servicio.
2. Verificación del callback onSelect al hacer clic en el botón Agendar.
3. Actualización del estado del formulario de login al escribir en los inputs.

## 5. Resultado esperado
- El servicio se renderiza con nombre, categoría y texto del botón.
- El callback onSelect recibe el servicio correspondiente.
- Los inputs de login reflejan los valores digitados por el usuario.

## 6. Resultado obtenido
Todos los casos de prueba ejecutados en el entorno configurado terminaron exitosamente.

## 7. Estado de aprobación
Aprobado.

## 8. Cobertura medida
No se ejecutó una herramienta específica de cobertura de código en este proyecto. La validación se realizó con pruebas unitarias de componentes, y el resultado exacto de cobertura porcentual no se reporta porque no se utilizó un generador de cobertura.

## 9. Errores detectados y corregidos
- Problemas de compatibilidad de Karma con jsdom moderno y la API queueMicrotask.
- Configuración de imports ES modules para Vite/webpack.
- Etiquetas de formulario sin asociación con control (label no conectado al input).

## 10. Limitaciones y pruebas pendientes
Se recomienda ampliar la suite con pruebas para BookingPage, ClientAreaPage y AdminPage para cubrir flujos de agendamiento y administración más complejos.
