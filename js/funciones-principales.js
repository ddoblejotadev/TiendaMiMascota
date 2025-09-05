// Funciones básicas para principiantes - Tienda MiMascota

// Lista simple de regiones y comunas
var regiones = {
  "Región Metropolitana": ["Santiago", "Las Condes", "Providencia"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar"],
  "Región del Biobío": ["Concepción", "Talcahuano"]
};

// Función simple para validar email
function validarEmail(email) {
  // Solo verificar que tenga @ y termine en los dominios permitidos
  if (!email.includes('@')) {
    return false;
  }
  
  if (email.endsWith('@duoc.cl') || email.endsWith('@profesor.duoc.cl') || email.endsWith('@gmail.com')) {
    return true;
  }
  
  return false;
}

// Función simple para validar contraseña
function validarPassword(password) {
  // Solo verificar que tenga entre 4 y 10 caracteres
  return password.length >= 4 && password.length <= 10;
}

// Función simple para validar RUT
function validarRUT(rut) {
  // Solo verificar longitud básica
  if (rut.length < 8 || rut.length > 12) {
    return false;
  }
  return true;
}

// Función para llenar select de regiones
function llenarRegiones() {
  var selectRegion = document.getElementById('region');
  var selectComuna = document.getElementById('comuna');
  
  if (!selectRegion || !selectComuna) {
    return;
  }
  
  // Limpiar opciones
  selectRegion.innerHTML = '<option value="">Selecciona región</option>';
  selectComuna.innerHTML = '<option value="">Selecciona comuna</option>';
  
  // Agregar regiones
  for (var nombreRegion in regiones) {
    var option = document.createElement('option');
    option.value = nombreRegion;
    option.textContent = nombreRegion;
    selectRegion.appendChild(option);
  }
  
  // Cuando cambie región, cargar comunas
  selectRegion.addEventListener('change', function() {
    var regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Selecciona comuna</option>';
    
    if (regionSeleccionada && regiones[regionSeleccionada]) {
      var comunas = regiones[regionSeleccionada];
      for (var i = 0; i < comunas.length; i++) {
        var option = document.createElement('option');
        option.value = comunas[i];
        option.textContent = comunas[i];
        selectComuna.appendChild(option);
      }
    }
  });
}

// Función simple para mostrar mensajes
function mostrarMensaje(tipo, mensaje, contenedorId) {
  var contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    if (tipo === 'success') {
      contenedor.innerHTML = '<div style="color: green; padding: 10px; background: lightgreen;">' + mensaje + '</div>';
    } else {
      contenedor.innerHTML = '<div style="color: red; padding: 10px; background: lightcoral;">' + mensaje + '</div>';
    }
    
    // Limpiar después de 3 segundos
    setTimeout(function() {
      contenedor.innerHTML = '';
    }, 3000);
  }
}

// Función simple para guardar usuario
function guardarUsuario(usuario) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función simple para verificar si email existe
function emailExiste(email) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return true;
    }
  }
  return false;
}

// Función simple para login
function hacerLogin(email, password) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].password === password) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarios[i]));
      return usuarios[i];
    }
  }
  
  return null;
}

// Cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada');
  
  // Llenar regiones si existen
  llenarRegiones();
  
  // Manejar formulario de registro
  var formRegistro = document.getElementById('registroForm');
  if (formRegistro) {
    formRegistro.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Obtener datos
      var rut = document.getElementById('rut').value.trim();
      var nombre = document.getElementById('nombreCompleto').value.trim();
      var email = document.getElementById('email').value.trim();
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('confirmPassword').value;
      var region = document.getElementById('region').value;
      var comuna = document.getElementById('comuna').value;
      var telefono = document.getElementById('telefono').value.trim();
      var direccion = document.getElementById('direccion').value.trim();
      
      // Validar campos vacíos
      if (!rut || !nombre || !email || !password || !confirmPassword || !region || !comuna || !telefono || !direccion) {
        mostrarMensaje('error', 'Todos los campos son obligatorios', 'alertaRegistro');
        return;
      }
      
      // Validar RUT
      if (!validarRUT(rut)) {
        mostrarMensaje('error', 'RUT no válido', 'alertaRegistro');
        return;
      }
      
      // Validar email
      if (!validarEmail(email)) {
        mostrarMensaje('error', 'Email no válido. Use @duoc.cl, @profesor.duoc.cl o @gmail.com', 'alertaRegistro');
        return;
      }
      
      // Validar contraseña
      if (!validarPassword(password)) {
        mostrarMensaje('error', 'La contraseña debe tener entre 4 y 10 caracteres', 'alertaRegistro');
        return;
      }
      
      // Validar confirmación
      if (password !== confirmPassword) {
        mostrarMensaje('error', 'Las contraseñas no coinciden', 'alertaRegistro');
        return;
      }
      
      // Validar email único
      if (emailExiste(email)) {
        mostrarMensaje('error', 'Este email ya está registrado', 'alertaRegistro');
        return;
      }
      
      // Crear usuario
      var nuevoUsuario = {
        rut: rut,
        nombre: nombre,
        email: email,
        password: password,
        region: region,
        comuna: comuna,
        telefono: telefono,
        direccion: direccion,
        tipoUsuario: 'cliente',
        fechaRegistro: new Date().toISOString()
      };
      
      // Guardar usuario
      guardarUsuario(nuevoUsuario);
      
      // Mostrar éxito
      mostrarMensaje('success', '¡Usuario registrado correctamente!', 'alertaRegistro');
      
      // Limpiar formulario
      formRegistro.reset();
      
      // Redirigir después de 2 segundos
      setTimeout(function() {
        window.location.href = 'iniciar-sesion.html';
      }, 2000);
    });
  }
  
  // Manejar formulario de login
  var formLogin = document.getElementById('loginForm');
  if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
      event.preventDefault();
      
      var email = document.getElementById('loginId').value.trim();
      var password = document.getElementById('loginPassword').value;
      
      // Validar campos
      if (!email || !password) {
        mostrarMensaje('error', 'Ingresa email y contraseña', 'loginAlert');
        return;
      }
      
      // Intentar login
      var usuario = hacerLogin(email, password);
      
      if (!usuario) {
        mostrarMensaje('error', 'Email o contraseña incorrectos', 'loginAlert');
        return;
      }
      
      // Login exitoso
      mostrarMensaje('success', 'Ingresando...', 'loginAlert');
      
      // Redirigir según tipo
      setTimeout(function() {
        if (email.includes('@admin.cl') || usuario.tipoUsuario === 'administrador') {
          window.location.href = '../admin/panel-administrador.html';
        } else {
          window.location.href = 'panel-usuario.html';
        }
      }, 1000);
    });
  }
  
  // Manejar formulario de contacto
  var formContacto = document.getElementById('contactForm');
  if (formContacto) {
    formContacto.addEventListener('submit', function(event) {
      event.preventDefault();
      
      var nombre = document.getElementById('contactName').value.trim();
      var email = document.getElementById('contactEmail').value.trim();
      var mensaje = document.getElementById('contactMessage').value.trim();
      
      // Validar campos
      if (!nombre || !email || !mensaje) {
        mostrarMensaje('error', 'Todos los campos son obligatorios', 'contactAlert');
        return;
      }
      
      // Validar longitudes
      if (nombre.length > 100) {
        mostrarMensaje('error', 'El nombre no puede tener más de 100 caracteres', 'contactAlert');
        return;
      }
      
      if (mensaje.length > 500) {
        mostrarMensaje('error', 'El mensaje no puede tener más de 500 caracteres', 'contactAlert');
        return;
      }
      
      // Validar email
      if (!validarEmail(email)) {
        mostrarMensaje('error', 'Email no válido', 'contactAlert');
        return;
      }
      
      // Simular envío
      mostrarMensaje('success', 'Mensaje enviado correctamente', 'contactAlert');
      formContacto.reset();
    });
  }
});

// Crear usuario admin por defecto
function crearAdmin() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Verificar si admin ya existe
  var adminExiste = false;
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === 'admin@admin.cl') {
      adminExiste = true;
      break;
    }
  }
  
  // Si no existe, crearlo
  if (!adminExiste) {
    var admin = {
      rut: '12345678-9',
      nombre: 'Administrador',
      email: 'admin@admin.cl',
      password: 'admin123',
      tipoUsuario: 'administrador',
      region: 'Región Metropolitana',
      comuna: 'Santiago',
      telefono: '+56912345678',
      direccion: 'Dirección Admin',
      fechaRegistro: new Date().toISOString()
    };
    
    usuarios.push(admin);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Admin creado: admin@admin.cl / admin123');
  }
}

// Crear admin al cargar
crearAdmin();

console.log('Funciones básicas cargadas');