/**
 * dbSimulada.js
 * Fuente de datos simulada con soporte CRUD completo y persistencia en localStorage.
 * Cumple con el Requisito 4.2 y 4.3 de la Evaluación 2 (DSY1104).
 */

const STORAGE_KEY = 'barberia_norte_db_v2';

// Datos iniciales de la barbería
const DATOS_INICIALES = {
  servicios: [
    {
      id: 1,
      nombre: 'Corte Clásico & Fade',
      categoria: 'Cortes',
      duracionMinutos: 40,
      precio: 15000,
      descripcion: 'Corte tradicional a tijera o degradado moderno (Fade) con perfilado a navaja y peinado profesional con pomada mate.',
      imagen: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
      destacado: true
    },
    {
      id: 2,
      nombre: 'Perfilado & Ritual de Barba',
      categoria: 'Barba',
      duracionMinutos: 30,
      precio: 10000,
      descripcion: 'Diseño y simetría de barba con aplicación de toallas calientes, aceites esenciales hidratantes y bálsamo nutritivo.',
      imagen: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
      destacado: true
    },
    {
      id: 3,
      nombre: 'Combo Master: Corte + Barba',
      categoria: 'Combos',
      duracionMinutos: 65,
      precio: 22000,
      descripcion: 'Nuestro servicio estrella. Corte completo a tu gusto más arreglo integral de barba con vapor ozono y toalla caliente.',
      imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
      destacado: true
    },
    {
      id: 4,
      nombre: 'Afeitado Tradicional con Navaja',
      categoria: 'Barba',
      duracionMinutos: 35,
      precio: 12000,
      descripcion: 'Experiencia clásica con espuma caliente en brocha de tejón, navaja clásica desinfectada y loción aftershave tonificante.',
      imagen: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=600&q=80',
      destacado: false
    },
    {
      id: 5,
      nombre: 'Corte Infantil / Joven',
      categoria: 'Cortes',
      duracionMinutos: 30,
      precio: 12000,
      descripcion: 'Corte adaptado para niños y jóvenes con paciencia y estilo contemporáneo.',
      imagen: 'https://images.unsplash.com/photo-1517832606589-7629c339590a?auto=format&fit=crop&w=600&q=80',
      destacado: false
    },
    {
      id: 6,
      nombre: 'Exfoliación & Mascarilla Negra',
      categoria: 'Tratamientos',
      duracionMinutos: 25,
      precio: 9000,
      descripcion: 'Limpieza facial profunda de poros y puntos negros con mascarilla de carbón activado e hidratación facial.',
      imagen: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      destacado: false
    }
  ],

  barberos: [
    {
      id: 1,
      nombre: 'Alejandro "Alex" Silva',
      especialidad: 'Degradados Fade & Diseños Urbanos',
      correo: 'alex.silva@barberianorte.cl',
      telefono: '+56 9 8765 4321',
      calificacion: 4.9,
      experiencia: '8 años de experiencia',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Especialista en cortes modernos, fade milimétricos y texturizados.'
    },
    {
      id: 2,
      nombre: 'Carlos Mendoza',
      especialidad: 'Barbas Clásicas & Afeitado Tradicional',
      correo: 'carlos.mendoza@barberianorte.cl',
      telefono: '+56 9 7654 3210',
      calificacion: 4.8,
      experiencia: '12 años de oficio',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Maestro barbero formado en técnicas europeas tradicionales.'
    },
    {
      id: 3,
      nombre: 'Matías Rivas',
      especialidad: 'Tijera Clásica & Asesoría de Imagen',
      correo: 'matias.rivas@barberianorte.cl',
      telefono: '+56 9 6543 2109',
      calificacion: 5.0,
      experiencia: '6 años de experiencia',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Experto en corte formal a tijera y visagismo para cada tipo de rostro.'
    }
  ],

  sucursales: [
    {
      id: 1,
      nombre: 'Sucursal Norte - Casa Matriz',
      direccion: 'Av. Américo Vespucio 1450, Huechuraba',
      telefono: '+56 2 2840 9100',
      horario: 'Lunes a Sábado: 10:00 a 20:00 hrs',
      imagen: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      nombre: 'Sucursal Providencia',
      direccion: 'Av. Pedro de Valdivia 520, Providencia',
      telefono: '+56 2 2334 1122',
      horario: 'Lunes a Sábado: 09:30 a 20:30 hrs',
      imagen: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      nombre: 'Sucursal Santiago Centro',
      direccion: 'Moneda 920, Local 4, Santiago',
      telefono: '+56 2 2698 4400',
      horario: 'Lunes a Viernes: 09:00 a 19:30 hrs',
      imagen: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
    }
  ],

  promociones: [
    {
      id: 1,
      codigo: 'PRIMERA-VEZ',
      descripcion: 'Descuento especial del 20% en tu primera reserva online.',
      descuentoPorcentaje: 20,
      fechaInicio: '2026-01-01',
      fechaFin: '2026-12-31',
      activo: true
    },
    {
      id: 2,
      codigo: 'DUO-BARBA',
      descripcion: '15% de descuento al agendar cualquier servicio de barba los martes y miércoles.',
      descuentoPorcentaje: 15,
      fechaInicio: '2026-02-01',
      fechaFin: '2026-11-30',
      activo: true
    },
    {
      id: 3,
      codigo: 'CLIENTE-VIP',
      descripcion: '10% de descuento directo para clientes frecuentes registrados.',
      descuentoPorcentaje: 10,
      fechaInicio: '2026-01-01',
      fechaFin: '2026-12-31',
      activo: true
    }
  ],

  citas: [
    {
      id: 1,
      codigoReserva: 'CIT-1001',
      servicioId: 3,
      servicioNombre: 'Combo Master: Corte + Barba',
      barberoId: 1,
      barberoNombre: 'Alejandro "Alex" Silva',
      sucursalId: 1,
      sucursalNombre: 'Sucursal Norte - Casa Matriz',
      clienteId: 1,
      clienteNombre: 'Juan Pérez González',
      clienteCorreo: 'juan.perez@duocuc.cl',
      clienteTelefono: '+56 9 9123 4567',
      fecha: '2026-11-05',
      hora: '11:00',
      costo: 22000,
      descuentoAplicado: 0,
      totalFinal: 22000,
      estado: 'CONFIRMADA'
    },
    {
      id: 2,
      codigoReserva: 'CIT-1002',
      servicioId: 1,
      servicioNombre: 'Corte Clásico & Fade',
      barberoId: 2,
      barberoNombre: 'Carlos Mendoza',
      sucursalId: 2,
      sucursalNombre: 'Sucursal Providencia',
      clienteId: 2,
      clienteNombre: 'Ignacio Morales',
      clienteCorreo: 'ignacio.m@gmail.com',
      clienteTelefono: '+56 9 8234 5678',
      fecha: '2026-11-06',
      hora: '15:30',
      costo: 15000,
      descuentoAplicado: 3000,
      totalFinal: 12000,
      estado: 'PENDIENTE'
    }
  ],

  clientes: [
    {
      id: 1,
      run: '18.456.789-0',
      nombres: 'Juan',
      apellidos: 'Pérez González',
      correo: 'juan.perez@duocuc.cl',
      telefono: '+56 9 9123 4567',
      rol: 'CLIENTE',
      tipo: 'Frecuente'
    },
    {
      id: 2,
      run: '19.876.543-2',
      nombres: 'Ignacio',
      apellidos: 'Morales Valenzuela',
      correo: 'ignacio.m@gmail.com',
      telefono: '+56 9 8234 5678',
      rol: 'CLIENTE',
      tipo: 'Nuevo'
    }
  ],

  inventario: [
    { id: 1, productoNombre: 'Cera Fijadora Pomade Mate 100ml', stockActual: 18, stockMinimo: 5, precioUnitario: 12990 },
    { id: 2, productoNombre: 'Aceite Hidratante Barba Argán 50ml', stockActual: 12, stockMinimo: 4, precioUnitario: 14500 },
    { id: 3, productoNombre: 'Cuchillas Desechables Premium (Caja 100)', stockActual: 6, stockMinimo: 3, precioUnitario: 8990 },
    { id: 4, productoNombre: 'Shampoo Purificante Anticaída 250ml', stockActual: 3, stockMinimo: 5, precioUnitario: 16900 }
  ],

  empleados: [
    { id: 1, run: '16.543.210-9', nombres: 'Héctor', apellidos: 'Castillo', cargo: 'Administrador General', sueldo: 1200000 },
    { id: 2, run: '17.321.654-K', nombres: 'Alejandro', apellidos: 'Silva', cargo: 'Barbero Senior', sueldo: 950000 },
    { id: 3, run: '15.987.654-3', nombres: 'Carlos', apellidos: 'Mendoza', cargo: 'Barbero Master', sueldo: 950000 },
    { id: 4, run: '18.112.233-4', nombres: 'Camila', apellidos: 'Rojas', cargo: 'Recepcionista', sueldo: 600000 }
  ]
};

