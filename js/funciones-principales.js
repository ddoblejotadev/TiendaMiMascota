// ===========================================
// FUNCIONES PRINCIPALES - TIENDA MIMASCOTA
// Código simple para principiantes
// ===========================================

// Lista de regiones y comunas para los formularios
const regiones = {
  "Región Metropolitana": ["Santiago", "Las Condes", "Providencia", "Maipú"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
  "Región de La Araucanía": ["Temuco", "Villarrica", "Pucón"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro"]
};

// ===========================================
// FUNCIONES SIMPLES PARA VALIDAR DATOS
// ===========================================

// Función simple para validar RUT
function validarRUT(rut) {
  // Solo validar que tenga números y una letra al final
  if (rut.length < 8 || rut.length > 12) {
    return false;
  }
  
  // Debe terminar en número o K
  const ultimoCaracter = rut.slice(-1).toLowerCase();
  if (ultimoCaracter !== 'k' && isNaN(ultimoCaracter)) {
    return false;
  }
  
  return true;
}

// Función simple para validar email
function validarEmail(email) {
  // Lista de dominios permitidos
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  
  // Verificar que tenga @
  if (!email.includes('@')) {
    return false;
  }
  
  // Obtener la parte después del @
  const dominio = email.split('@')[1];
  
  // Verificar si el dominio está permitido
  return dominiosPermitidos.includes(dominio);
}

// Función simple para validar contraseña
function validarPassword(password) {
  // Debe tener entre 4 y 10 caracteres
  return password.length >= 4 && password.length <= 10;
}

// ===========================================
// FUNCIONES PARA LLENAR FORMULARIOS
// ===========================================

// Función simple para llenar regiones
function llenarRegiones() {
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');
  
  if (!selectRegion || !selectComuna) {
    return;
  }
  
  // Limpiar opciones
  selectRegion.innerHTML = '<option value="">Selecciona una región</option>';
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
  
  // Agregar regiones
  for (let nombreRegion in regiones) {
    const option = document.createElement('option');
    option.value = nombreRegion;
    option.textContent = nombreRegion;
    selectRegion.appendChild(option);
  }
  
  // Cuando cambie la región, cargar comunas
  selectRegion.addEventListener('change', function() {
    const regionSeleccionada = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    
    if (regionSeleccionada && regiones[regionSeleccionada]) {
      const comunas = regiones[regionSeleccionada];
      for (let i = 0; i < comunas.length; i++) {
        const option = document.createElement('option');
        option.value = comunas[i];
        option.textContent = comunas[i];
        selectComuna.appendChild(option);
      }
    }
  });
}

// ===========================================
// FUNCIONES PARA GUARDAR Y OBTENER USUARIOS
// ===========================================

// Función simple para guardar un usuario
function guardarUsuario(usuario) {
  // Obtener usuarios existentes
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Agregar el nuevo usuario
  usuarios.push(usuario);
  
  // Guardar en localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función simple para obtener usuarios
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

// Función simple para verificar si un email ya existe
function emailYaExiste(email) {
  const usuarios = obtenerUsuarios();
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return true;
    }
  }
  return false;
}

// Función simple para iniciar sesión
function iniciarSesion(email, password) {
  const usuarios = obtenerUsuarios();
  
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email && usuarios[i].password === password) {
      // Guardar usuario actual
      localStorage.setItem('usuarioActual', JSON.stringify(usuarios[i]));
      return usuarios[i];
    }
  }
  
  return null; // No encontrado
}

// ===========================================
// FUNCIONES PARA MOSTRAR MENSAJES
// ===========================================

// Función simple para mostrar mensajes al usuario
function mostrarMensaje(tipo, mensaje, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    if (tipo === 'success') {
      contenedor.innerHTML = `<div style="color: green; padding: 10px; border: 1px solid green; background: #d4edda; margin: 10px 0;">${mensaje}</div>`;
    } else {
      contenedor.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red; background: #f8d7da; margin: 10px 0;">${mensaje}</div>`;
    }
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(function() {
      contenedor.innerHTML = '';
    }, 3000);
  }
}

