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
    mostrarNotificacion('❌ Email debe ser @duoc.cl, @gmail.com o @admin.cl', 'error');
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
  
  var nuevoUsuario = {
    nombre: nombre,
    email: email,
    password: password,
    fechaRegistro: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
  mostrarNotificacion('✅ Usuario registrado correctamente', 'success');
  
  // Esperar un poco antes de redirigir
  setTimeout(function() {
    window.location.href = 'iniciar-sesion.html';
  }, 1500);
}

// FUNCIÓN 2: Iniciar sesión
function iniciarSesion() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if (email === '' || password === '') {
    mostrarNotificacion('❌ Ingresa email y contraseña', 'error');
    return;
  }
  
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].password === password) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarios[i]));
      mostrarNotificacion('✅ Bienvenido ' + usuarios[i].nombre, 'success');
      
      // Esperar un poco antes de redirigir
      setTimeout(function() {
        // Redirigir según tipo de usuario
        if (email.includes('@admin.cl')) {
          window.location.href = '../admin/panel-administrador.html';
        } else {
          window.location.href = '../user/panel-usuario.html';
        }
      }, 1500);
      return;
    }
  }
  
  mostrarNotificacion('❌ Email o contraseña incorrectos', 'error');
}