/**
 * Inicializa y recupera la base de datos desde localStorage
 */
function cargarBaseDatos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DATOS_INICIALES));
      return JSON.parse(JSON.stringify(DATOS_INICIALES));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error leyendo localStorage, usando memoria volátil:', e);
    return JSON.parse(JSON.stringify(DATOS_INICIALES));
  }
}

/**
 * Persiste los datos en localStorage
 */
function persistirBaseDatos(datos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  } catch (e) {
    console.error('Error guardando en localStorage:', e);
  }
}

// ==========================================
// OPERACIONES CRUD ESTANDARIZADAS
// ==========================================

/**
 * READ (Todos): Consulta todos los registros de una colección
 * @param {string} coleccion - 'servicios' | 'barberos' | 'sucursales' | 'citas' | 'promociones' | 'clientes' | 'inventario' | 'empleados'
 * @returns {Array} Lista de registros
 */
export function obtenerTodos(coleccion) {
  const db = cargarBaseDatos();
  return db[coleccion] ? [...db[coleccion]] : [];
}

/**
 * READ (Uno): Consulta un registro por su ID
 * @param {string} coleccion
 * @param {number|string} id
 * @returns {Object|null}
 */
export function obtenerPorId(coleccion, id) {
  const db = cargarBaseDatos();
  const lista = db[coleccion] || [];
  const item = lista.find(el => String(el.id) === String(id));
  return item ? { ...item } : null;
}

