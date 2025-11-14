/**
 * SERVICIO DE AUTENTICACIÓN
 * Maneja login, registro y sesión de usuarios
 */

// Clave para localStorage
const USER_KEY = 'tienda_mimascota_usuario';

// Base de datos simulada de usuarios
let usuariosDB = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456', // En producción NUNCA guardar passwords en texto plano
    telefono: '+56912345678',
    direccion: 'Av. Principal 123, Santiago'
  }
];

/**
 * Inicia sesión
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} - Usuario logueado o error
 */
export async function login(email, password) {
  // Simular delay de red
  await delay(500);
  
  const usuario = usuariosDB.find(
    u => u.email === email && u.password === password
  );
  
  if (!usuario) {
    throw new Error('Email o contraseña incorrectos');
  }
  
  // Guardar usuario en localStorage (sin password)
  const usuarioSinPassword = { ...usuario };
  delete usuarioSinPassword.password;
  
  localStorage.setItem(USER_KEY, JSON.stringify(usuarioSinPassword));
  
  return usuarioSinPassword;
}

/**
 * Registra un nuevo usuario
 * @param {Object} datosUsuario - Datos del usuario
 * @returns {Promise<Object>} - Usuario registrado
 */
export async function registrar(datosUsuario) {
  await delay(500);
  
  // Verificar si el email ya existe
  const emailExiste = usuariosDB.some(u => u.email === datosUsuario.email);
  
  if (emailExiste) {
    throw new Error('El email ya está registrado');
  }
  
  // Crear nuevo usuario
  const nuevoUsuario = {
    id: Math.max(...usuariosDB.map(u => u.id)) + 1,
    ...datosUsuario
  };
  
  usuariosDB.push(nuevoUsuario);
  
  // Guardar usuario en localStorage (sin password)
  const usuarioSinPassword = { ...nuevoUsuario };
  delete usuarioSinPassword.password;
  
  localStorage.setItem(USER_KEY, JSON.stringify(usuarioSinPassword));
  
  return usuarioSinPassword;
}

/**
 * Cierra sesión
 */
export function logout() {
  localStorage.removeItem(USER_KEY);
}

/**
 * Obtiene el usuario actual
 * @returns {Object|null} - Usuario actual o null
 */
export function obtenerUsuarioActual() {
  const usuarioJSON = localStorage.getItem(USER_KEY);
  return usuarioJSON ? JSON.parse(usuarioJSON) : null;
}

/**
 * Verifica si hay un usuario logueado
 * @returns {boolean} - true si está logueado
 */
export function estaLogueado() {
  return obtenerUsuarioActual() !== null;
}

/**
 * Actualiza los datos del usuario actual
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object>} - Usuario actualizado
 */
export async function actualizarPerfil(datosActualizados) {
  await delay(500);
  
  const usuarioActual = obtenerUsuarioActual();
  
  if (!usuarioActual) {
    throw new Error('No hay usuario logueado');
  }
  
  // Actualizar en la "base de datos"
  const index = usuariosDB.findIndex(u => u.id === usuarioActual.id);
  if (index !== -1) {
    usuariosDB[index] = {
      ...usuariosDB[index],
      ...datosActualizados
    };
    
    // Actualizar en localStorage
    const usuarioActualizado = { ...usuariosDB[index] };
    delete usuarioActualizado.password;
    
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioActualizado));
    
    return usuarioActualizado;
  }
  
  throw new Error('Usuario no encontrado');
}

/**
 * Función auxiliar para simular delay de red
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}