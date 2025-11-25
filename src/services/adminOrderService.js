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
    const response = await api.get('/ordenes');
    const data = response.data;
    
    if (data && Array.isArray(data)) {
      return data;
    }
    if (data && data.content && Array.isArray(data.content)) {
      return data.content;
    }
    if (data && data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    logger.warn('Formato de órdenes no reconocido, usando fallback local');
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

export default { obtenerTodasOrdenes, crearOrdenLocal };
