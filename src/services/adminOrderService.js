import api from '../util/constants';
import logger from '../util/logger';

const STORAGE_KEY = 'ordenes_v1';
const LEGACY_KEY = 'ordenes';

function listarLocal() {
  const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function guardarLocal(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

async function obtenerTodasOrdenes() {
  try {
    logger.debug('Solicitando todas las órdenes al backend...');

    // Intentar varios endpoints comunes por compatibilidad con distintos backends
    const endpoints = ['/ordenes', '/pedidos', '/orders'];
    for (const ep of endpoints) {
      try {
        logger.debug('Probando endpoint de órdenes:', ep);
        const response = await api.get(ep);
        const data = response.data;

        if (!data) continue;

        if (Array.isArray(data)) return data;
        if (data.content && Array.isArray(data.content)) return data.content;
        if (data.data && Array.isArray(data.data)) return data.data;

        // Si viene un objeto con campo 'ordenes' o 'pedidos'
        if (data.ordenes && Array.isArray(data.ordenes)) return data.ordenes;
        if (data.pedidos && Array.isArray(data.pedidos)) return data.pedidos;
      } catch (errEp) {
        logger.debug('Endpoint no disponible o devolvió error:', ep, errEp.message || errEp);
        // probar siguiente endpoint
        continue;
      }
    }

    logger.warn('No se obtuvo lista de órdenes desde los endpoints remotos, usando fallback local');
    return listarLocal();
  } catch (error) {
    logger.error('Error al obtener órdenes desde backend:', error);
    return listarLocal();
  }
}

// Exponer método para crear orden local (útil en pruebas sin backend)
function crearOrdenLocal(orden) {
  const lista = listarLocal();
  const nueva = { id: Date.now(), fecha: new Date().toISOString(), ...orden };
  lista.unshift(nueva);
  guardarLocal(lista);
  return nueva;
}

/**
 * Obtiene órdenes con paginación desde el backend (si el backend soporta page/size)
 * Devuelve array de órdenes o fallback al listado local.
 */
async function obtenerOrdenesPaginadas(page = 0, size = 50) {
  try {
    logger.debug('Solicitando órdenes paginadas al backend...', { page, size });
    const endpoints = ['/ordenes', '/pedidos', '/orders'];
    for (const ep of endpoints) {
      try {
        const url = `${ep}?page=${page}&size=${size}`;
        const resp = await api.get(url);
        const data = resp.data;
        if (!data) continue;
        if (Array.isArray(data)) return data;
        if (data.content && Array.isArray(data.content)) return data.content;
        if (data.data && Array.isArray(data.data)) return data.data;
        if (data.ordenes && Array.isArray(data.ordenes)) return data.ordenes;
        if (data.pedidos && Array.isArray(data.pedidos)) return data.pedidos;
      } catch (errEp) {
        logger.debug('Endpoint paginado no disponible:', ep, errEp.message || errEp);
        continue;
      }
    }
    return listarLocal();
  } catch (err) {
    logger.error('Error obtenerOrdenesPaginadas:', err);
    return listarLocal();
  }
}

/**
 * Actualiza campos de una orden (p.ej. estado) probando PUT en endpoints comunes.
 */
async function actualizarEstadoOrden(orderId, datos) {
  const endpoints = [`/ordenes/${orderId}`, `/pedidos/${orderId}`, `/orders/${orderId}`];
  let lastErr = null;
  for (const ep of endpoints) {
    try {
      const resp = await api.put(ep, datos);
      return resp.data;
    } catch (err) {
      lastErr = err;
      continue;
    }
  }
  throw lastErr || new Error('No se pudo actualizar la orden');
}

export default { obtenerTodasOrdenes, crearOrdenLocal, obtenerOrdenesPaginadas, actualizarEstadoOrden };
