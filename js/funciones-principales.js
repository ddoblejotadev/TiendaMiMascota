// ============= MAIN.JS - PROYECTO TIENDA MIMASCOTA =============
// Archivo principal para manejo de registro, login y validaciones
// Código simple y comentado para nivel principiante

// ============= 1. DATOS DE REGIONES Y COMUNAS =============
const regionesYcomunas = {
  "Región Metropolitana": ["Santiago", "Las Condes", "Providencia", "Maipú", "Puente Alto", "La Florida"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"],
  "Región de La Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"]
};

// ============= 2. FUNCIONES DE VALIDACIÓN =============

// Función simple para validar RUT chileno
function validarRUT(rut) {
  // El RUT debe venir sin puntos ni guión: 12345678K
  if (!/^\d{7,8}[0-9Kk]$/.test(rut)) {
    return false;
  }

  const cuerpo = rut.slice(0, -1);
  const dv = rut.slice(-1).toLowerCase();

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'k' : (11 - resto).toString();

  return dv === dvCalculado;
}

// Función simple para validar email (solo dominios permitidos)
function validarEmail(email) {
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  const partes = email.split('@');

  if (partes.length !== 2) return false;

  const dominio = partes[1];
  return dominiosPermitidos.includes(dominio);
}

// Función simple para validar contraseña (4-10 caracteres)
function validarPassword(password) {
  return password.length >= 4 && password.length <= 10;
}

// ============= 3. FUNCIONES PARA LLENAR SELECTORES =============

// Función para llenar selector de regiones
function llenarRegiones() {
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  if (!selectRegion || !selectComuna) return;

  // Limpiar selectores
  selectRegion.innerHTML = '<option value="">Selecciona una región</option>';
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

  // Agregar regiones
  Object.keys(regionesYcomunas).forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    selectRegion.appendChild(option);
  });

  // Cuando cambie la región, cargar comunas
  selectRegion.addEventListener('change', function() {
    const regionSeleccionada = this.value;
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

    if (regionSeleccionada && regionesYcomunas[regionSeleccionada]) {
      regionesYcomunas[regionSeleccionada].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        selectComuna.appendChild(option);
      });
    }
  });
}

// ============= 3.1 HELPERS DE ALMACENAMIENTO (compatibilidad) =============
// Funciones pequeñas y didácticas para guardar/leer usuarios en ambas claves
// Usamos ambas claves ('usuarios' y 'users') y guardamos el usuario "actual" en
// 'usuarioActual' y 'currentUser' para mantener compatibilidad con todos los scripts.
function saveUserForAll(user) {
  // Preparar objeto para 'usuarios' (más orientado a formulario en español)
  const usuarioParaUsuarios = {
    nombre: user.nombre || user.fullName || user.nombreCompleto || user.username || '',
    email: user.email,
    password: user.password,
    rut: user.rut || '',
    telefono: user.telefono || user.phone || '',
    region: user.region || '',
    comuna: user.comuna || '',
    mascota: user.mascota || {},
    fechaRegistro: user.fechaRegistro || new Date().toISOString(),
    esAdmin: !!(user.esAdmin || user.isAdmin || (user.email && user.email.includes('@admin.cl')))
  };

  // Guardar/actualizar en 'usuarios'
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existe = usuarios.find(u => u.email === usuarioParaUsuarios.email);
  if (existe) {
    // actualizar
    const actualizado = usuarios.map(u => u.email === usuarioParaUsuarios.email ? Object.assign(u, usuarioParaUsuarios) : u);
    localStorage.setItem('usuarios', JSON.stringify(actualizado));
  } else {
    usuarios.push(usuarioParaUsuarios);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Preparar objeto para 'users' (estructura simple en inglés)
  const usuarioParaUsers = {
    username: user.username || (user.fullName ? user.fullName.split(' ')[0].toLowerCase() : ''),
    fullName: user.fullName || user.nombre || user.nombreCompleto || '',
    email: user.email,
    password: user.password,
    isAdmin: !!(user.esAdmin || user.isAdmin || (user.email && user.email.includes('@admin.cl'))),
    createdAt: user.fechaRegistro || new Date().toISOString()
  };

  // Guardar/actualizar en 'users'
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existe2 = users.find(u => u.email === usuarioParaUsers.email);
  if (existe2) {
    const actualizado2 = users.map(u => u.email === usuarioParaUsers.email ? Object.assign(u, usuarioParaUsers) : u);
    localStorage.setItem('users', JSON.stringify(actualizado2));
  } else {
    users.push(usuarioParaUsers);
    localStorage.setItem('users', JSON.stringify(users));
  }
}

function loginUserForAll(user) {
  // usuarioActual (español)
  const usuarioActual = {
    nombre: user.nombre || user.fullName || user.nombreCompleto || user.username || '',
    email: user.email,
    esAdmin: !!(user.esAdmin || user.isAdmin || (user.email && user.email.includes('@admin.cl')))
  };
  localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

  // currentUser (inglés)
  const currentUser = {
    username: user.username || (user.fullName ? user.fullName.split(' ')[0].toLowerCase() : ''),
    fullName: user.fullName || user.nombre || user.nombreCompleto || '',
    email: user.email,
    isAdmin: usuarioActual.esAdmin
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// ============= 4. FUNCIONES PARA MOSTRAR MENSAJES =============

// Función simple para mostrar alertas
function mostrarAlerta(tipo, mensaje, contenedorId) {
  console.log(`Mostrando alerta: ${tipo} - ${mensaje} en ${contenedorId}`);
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    console.log('Contenedor encontrado:', contenedor);
    contenedor.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
      if (contenedor) {
        contenedor.innerHTML = '';
        console.log('Alerta limpiada automáticamente');
      }
    }, 4000);
  } else {
    console.error('Contenedor no encontrado:', contenedorId);
  }
}