// ===========================================
// CÓDIGO QUE SE EJECUTA CUANDO CARGA LA PÁGINA
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada');
  
  // Llenar regiones si existe el formulario
  llenarRegiones();
  
  // ===========================================
  // FORMULARIO DE REGISTRO
  // ===========================================
  
  const formRegistro = document.getElementById('registroForm');
  if (formRegistro) {
    formRegistro.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Obtener datos del formulario
      const rut = document.getElementById('rut').value.trim();
      const nombre = document.getElementById('nombreCompleto').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const region = document.getElementById('region').value;
      const comuna = document.getElementById('comuna').value;
      const telefono = document.getElementById('telefono').value.trim();
      const direccion = document.getElementById('direccion').value.trim();
      
      // Validar campos obligatorios
      if (!rut || !nombre || !email || !password || !confirmPassword || !region || !comuna || !telefono || !direccion) {
        mostrarMensaje('error', 'Todos los campos marcados con * son obligatorios', 'alertaRegistro');
        return;
      }
      
      // Validar RUT
      if (!validarRUT(rut)) {
        mostrarMensaje('error', 'El RUT no es válido', 'alertaRegistro');
        return;
      }
      
      // Validar email
      if (!validarEmail(email)) {
        mostrarMensaje('error', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'alertaRegistro');
        return;
      }
      
      // Validar contraseña
      if (!validarPassword(password)) {
        mostrarMensaje('error', 'La contraseña debe tener entre 4 y 10 caracteres', 'alertaRegistro');
        return;
      }
      
      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        mostrarMensaje('error', 'Las contraseñas no coinciden', 'alertaRegistro');
        return;
      }
      
      // Validar que el email no esté registrado
      if (emailYaExiste(email)) {
        mostrarMensaje('error', 'Ya existe un usuario con este email', 'alertaRegistro');
        return;
      }
      
      // Crear objeto usuario
      const nuevoUsuario = {
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
      
      // Mostrar mensaje de éxito
      mostrarMensaje('success', '¡Usuario registrado exitosamente!', 'alertaRegistro');
      
      // Limpiar formulario
      formRegistro.reset();
      
      // Redirigir después de 2 segundos
      setTimeout(function() {
        window.location.href = 'iniciar-sesion.html';
      }, 2000);
    });
  }
  
  // ===========================================
  // FORMULARIO DE LOGIN
  // ===========================================
  
  const formLogin = document.getElementById('loginForm');
  if (formLogin) {
    formLogin.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('loginId').value.trim();
      const password = document.getElementById('loginPassword').value;
      
      // Validar campos
      if (!email || !password) {
        mostrarMensaje('error', 'Ingresa email y contraseña', 'loginAlert');
        return;
      }
      
      // Intentar iniciar sesión
      const usuario = iniciarSesion(email, password);
      
      if (!usuario) {
        mostrarMensaje('error', 'Email o contraseña incorrectos', 'loginAlert');
        return;
      }
      
      // Login exitoso
      mostrarMensaje('success', 'Ingresando...', 'loginAlert');
      
      // Redirigir según tipo de usuario
      setTimeout(function() {
        if (email.includes('@admin.cl') || usuario.tipoUsuario === 'administrador') {
          window.location.href = '../admin/panel-administrador.html';
        } else if (usuario.tipoUsuario === 'vendedor') {
          window.location.href = '../admin/panel-vendedor.html';
        } else {
          window.location.href = 'panel-usuario.html';
        }
      }, 1000);
    });
  }
  
  // ===========================================
  // FORMULARIO DE CONTACTO
  // ===========================================
  
  const formContacto = document.getElementById('contactForm');
  if (formContacto) {
    formContacto.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nombre = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const mensaje = document.getElementById('contactMessage').value.trim();
      
      // Validar campos obligatorios
      if (!nombre || !email || !mensaje) {
        mostrarMensaje('error', 'Todos los campos son obligatorios', 'contactAlert');
        return;
      }
      
      // Validar longitud del nombre (máx 100 caracteres)
      if (nombre.length > 100) {
        mostrarMensaje('error', 'El nombre no puede tener más de 100 caracteres', 'contactAlert');
        return;
      }
      
      // Validar email
      if (!validarEmail(email)) {
        mostrarMensaje('error', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'contactAlert');
        return;
      }
      
      // Validar longitud del mensaje (máx 500 caracteres)
      if (mensaje.length > 500) {
        mostrarMensaje('error', 'El mensaje no puede tener más de 500 caracteres', 'contactAlert');
        return;
      }
      
      // Simular envío exitoso
      mostrarMensaje('success', 'Mensaje enviado correctamente', 'contactAlert');
      formContacto.reset();
    });
  }
});

// ===========================================
// CREAR USUARIO ADMINISTRADOR POR DEFECTO
// ===========================================

// Función para crear usuario admin si no existe
function crearUsuarioAdmin() {
  const usuarios = obtenerUsuarios();
  
  // Verificar si ya existe el admin
  let adminExiste = false;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === 'admin@admin.cl') {
      adminExiste = true;
      break;
    }
  }
  
  // Si no existe, crearlo
  if (!adminExiste) {
    const usuarioAdmin = {
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
    
    guardarUsuario(usuarioAdmin);
    console.log('Usuario admin creado: admin@admin.cl / admin123');
  }
}

// Crear el usuario admin al cargar
crearUsuarioAdmin();

console.log('Funciones principales cargadas');