/**
 * CREATE: Agrega un nuevo registro asignando ID autoincremental
 * @param {string} coleccion
 * @param {Object} nuevoItem
 * @returns {Object} Registro creado con ID asignado
 */
export function crear(coleccion, nuevoItem) {
  const db = cargarBaseDatos();
  if (!db[coleccion]) {
    db[coleccion] = [];
  }

  // Generar ID numérico correlativo
  const maxId = db[coleccion].reduce((max, el) => (el.id > max ? el.id : max), 0);
  const nuevoRegistro = {
    ...nuevoItem,
    id: maxId + 1
  };

  db[coleccion].push(nuevoRegistro);
  persistirBaseDatos(db);
  return { ...nuevoRegistro };
}

/**
 * UPDATE: Actualiza un registro existente por su ID
 * @param {string} coleccion
 * @param {number|string} id
 * @param {Object} cambios
 * @returns {Object|null} Registro actualizado o null si no se encontró
 */
export function actualizar(coleccion, id, cambios) {
  const db = cargarBaseDatos();
  if (!db[coleccion]) return null;

  const index = db[coleccion].findIndex(el => String(el.id) === String(id));
  if (index === -1) return null;

  db[coleccion][index] = {
    ...db[coleccion][index],
    ...cambios,
    id: db[coleccion][index].id // Asegurar invariabilidad del ID
  };

  persistirBaseDatos(db);
  return { ...db[coleccion][index] };
}

/**
 * DELETE: Elimina un registro de la colección por su ID
 * @param {string} coleccion
 * @param {number|string} id
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
export function eliminar(coleccion, id) {
  const db = cargarBaseDatos();
  if (!db[coleccion]) return false;

  const longitudInicial = db[coleccion].length;
  db[coleccion] = db[coleccion].filter(el => String(el.id) !== String(id));

  if (db[coleccion].length < longitudInicial) {
    persistirBaseDatos(db);
    return true;
  }
  return false;
}

/**
 * Restablece los datos a los valores iniciales predeterminados
 */
export function restablecerDatos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATOS_INICIALES));
  return JSON.parse(JSON.stringify(DATOS_INICIALES));
}

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  restablecerDatos
};
