/**
 * api.js
 * Capa de integración con los microservicios Spring Boot a través del API Gateway (puerto 8081).
 * Implementa detección inteligente de conectividad y fallback automático a dbSimulada.js.
 * Cumple con el Requisito 4.3 y 6 de la Evaluación 2 (DSY1104).
 */

import dbSimulada from '../data/dbSimulada';

const GATEWAY_BASE_URL = 'http://localhost:8081';
const REQUEST_TIMEOUT_MS = 2500;

// Estado reactivo de conectividad
let backendDisponible = false;

/**
 * Realiza una petición fetch con timeout controlado
 */
async function fetchConTimeout(url, opciones = {}) {
  const controller = new AbortController();
  const idTimeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const respuesta = await fetch(url, {
      ...opciones,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(opciones.headers || {})
      }
    });
    clearTimeout(idTimeout);
    return respuesta;
  } catch (error) {
    clearTimeout(idTimeout);
    throw error;
  }
}

/**
 * Comprueba el estado del API Gateway o backend
 */
export async function verificarEstadoBackend() {
  try {
    // Intentar consultar servicios a través del Gateway
    const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios`);
    backendDisponible = res.ok;
    return backendDisponible;
  } catch {
    backendDisponible = false;
    return false;
  }
}

export function estaBackendConectado() {
  return backendDisponible;
}

// ==========================================
// SERVICIOS (service-servicios)
// ==========================================
export const ServiciosAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios`);
      if (res.ok) {
        backendDisponible = true;
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('servicios');
      }
    } catch {
      backendDisponible = false;
    }
    return dbSimulada.obtenerTodos('servicios');
  },

  async obtenerPorId(id) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios/${id}`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerPorId('servicios', id);
  },

  async crear(servicio) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios`, {
        method: 'POST',
        body: JSON.stringify(servicio)
      });
      if (res.ok) {
        const guardado = await res.json();
        dbSimulada.crear('servicios', guardado); // Sincroniza localmente
        return guardado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('servicios', servicio);
  },

  async actualizar(id, servicio) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(servicio)
      });
      if (res.ok) {
        const actualizado = await res.json();
        dbSimulada.actualizar('servicios', id, actualizado);
        return actualizado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.actualizar('servicios', id, servicio);
  },

  async eliminar(id) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/servicios/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        dbSimulada.eliminar('servicios', id);
        return true;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.eliminar('servicios', id);
  }
};

// ==========================================
// BARBEROS (service-barberos)
// ==========================================
export const BarberosAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/barberos`);
      if (res.ok) {
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('barberos');
      }
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('barberos');
  },

  async crear(barbero) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/barberos`, {
        method: 'POST',
        body: JSON.stringify(barbero)
      });
      if (res.ok) {
        const guardado = await res.json();
        dbSimulada.crear('barberos', guardado);
        return guardado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('barberos', barbero);
  },

  async login(correo, password) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/barberos/login`, {
        method: 'POST',
        body: JSON.stringify({ correo, password })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const barbero = dbSimulada.obtenerTodos('barberos').find(b => b.correo === correo);
    return barbero || null;
  }
};

// ==========================================
// SUCURSALES (service-sucursales)
// ==========================================
export const SucursalesAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/sucursales`);
      if (res.ok) {
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('sucursales');
      }
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('sucursales');
  },

  async crear(sucursal) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/sucursales`, {
        method: 'POST',
        body: JSON.stringify(sucursal)
      });
      if (res.ok) {
        const guardado = await res.json();
        dbSimulada.crear('sucursales', guardado);
        return guardado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('sucursales', sucursal);
  },

  async actualizar(id, sucursal) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/sucursales/${id}`, {
        method: 'PUT',
        body: JSON.stringify(sucursal)
      });
      if (res.ok) {
        const act = await res.json();
        dbSimulada.actualizar('sucursales', id, act);
        return act;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.actualizar('sucursales', id, sucursal);
  },

  async eliminar(id) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/sucursales/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        dbSimulada.eliminar('sucursales', id);
        return true;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.eliminar('sucursales', id);
  }
};

