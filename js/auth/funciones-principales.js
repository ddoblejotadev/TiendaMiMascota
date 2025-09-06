// =============================================
// FUNCIONES DE REGISTRO Y LOGIN - SOLO 2 FUNCIONES
// =============================================

// FUNCIÓN 1: Registrar usuario nuevo
function registrarUsuario() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if (nombre === '' || email === '' || password === '') {
    mostrarNotificacion('❌ Todos los campos son obligatorios', 'error');
    return;
  }
  
  if (!validarEmail(email)) {
    mostrarNotificacion('❌ Email debe ser @duoc.cl, @gmail.com o @profesor.duoc.cl', 'error');
    return;
  }
  
  if (!validarPassword(password)) {
    mostrarNotificacion('❌ Contraseña debe tener entre 4 y 10 caracteres', 'error');
    return;
  }
  
  // Guardar usuario
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Verificar si ya existe
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      mostrarNotificacion('❌ Este email ya está registrado', 'error');
      return;
    }
  }
  
  // Asignar rol automáticamente según el email
  var rol = 'cliente'; // Por defecto
  if (email === 'admin@duoc.cl') {
    rol = 'administrador';
  } else if (email.includes('vendedor') && email.endsWith('@duoc.cl')) {
    rol = 'vendedor';
  }
  
  var proximoId = usuarios.length + 1;
  
  var nuevoUsuario = {
    id: proximoId,
    nombre: nombre,
    email: email,
    password: password,
    rol: rol,
    activo: true,
    fechaRegistro: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
  mostrarNotificacion('✅ Usuario registrado como ' + rol.toUpperCase(), 'success');
  
  // Esperar un poco antes de redirigir
  setTimeout(function() {
    window.location.href = 'iniciar-sesion.html';
  }, 1500);
}

// FUNCIÓN 2: Iniciar sesión con roles
function iniciarSesion() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if (email === '' || password === '') {
    mostrarNotificacion('❌ Ingresa email y contraseña', 'error');
    return;
  }
  
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Buscar usuario
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].password === password) {
      
      // Verificar si el usuario está activo
      if (!usuarios[i].activo) {
        mostrarNotificacion('❌ Usuario desactivado. Contacta al administrador', 'error');
        return;
      }
      
      // Guardar sesión
      localStorage.setItem('usuarioActual', JSON.stringify(usuarios[i]));
      
      mostrarNotificacion('✅ Bienvenido ' + usuarios[i].nombre + ' (' + usuarios[i].rol.toUpperCase() + ')', 'success');
      
      // Esperar un poco antes de redirigir
      setTimeout(function() {
        // Redirigir según ROL del usuario
        if (usuarios[i].rol === 'administrador') {
          window.location.href = '../admin/panel-administrador.html';
        } else if (usuarios[i].rol === 'vendedor') {
          window.location.href = '../vendedor/panel-vendedor.html';
        } else {
          // Cliente va al panel de usuario
          window.location.href = '../user/panel-usuario.html';
        }
      }, 1500);
      return;
    }
  }
  
  mostrarNotificacion('❌ Email o contraseña incorrectos', 'error');
}