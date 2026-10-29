/**
 * crud.spec.js
 * Pruebas unitarias de las operaciones CRUD del archivo de datos simulados
 * Cumple con el Requisito 4.2 y 4.7 de la Evaluación 2 (DSY1104).
 */

import {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restablecerDatos
} from '../data/dbSimulada';

describe('Pruebas de Operaciones CRUD en dbSimulada', () => {
  beforeEach(() => {
    // Restablecer los datos antes de cada prueba para aislamiento
    restablecerDatos();
  });

  // READ (Todos)
  it('READ: Debe retornar la lista inicial de servicios con longitud mayor a cero', () => {
    const servicios = obtenerTodos('servicios');
    expect(Array.isArray(servicios)).toBe(true);
    expect(servicios.length).toBeGreaterThan(0);
    expect(servicios[0].nombre).toBeDefined();
  });

  // READ (Por ID)
  it('READ: Debe obtener un servicio específico por su ID único', () => {
    const servicio = obtenerPorId('servicios', 1);
    expect(servicio).not.toBeNull();
    expect(servicio.id).toBe(1);
    expect(servicio.nombre).toContain('Corte');
  });

  // CREATE
  it('CREATE: Debe agregar un nuevo registro a la colección con ID autoincremental', () => {
    const nuevoServicio = {
      nombre: 'Coloración & Decoloración Capilar',
      categoria: 'Tratamientos',
      duracionMinutos: 90,
      precio: 35000,
      descripcion: 'Tratamiento de color profesional para cabello masculino.'
    };

    const creado = crear('servicios', nuevoServicio);

    expect(creado).toBeDefined();
    expect(creado.id).toBeDefined();
    expect(creado.nombre).toBe('Coloración & Decoloración Capilar');

    // Verificar que existe en la colección
    const listaActualizada = obtenerTodos('servicios');
    const encontrado = listaActualizada.find(s => s.id === creado.id);
    expect(encontrado).toBeDefined();
    expect(encontrado.precio).toBe(35000);
  });

  // UPDATE
  it('UPDATE: Debe modificar los campos de un registro existente conservando su ID', () => {
    const cambios = {
      precio: 18000,
      duracionMinutos: 45
    };

    const actualizado = actualizar('servicios', 1, cambios);

    expect(actualizado).not.toBeNull();
    expect(actualizado.id).toBe(1);
    expect(actualizado.precio).toBe(18000);
    expect(actualizado.duracionMinutos).toBe(45);

    // Verificar persistencia
    const enMemoria = obtenerPorId('servicios', 1);
    expect(enMemoria.precio).toBe(18000);
  });

  // DELETE
  it('DELETE: Debe eliminar un registro de la colección y retornar true', () => {
    const totalInicial = obtenerTodos('servicios').length;

    const resultado = eliminar('servicios', 1);
    expect(resultado).toBe(true);

    const totalFinal = obtenerTodos('servicios').length;
    expect(totalFinal).toBe(totalInicial - 1);

    const noExiste = obtenerPorId('servicios', 1);
    expect(noExiste).toBeNull();
  });

  // CRUD en Citas
  it('CRUD CITAS: Debe agendar una cita y luego permitir cambiar su estado a CANCELADA', () => {
    const nuevaCita = {
      codigoReserva: 'CIT-TEST',
      servicioNombre: 'Corte Infantil',
      clienteNombre: 'Pedro Soto',
      fecha: '2026-11-10',
      hora: '14:00',
      costo: 12000,
      estado: 'CONFIRMADA'
    };

    const citaCreada = crear('citas', nuevaCita);
    expect(citaCreada.id).toBeDefined();

    // Cancelar la cita
    const citaActualizada = actualizar('citas', citaCreada.id, { estado: 'CANCELADA' });
    expect(citaActualizada.estado).toBe('CANCELADA');
  });
});
