import api from '../util/constants';
import logger from '../util/logger';

async function listar() {
  try {
    const resp = await api.get('/usuarios');
    // Soportar varios formatos: array directo, { content: [...] }, { data: [...] }
    if (Array.isArray(resp.data)) return resp.data;
    if (resp.data?.content && Array.isArray(resp.data.content)) return resp.data.content;
    if (resp.data?.data && Array.isArray(resp.data.data)) return resp.data.data;
    logger.warn('Formato inesperado al listar usuarios, devolviendo array vacío', resp.data);
    return [];
  } catch (error) {
    logger.error('Error listando usuarios desde backend:', error);
    // Fallback: retornar lista vacía
    return [];
  }
}

async function obtenerPorId(id) {
  try {
    const resp = await api.get(`/usuarios/${id}`);
    // Normalizar distintos formatos
    const data = resp.data;
    if (!data) return null;
    // Si viene { usuario: { ... } }
    if (data.usuario && typeof data.usuario === 'object') return data.usuario;
    // Si viene { data: { ... } }
    if (data.data && typeof data.data === 'object') return data.data;
    // Si viene directamente el objeto usuario
    if (typeof data === 'object') return data;
    return null;
  } catch (error) {
    logger.error('Error obteniendo usuario por id:', id, error);
    return null;
  }
}

async function actualizarRole(id, role) {
  try {
    // Intentar usar PUT /usuarios/:id con payload { rol } o { role }
    const payload = { rol: role };
    await api.put(`/usuarios/${id}`, payload);
    return true;
  } catch (error) {
    logger.error('Error actualizando role de usuario:', error);
    throw error;
  }
}

async function eliminar(id) {
  try {
    await api.delete(`/usuarios/${id}`);
    return true;
  } catch (error) {
    logger.error('Error eliminando usuario:', error);
    throw error;
  }
}

export default { listar, actualizarRole, eliminar, obtenerPorId };