// ============= 5. CÓDIGO PRINCIPAL - CUANDO LA PÁGINA ESTÉ LISTA =============

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado, inicializando...');

  // Llenar selectores de región y comuna si existen
  llenarRegiones();

  // ============= FORMULARIO DE REGISTRO =============
  const formularioRegistro = document.getElementById('registroForm');

  if (formularioRegistro) {
    console.log('Formulario de registro encontrado');

    // Manejar envío del formulario
    formularioRegistro.addEventListener('submit', function(e) {
      e.preventDefault(); // Evitar que se envíe el formulario

      console.log('Formulario enviado');

      // Obtener datos del formulario
      const rut = document.getElementById('rut').value.trim();
      const nombre = document.getElementById('nombreCompleto').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const region = document.getElementById('region').value;
      const comuna = document.getElementById('comuna').value;
      const telefono = document.getElementById('telefono').value.trim();
      const fechaNacimiento = document.getElementById('fechaNacimiento').value;
      const direccion = document.getElementById('direccion').value.trim();

      console.log('Datos obtenidos:', { rut, nombre, email, password, confirmPassword, region, comuna, telefono, fechaNacimiento, direccion });

      // Variables para datos de mascota
      const nombreMascota = document.getElementById('nombreMascota')?.value.trim() || '';
      const tipoMascota = document.getElementById('tipoMascota')?.value || '';
      const edadMascota = document.getElementById('edadMascota')?.value || '';

      // ============= VALIDACIONES =============
      
      // Validar campos obligatorios
      if (!rut || !nombre || !email || !password || !confirmPassword || !region || !comuna || !telefono || !direccion) {
        console.log('Campos obligatorios faltantes');
        mostrarAlerta('danger', 'Todos los campos marcados con * son obligatorios', 'alertaRegistro');
        return;
      }      console.log('Campos obligatorios OK');

      // Validar RUT
      if (!validarRUT(rut)) {
        console.log('RUT inválido');
        mostrarAlerta('danger', 'El RUT ingresado no es válido', 'alertaRegistro');
        return;
      }

      console.log('RUT OK');

      // Validar email
      if (!validarEmail(email)) {
        console.log('Email inválido');
        mostrarAlerta('danger', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'alertaRegistro');
        return;
      }

      console.log('Email OK');

      // Validar contraseña
      if (!validarPassword(password)) {
        console.log('Contraseña inválida');
        mostrarAlerta('danger', 'La contraseña debe tener entre 4 y 10 caracteres', 'alertaRegistro');
        return;
      }

      console.log('Contraseña OK');

      // Validar confirmación de contraseña
      if (password !== confirmPassword) {
        console.log('Contraseñas no coinciden');
        mostrarAlerta('danger', 'Las contraseñas no coinciden', 'alertaRegistro');
        return;
      }

      console.log('Confirmación OK');

      // Validar teléfono (formato simple)
      if (telefono && !/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(telefono)) {
        console.log('Teléfono inválido');
        mostrarAlerta('danger', 'El teléfono debe tener un formato válido (ej: +56 9 1234 5678)', 'alertaRegistro');
        return;
      }

      console.log('Teléfono OK');

      // ============= GUARDAR DATOS =============

      // Crear objeto con datos del usuario
      const nuevoUsuario = {
        rut: rut,
        nombre: nombre,
        email: email,
        password: password,
        region: region,
        comuna: comuna,
        telefono: telefono,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        tipoUsuario: 'cliente', // Para registro en tienda, es cliente
        mascota: {
          nombre: nombreMascota,
          tipo: tipoMascota,
          edad: edadMascota
        },
        fechaRegistro: new Date().toISOString()
      };

      console.log('Usuario creado:', nuevoUsuario);

      // Obtener usuarios existentes del localStorage
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Verificar si el email ya está registrado
      const emailExiste = usuariosExistentes.find(usuario => usuario.email === email);
      if (emailExiste) {
        console.log('Email ya existe');
        mostrarAlerta('danger', 'Ya existe un usuario registrado con este email', 'alertaRegistro');
        return;
      }

      console.log('Email único, guardando...');

      // Agregar nuevo usuario y sincronizar con otras estructuras
      saveUserForAll(nuevoUsuario);

      console.log('Usuario guardado, mostrando éxito');

      // Mostrar mensaje de éxito y limpiar formulario
      mostrarAlerta('success', '¡Registro exitoso! Ahora puedes iniciar sesión', 'alertaRegistro');
      formularioRegistro.reset();

      // Redirigir al login (breve espera para que el usuario vea el mensaje)
      setTimeout(() => {
        console.log('Redirigiendo a login...');
        window.location.href = 'iniciar-sesion.html';
      }, 1500);
    });
  }

  // ============= FORMULARIO DE CONTACTO =============
  const formularioContacto = document.getElementById('contactForm');

  if (formularioContacto) {
    console.log('Formulario de contacto encontrado');

    formularioContacto.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const comentario = document.getElementById('contactMessage').value.trim();

      // Validar campos obligatorios
      if (!nombre || !email || !comentario) {
        mostrarAlerta('danger', 'Todos los campos marcados con * son obligatorios', 'contactAlert');
        return;
      }

      // Validar nombre max 100
      if (nombre.length > 100) {
        mostrarAlerta('danger', 'El nombre no puede exceder 100 caracteres', 'contactAlert');
        return;
      }

      // Validar email
      if (!validarEmail(email)) {
        mostrarAlerta('danger', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'contactAlert');
        return;
      }

      // Validar comentario max 500
      if (comentario.length > 500) {
        mostrarAlerta('danger', 'El comentario no puede exceder 500 caracteres', 'contactAlert');
        return;
      }

      // Simular envío (en producción, enviar a servidor)
      mostrarAlerta('success', 'Mensaje enviado correctamente. Te contactaremos pronto.', 'contactAlert');
      formularioContacto.reset();
    });
  }

  // ============= FORMULARIO DE LOGIN =============
  const formularioLogin = document.getElementById('loginForm');

  if (formularioLogin) {
    console.log('Formulario de login encontrado');

    formularioLogin.addEventListener('submit', function(e) {
      e.preventDefault();

      const usuario = document.getElementById('loginId').value.trim();
      const password = document.getElementById('loginPassword').value;

      // Validar campos
      if (!usuario || !password) {
        mostrarAlerta('danger', 'Ingresa usuario/email y contraseña', 'loginAlert');
        return;
      }

      // Obtener usuarios del localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

      // Buscar usuario por email
      const usuarioEncontrado = usuarios.find(u => u.email === usuario);

      if (!usuarioEncontrado) {
        mostrarAlerta('danger', 'Usuario no encontrado', 'loginAlert');
        return;
      }

      if (usuarioEncontrado.password !== password) {
        mostrarAlerta('danger', 'Contraseña incorrecta', 'loginAlert');
        return;
      }

      // Login exitoso: guardar en ambas claves y redirigir
      loginUserForAll(usuarioEncontrado);

      const esAdmin = usuarioEncontrado.email.includes('@admin.cl') || usuarioEncontrado.tipoUsuario === 'administrador';
      const esVendedor = usuarioEncontrado.tipoUsuario === 'vendedor';
      mostrarAlerta('success', 'Inicio de sesión correcto. Redirigiendo...', 'loginAlert');
      setTimeout(() => {
        if (esAdmin) window.location.href = '../admin/panel-administrador.html';
        else if (esVendedor) window.location.href = '../admin/panel-vendedor.html'; // Asumir que existe
        else window.location.href = 'panel-usuario.html';
      }, 900);
    });
  }
});

console.log('main.js cargado correctamente');

// Crear usuario admin por defecto
function crearUsuarioAdmin() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const adminExiste = usuarios.find(u => u.email === 'admin@admin.cl');
  if (!adminExiste) {
    const usuarioAdmin = {
      rut: '12345678-9',
      nombre: 'Administrador',
      apellidos: 'Sistema',
      email: 'admin@admin.cl',
      password: 'admin123',
      fechaNacimiento: '',
      tipoUsuario: 'administrador',
      region: 'Región Metropolitana',
      comuna: 'Santiago',
      direccion: 'Dirección Admin',
      fechaRegistro: new Date().toISOString()
    };
    usuarios.push(usuarioAdmin);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario admin creado: admin@admin.cl / admin123');
  }
}

// Llamar al cargar
crearUsuarioAdmin();