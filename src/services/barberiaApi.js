import { mockAppointments, mockBarbers, mockBranches, mockClientes, mockPromotions, mockServices } from '../data/mockData';

const API_BASE = 'http://localhost:8081';
const LOCAL_APPOINTMENTS_KEY = 'barberia_local_appointments';

const readLocalAppointments = () => {
  try {
    const stored = localStorage.getItem(LOCAL_APPOINTMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const writeLocalAppointments = (appointments) => {
  try {
    localStorage.setItem(LOCAL_APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (error) {
    // Ignoramos el fallo del navegador si no hay almacenamiento disponible
  }
};

const timeToMinutes = (timeString) => {
  const [hours = '0', minutes = '0'] = String(timeString || '00:00').split(':');
  return Number(hours) * 60 + Number(minutes);
};

const hasSchedulingConflict = (candidate, existingAppointment) => {
  if (!candidate || !existingAppointment) {
    return false;
  }

  if (Number(candidate.barberoId) !== Number(existingAppointment.barberoId)) {
    return false;
  }

  if (String(candidate.fecha) !== String(existingAppointment.fecha)) {
    return false;
  }

  const candidateMinutes = timeToMinutes(candidate.hora);
  const existingMinutes = timeToMinutes(existingAppointment.hora);
  const diffMinutes = Math.abs(candidateMinutes - existingMinutes);

  return diffMinutes <= 40;
};

async function fetchJson(url, fallbackData, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return fallbackData;
  }
}

export const getServices = async () => fetchJson(`${API_BASE}/api/v1/servicios`, mockServices);
export const getBarbers = async () => fetchJson(`${API_BASE}/api/v1/barberos`, mockBarbers);
export const getBranches = async () => fetchJson(`${API_BASE}/sucursales`, mockBranches);
export const getPromotions = async () => fetchJson(`${API_BASE}/promociones`, mockPromotions);
export const getClients = async () => fetchJson(`${API_BASE}/clientes`, mockClientes);
export const getAppointments = async (clientId = 1) => {
  const remoteAppointments = await fetchJson(`${API_BASE}/api/v1/citas/cliente/${clientId}`, mockAppointments, {
    headers: { rol: 'CLIENTE', usuarioId: String(clientId) }
  });

  const localAppointments = readLocalAppointments().filter((appointment) => Number(appointment.clienteId) === Number(clientId));
  const combined = [...(Array.isArray(remoteAppointments) ? remoteAppointments : []), ...localAppointments];
  const appointmentsById = new Map();
  const appointmentsWithoutId = [];

  combined.forEach((appointment) => {
    if (appointment.id === undefined || appointment.id === null) {
      appointmentsWithoutId.push(appointment);
      return;
    }

    appointmentsById.set(String(appointment.id), appointment);
  });

  return [...appointmentsById.values(), ...appointmentsWithoutId];
};

export const createAppointment = async (payload) => {
  const appointment = {
    ...payload,
    id: Date.now(),
    estado: 'PENDIENTE',
    servicioNombre: payload.servicioNombre || 'Servicio seleccionado',
    barberoNombre: payload.barberoNombre || 'Barbero seleccionado',
    sucursalNombre: payload.sucursalNombre || 'Sucursal seleccionada'
  };

  const existingAppointments = await getAppointments(1);
  const hasConflict = existingAppointments.some((existingAppointment) => hasSchedulingConflict(appointment, existingAppointment));

  if (hasConflict) {
    return {
      error: 'Esta hora ya está ocupada para ese barbero. Elige otra hora con al menos 40 minutos de diferencia.'
    };
  }

  const updated = [appointment, ...existingAppointments];
  writeLocalAppointments(updated);

  try {
    const response = await fetch(`${API_BASE}/api/v1/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        rol: 'CLIENTE',
        usuarioId: '1'
      },
      body: JSON.stringify(appointment)
    });

    if (!response.ok) {
      throw new Error('No se pudo reservar la cita');
    }

    return await response.json();
  } catch (error) {
    return appointment;
  }
};

export const getAdminRecords = async () => ({
  servicios: await getServices(),
  barberos: await getBarbers(),
  sucursales: await getBranches(),
  citas: await getAppointments(),
  promociones: await getPromotions(),
  inventario: [
    { id: 1, producto: 'Gel para cabello', stock: 32, categoria: 'Producto de cuidado' },
    { id: 2, producto: 'Máquina de recorte', stock: 4, categoria: 'Equipo' }
  ],
  pagos: [
    { id: 1, concepto: 'Corte clásico', monto: 18000, metodo: 'Tarjeta', estado: 'Pagado' },
    { id: 2, concepto: 'Combo corte + barba', monto: 26000, metodo: 'WebPay', estado: 'Pendiente' }
  ]
});
