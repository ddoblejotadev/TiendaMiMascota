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

export default { listar, actualizarRole, eliminar };