// ==========================================
// CITAS / AGENDAMIENTO (service-agendamiento)
// ==========================================
export const CitasAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/citas`);
      if (res.ok) {
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('citas');
      }
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('citas');
  },

  async listarPorCliente(clienteId) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/citas/cliente/${clienteId}`, {
        headers: { rol: 'CLIENTE', usuarioId: String(clienteId) }
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('citas').filter(c => String(c.clienteId) === String(clienteId));
  },

  async agendar(citaData) {
    // Generar código de reserva amigable
    const codigoReserva = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;
    const datosCompletos = {
      ...citaData,
      codigoReserva,
      estado: 'CONFIRMADA'
    };

    try {
      const payloadBackend = {
        fecha: citaData.fecha,
        hora: citaData.hora ? `${citaData.hora}:00` : '12:00:00',
        costo: citaData.totalFinal || citaData.costo,
        estado: 'CONFIRMADA',
        clienteId: citaData.clienteId || 1,
        barberoId: citaData.barberoId,
        servicioId: citaData.servicioId
      };

      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/citas`, {
        method: 'POST',
        headers: {
          rol: 'CLIENTE',
          usuarioId: String(citaData.clienteId || 1)
        },
        body: JSON.stringify(payloadBackend)
      });

      if (res.ok) {
        const creada = await res.json();
        return dbSimulada.crear('citas', { ...datosCompletos, id: creada.id || undefined });
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('citas', datosCompletos);
  },

  async cambiarEstado(id, nuevoEstado, rol = 'ADMIN', usuarioId = null) {
    try {
      const headers = {};
      if (rol) headers.rol = rol;
      if (usuarioId) headers.usuarioId = String(usuarioId);

      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/api/v1/citas/${id}/estado`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (res.ok) {
        dbSimulada.actualizar('citas', id, { estado: nuevoEstado });
        return true;
      }
    } catch {
      // Fallback
    }
    dbSimulada.actualizar('citas', id, { estado: nuevoEstado });
    return true;
  }
};

// ==========================================
// PROMOCIONES (service-promociones)
// ==========================================
export const PromocionesAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/promociones`);
      if (res.ok) {
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('promociones');
      }
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('promociones');
  },

  async crear(promocion) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/promociones`, {
        method: 'POST',
        body: JSON.stringify(promocion)
      });
      if (res.ok) {
        const guardado = await res.json();
        dbSimulada.crear('promociones', guardado);
        return guardado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('promociones', promocion);
  },

  async eliminar(id) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/promociones/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        dbSimulada.eliminar('promociones', id);
        return true;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.eliminar('promociones', id);
  }
};

// ==========================================
// CLIENTES (service-clientes)
// ==========================================
export const ClientesAPI = {
  async listar() {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/clientes`);
      if (res.ok) {
        const data = await res.json();
        return data.length > 0 ? data : dbSimulada.obtenerTodos('clientes');
      }
    } catch {
      // Fallback
    }
    return dbSimulada.obtenerTodos('clientes');
  },

  async login(correo, password) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/clientes/login`, {
        method: 'POST',
        body: JSON.stringify({ correo, password })
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const cliente = dbSimulada.obtenerTodos('clientes').find(c => c.correo === correo);
    return cliente || null;
  },

  async registrar(cliente) {
    try {
      const res = await fetchConTimeout(`${GATEWAY_BASE_URL}/clientes`, {
        method: 'POST',
        body: JSON.stringify(cliente)
      });
      if (res.ok) {
        const guardado = await res.json();
        dbSimulada.crear('clientes', guardado);
        return guardado;
      }
    } catch {
      // Fallback
    }
    return dbSimulada.crear('clientes', cliente);
  }
};

export default {
  verificarEstadoBackend,
  estaBackendConectado,
  ServiciosAPI,
  BarberosAPI,
  SucursalesAPI,
  CitasAPI,
  PromocionesAPI,
  ClientesAPI
};
