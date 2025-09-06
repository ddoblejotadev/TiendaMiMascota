// ==============================================
// VALIDACIONES DE FORMULARIOS - PRINCIPIANTE
// ==============================================

// Función para validar RUN chileno (simple)
function validarRUN(run) {
  // Eliminar espacios y convertir a mayúscula
  run = run.replace(/\s/g, '').toUpperCase();
  
  // Validar largo (7-9 caracteres)
  if (run.length < 7 || run.length > 9) {
    return false;
  }
  
  // Verificar que termine en número o K
  var ultimoCaracter = run.charAt(run.length - 1);
  if (!/[0-9K]/.test(ultimoCaracter)) {
    return false;
  }
  
  return true;
}

// Función para validar email según requerimientos
function validarEmail(email) {
  if (!email || email.length > 100) {
    return false;
  }
  
  // Solo permite @duoc.cl, @profesor.duoc.cl y @gmail.com
  if (email.includes('@duoc.cl') || email.includes('@profesor.duoc.cl') || email.includes('@gmail.com')) {
    return true;
  }
  
  return false;
}

// Función para validar contraseña (4-10 caracteres)
function validarPassword(password) {
  return password && password.length >= 4 && password.length <= 10;
}

// Función para validar nombre (máximo 50 caracteres)
function validarNombre(nombre) {
  return nombre && nombre.length <= 50;
}

// Función para validar apellidos (máximo 100 caracteres)
function validarApellidos(apellidos) {
  return apellidos && apellidos.length <= 100;
}

// Función para validar dirección (máximo 300 caracteres)
function validarDireccion(direccion) {
  return direccion && direccion.length <= 300;
}

// Función para validar comentario (máximo 500 caracteres)
function validarComentario(comentario) {
  return comentario && comentario.length <= 500;
}

// Función para mostrar mensaje de error
function mostrarError(campo, mensaje) {
  alert('❌ ' + campo + ': ' + mensaje);
}

// Función para mostrar mensaje de éxito
function mostrarExito(mensaje) {
  alert('✅ ' + mensaje);
}
