// =============================================
// FUNCIONES BÁSICAS - SOLO 4 FUNCIONES SIMPLES
// =============================================

// FUNCIÓN 1: Validar email básico
function validarEmail(email) {
  return email.includes('@') && (email.includes('duoc.cl') || email.includes('gmail.com') || email.includes('admin.cl'));
}

// FUNCIÓN 2: Validar contraseña básica
function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

// FUNCIÓN 3: Registrar usuario nuevo
function registrarUsuario() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if (nombre === '' || email === '' || password === '') {
    alert('❌ Todos los campos son obligatorios');
    return;
  }
  
  if (!validarEmail(email)) {
    alert('❌ Email debe ser @duoc.cl, @gmail.com o @admin.cl');
    return;
  }
  
  if (!validarPassword(password)) {
    alert('❌ Contraseña debe tener entre 4 y 10 caracteres');
    return;
  }
  
  // Guardar usuario
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Verificar si ya existe
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      alert('❌ Este email ya está registrado');
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
  
  alert('✅ Usuario registrado correctamente');
  window.location.href = 'iniciar-sesion.html';
}

// FUNCIÓN 4: Iniciar sesión
function iniciarSesion() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  if (email === '' || password === '') {
    alert('❌ Ingresa email y contraseña');
    return;
  }
  
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].password === password) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarios[i]));
      alert('✅ Bienvenido ' + usuarios[i].nombre);
      
      // Redirigir según tipo de usuario
      if (email.includes('@admin.cl')) {
        window.location.href = '../admin/panel-administrador.html';
      } else {
        window.location.href = '../user/panel-usuario.html';
      }
      return;
    }
  }
  
  alert('❌ Email o contraseña incorrectos');
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  
  // Llenar regiones si existe el select
  var selectRegion = document.getElementById('region');
  if (selectRegion) {
    selectRegion.innerHTML = '<option value="">Selecciona región</option>' +
                             '<option value="Metropolitana">Región Metropolitana</option>' +
                             '<option value="Valparaiso">Región de Valparaíso</option>' +
                             '<option value="Biobio">Región del Biobío</option>';
  }
  
  // Llenar comunas cuando cambie región
  if (selectRegion) {
    selectRegion.addEventListener('change', function() {
      var selectComuna = document.getElementById('comuna');
      if (selectComuna) {
        if (this.value === 'Metropolitana') {
          selectComuna.innerHTML = '<option value="">Selecciona comuna</option>' +
                                   '<option value="Santiago">Santiago</option>' +
                                   '<option value="Las Condes">Las Condes</option>' +
                                   '<option value="Providencia">Providencia</option>';
        } else if (this.value === 'Valparaiso') {
          selectComuna.innerHTML = '<option value="">Selecciona comuna</option>' +
                                   '<option value="Valparaiso">Valparaíso</option>' +
                                   '<option value="Vina del Mar">Viña del Mar</option>';
        } else if (this.value === 'Biobio') {
          selectComuna.innerHTML = '<option value="">Selecciona comuna</option>' +
                                   '<option value="Concepcion">Concepción</option>' +
                                   '<option value="Talcahuano">Talcahuano</option>';
        } else {
          selectComuna.innerHTML = '<option value="">Selecciona comuna</option>';
        }
      }
    });
  }
});