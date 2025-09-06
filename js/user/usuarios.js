// ==============================================
// GESTIÓN DE USUARIOS - PRINCIPIANTE
// ==============================================

// Función para obtener usuarios del localStorage
function obtenerUsuarios() {
  var usuarios = localStorage.getItem('usuarios');
  return usuarios ? JSON.parse(usuarios) : [];
}

// Función para guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
  // Obtener valores del formulario
  var run = document.getElementById('run').value.trim();
  var nombre = document.getElementById('nombre').value.trim();
  var apellidos = document.getElementById('apellidos').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  var fechaNacimiento = document.getElementById('fechaNacimiento').value;
  var region = document.getElementById('region').value;
  var comuna = document.getElementById('comuna').value;
  var direccion = document.getElementById('direccion').value.trim();
  
  // Validaciones según requerimientos
  if (!run) {
    mostrarError('RUN', 'Campo obligatorio');
    return;
  }
  
  if (!validarRUN(run)) {
    mostrarError('RUN', 'Formato inválido. Ejemplo: 12345678K');
    return;
  }
  
  if (!nombre) {
    mostrarError('Nombre', 'Campo obligatorio');
    return;
  }
  
  if (!validarNombre(nombre)) {
    mostrarError('Nombre', 'Máximo 50 caracteres');
    return;
  }
  
  if (!apellidos) {
    mostrarError('Apellidos', 'Campo obligatorio');
    return;
  }
  
  if (!validarApellidos(apellidos)) {
    mostrarError('Apellidos', 'Máximo 100 caracteres');
    return;
  }
  
  if (!email) {
    mostrarError('Email', 'Campo obligatorio');
    return;
  }
  
  if (!validarEmail(email)) {
    mostrarError('Email', 'Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com');
    return;
  }
  
  if (!password) {
    mostrarError('Contraseña', 'Campo obligatorio');
    return;
  }
  
  if (!validarPassword(password)) {
    mostrarError('Contraseña', 'Debe tener entre 4 y 10 caracteres');
    return;
  }
  
  if (!direccion) {
    mostrarError('Dirección', 'Campo obligatorio');
    return;
  }
  
  if (!validarDireccion(direccion)) {
    mostrarError('Dirección', 'Máximo 300 caracteres');
    return;
  }
  
  // Verificar si el usuario ya existe
  var usuarios = obtenerUsuarios();
  var usuarioExiste = usuarios.find(function(u) { 
    return u.email === email || u.run === run; 
  });
  
  if (usuarioExiste) {
    mostrarError('Usuario', 'Ya existe un usuario con ese email o RUN');
    return;
  }
  
  // Determinar rol según email
  var rol = 'cliente'; // Por defecto
  if (email === 'admin@duoc.cl') {
    rol = 'administrador';
  } else if (email.includes('vendedor') && email.includes('@duoc.cl')) {
    rol = 'vendedor';
  }
  
  // Crear nuevo usuario
  var nuevoUsuario = {
    id: usuarios.length + 1,
    run: run,
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    password: password,
    fechaNacimiento: fechaNacimiento,
    region: region,
    comuna: comuna,
    direccion: direccion,
    rol: rol,
    fechaRegistro: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  
  mostrarExito('Usuario registrado como ' + rol.toUpperCase());
  
  // Limpiar formulario
  document.getElementById('registroForm').reset();
  
  // Limpiar select de comunas
  var selectComuna = document.getElementById('comuna');
  if (selectComuna) {
    selectComuna.innerHTML = '<option value="">Seleccione comuna</option>';
  }
}

// Función para iniciar sesión
function iniciarSesion() {
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  
  // Validaciones
  if (!email) {
    mostrarError('Email', 'Campo obligatorio');
    return;
  }
  
  if (!validarEmail(email)) {
    mostrarError('Email', 'Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com');
    return;
  }
  
  if (!password) {
    mostrarError('Contraseña', 'Campo obligatorio');
    return;
  }
  
  if (!validarPassword(password)) {
    mostrarError('Contraseña', 'Debe tener entre 4 y 10 caracteres');
    return;
  }
  
  // Buscar usuario
  var usuarios = obtenerUsuarios();
  var usuario = usuarios.find(function(u) { 
    return u.email === email && u.password === password; 
  });
  
  if (usuario) {
    mostrarExito('Bienvenido ' + usuario.nombre + ' (' + usuario.rol + ')');
    
    // Guardar sesión actual
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    
    // Redirigir según rol
    if (usuario.rol === 'administrador') {
      window.location.href = '../admin/panel-administrador.html';
    } else if (usuario.rol === 'vendedor') {
      window.location.href = '../admin/panel-vendedor.html';
    } else {
      window.location.href = '../../index.html';
    }
  } else {
    mostrarError('Login', 'Email o contraseña incorrectos');
  }
}

// Función para listar usuarios (solo para admin)
function listarUsuarios() {
  var usuarios = obtenerUsuarios();
  var contenedor = document.getElementById('usuarios-lista');
  
  if (contenedor) {
    contenedor.innerHTML = '';
    
    usuarios.forEach(function(usuario) {
      var div = document.createElement('div');
      div.className = 'card mb-3';
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${usuario.nombre} ${usuario.apellidos}</h5>
          <p class="card-text">
            <strong>RUN:</strong> ${usuario.run}<br>
            <strong>Email:</strong> ${usuario.email}<br>
            <strong>Rol:</strong> ${usuario.rol}<br>
            <strong>Región:</strong> ${usuario.region || 'No especificada'}<br>
            <strong>Comuna:</strong> ${usuario.comuna || 'No especificada'}<br>
            <strong>Dirección:</strong> ${usuario.direccion}
          </p>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }
}
