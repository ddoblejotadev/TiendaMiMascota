// ===========================================
// FUNCIONES PRINCIPALES - TIENDA MIMASCOTA
// Código simple para principiantes
// ===========================================

// Lista de regiones y comunas para los formularios
const regionesYcomunas = {
  "Región Metropolitana": ["Santiago", "Las Condes", "Providencia", "Maipú", "Puente Alto", "La Florida"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"],
  "Región de La Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"]
};

// ===========================================
// FUNCIONES PARA VALIDAR DATOS
// ===========================================

// Función para validar RUT (versión simple)
function validarRUT(rut) {
  // Quitar puntos y guión si los tiene
  rut = rut.replace(/\./g, '').replace(/-/g, '');

  // El RUT debe tener 8 o 9 dígitos + dígito verificador
  if (rut.length < 8 || rut.length > 9) {
    return false;
  }

  // Separar el cuerpo del dígito verificador
  const cuerpo = rut.slice(0, -1);
  const dvIngresado = rut.slice(-1).toLowerCase();

  // Calcular dígito verificador
  let suma = 0;
  let multiplicador = 2;

  // Recorrer cada dígito del cuerpo
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    const digito = parseInt(cuerpo[i]);
    suma = suma + (digito * multiplicador);
    multiplicador = multiplicador + 1;

    // Si llega a 8, volver a 2
    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  // Calcular el dígito verificador
  const resto = suma % 11;
  let dvCalculado = '';

  if (resto === 0) {
    dvCalculado = '0';
  } else if (resto === 1) {
    dvCalculado = 'k';
  } else {
    dvCalculado = (11 - resto).toString();
  }

  // Comparar dígitos verificadores
  return dvIngresado === dvCalculado;
}

// Función para validar email (solo dominios permitidos)
function validarEmail(email) {
  // Lista de dominios permitidos
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

  // Buscar el símbolo @
  const posicionArroba = email.indexOf('@');

  // Si no hay @ o está al inicio/final, es inválido
  if (posicionArroba <= 0 || posicionArroba === email.length - 1) {
    return false;
  }

  // Obtener el dominio (parte después del @)
  const dominio = email.slice(posicionArroba + 1);

  // Verificar si el dominio está en la lista permitida
  for (let i = 0; i < dominiosPermitidos.length; i++) {
    if (dominiosPermitidos[i] === dominio) {
      return true;
    }
  }

  return false;
}

// Función para validar contraseña
function validarPassword(password) {
  // La contraseña debe tener entre 4 y 10 caracteres
  if (password.length >= 4 && password.length <= 10) {
    return true;
  }
  return false;
}

// ===========================================
// FUNCIONES PARA LLENAR FORMULARIOS
// ===========================================

// Función para llenar el selector de regiones
function llenarRegiones() {
  // Buscar los elementos select en la página
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  // Si no existen, salir de la función
  if (!selectRegion || !selectComuna) {
    return;
  }

  // Limpiar las opciones existentes
  selectRegion.innerHTML = '<option value="">Selecciona una región</option>';
  selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

  // Obtener todas las regiones
  const nombresRegiones = Object.keys(regionesYcomunas);

  // Agregar cada región al selector
  for (let i = 0; i < nombresRegiones.length; i++) {
    const region = nombresRegiones[i];

    // Crear una nueva opción
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;

    // Agregar la opción al selector
    selectRegion.appendChild(option);
  }

  // Cuando el usuario cambie la región, cargar las comunas
  selectRegion.addEventListener('change', function() {
    const regionSeleccionada = selectRegion.value;

    // Limpiar comunas
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';

    // Si se seleccionó una región, cargar sus comunas
    if (regionSeleccionada && regionesYcomunas[regionSeleccionada]) {
      const comunas = regionesYcomunas[regionSeleccionada];

      // Agregar cada comuna
      for (let i = 0; i < comunas.length; i++) {
        const comuna = comunas[i];

        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;

        selectComuna.appendChild(option);
      }
    }
  });
}

// ===========================================
// FUNCIONES PARA GUARDAR Y OBTENER USUARIOS
// ===========================================

// Función para guardar un usuario en el navegador
function guardarUsuario(usuario) {
  // Obtener la lista de usuarios guardados
  const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');

  // Agregar el nuevo usuario a la lista
  usuariosGuardados.push(usuario);

  // Guardar la lista actualizada
  localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
}

// Función para obtener todos los usuarios guardados
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

// Función para verificar si un email ya está registrado
function emailYaExiste(email) {
  const usuarios = obtenerUsuarios();

  // Buscar si existe un usuario con este email
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return true; // Ya existe
    }
  }

  return false; // No existe
}

// Función para iniciar sesión de un usuario
function iniciarSesionUsuario(email, password) {
  const usuarios = obtenerUsuarios();

  // Buscar el usuario por email
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];

    if (usuario.email === email && usuario.password === password) {
      // Usuario encontrado, guardar como usuario actual
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      return usuario;
    }
  }

  return null; // Usuario no encontrado
}

// ===========================================
// FUNCIONES PARA MOSTRAR MENSAJES
// ===========================================

// Función para mostrar un mensaje de alerta
function mostrarAlerta(tipo, mensaje, contenedorId) {
  // Buscar el contenedor donde mostrar el mensaje
  const contenedor = document.getElementById(contenedorId);

  if (contenedor) {
    // Crear el mensaje HTML
    contenedor.innerHTML = `<div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;

    // Hacer que el mensaje desaparezca después de 4 segundos
    setTimeout(function() {
      if (contenedor) {
        contenedor.innerHTML = '';
      }
    }, 4000);
  }
}

// ===========================================
// CÓDIGO QUE SE EJECUTA CUANDO CARGA LA PÁGINA
// ===========================================

// Esperar a que cargue toda la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada, inicializando funciones...');

  // Llenar selectores de región y comuna si existen
  llenarRegiones();

  // ===========================================
  // FORMULARIO DE REGISTRO
  // ===========================================

  const formularioRegistro = document.getElementById('registroForm');

  if (formularioRegistro) {
    console.log('Formulario de registro encontrado');

    // Cuando se envíe el formulario
    formularioRegistro.addEventListener('submit', function(e) {
      e.preventDefault(); // Evitar que se envíe realmente

      console.log('Procesando registro...');

      // Obtener los datos del formulario
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

      // Datos de mascota (si existen)
      const nombreMascota = document.getElementById('nombreMascota')?.value.trim() || '';
      const tipoMascota = document.getElementById('tipoMascota')?.value || '';
      const edadMascota = document.getElementById('edadMascota')?.value || '';

      // ===========================================
      // VALIDACIONES
      // ===========================================

      // Verificar campos obligatorios
      if (!rut || !nombre || !email || !password || !confirmPassword || !region || !comuna || !telefono || !direccion) {
        mostrarAlerta('danger', 'Todos los campos marcados con * son obligatorios', 'alertaRegistro');
        return;
      }

      // Validar RUT
      if (!validarRUT(rut)) {
        mostrarAlerta('danger', 'El RUT ingresado no es válido', 'alertaRegistro');
        return;
      }

      // Validar email
      if (!validarEmail(email)) {
        mostrarAlerta('danger', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'alertaRegistro');
        return;
      }

      // Validar contraseña
      if (!validarPassword(password)) {
        mostrarAlerta('danger', 'La contraseña debe tener entre 4 y 10 caracteres', 'alertaRegistro');
        return;
      }

      // Verificar que las contraseñas coincidan
      if (password !== confirmPassword) {
        mostrarAlerta('danger', 'Las contraseñas no coinciden', 'alertaRegistro');
        return;
      }

      // Validar teléfono (solo números y algunos símbolos)
      if (telefono) {
        const telefonoLimpio = telefono.replace(/[\s\-\(\)\+]/g, '');
        if (telefonoLimpio.length < 8 || telefonoLimpio.length > 15 || !/^\d+$/.test(telefonoLimpio)) {
          mostrarAlerta('danger', 'El teléfono debe tener un formato válido', 'alertaRegistro');
          return;
        }
      }

      // Verificar si el email ya está registrado
      if (emailYaExiste(email)) {
        mostrarAlerta('danger', 'Ya existe un usuario registrado con este email', 'alertaRegistro');
        return;
      }

      // ===========================================
      // GUARDAR EL USUARIO
      // ===========================================

      // Crear objeto con todos los datos
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
        tipoUsuario: 'cliente',
        mascota: {
          nombre: nombreMascota,
          tipo: tipoMascota,
          edad: edadMascota
        },
        fechaRegistro: new Date().toISOString()
      };

      // Guardar el usuario
      guardarUsuario(nuevoUsuario);

      // Mostrar mensaje de éxito
      mostrarAlerta('success', '¡Registro exitoso! Ahora puedes iniciar sesión', 'alertaRegistro');

      // Limpiar el formulario
      formularioRegistro.reset();

      // Redirigir al login después de 1.5 segundos
      setTimeout(function() {
        window.location.href = 'iniciar-sesion.html';
      }, 1500);
    });
  }

  // ===========================================
  // FORMULARIO DE CONTACTO
  // ===========================================

  const formularioContacto = document.getElementById('contactForm');

  if (formularioContacto) {
    console.log('Formulario de contacto encontrado');

    formularioContacto.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtener datos del formulario
      const nombre = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const comentario = document.getElementById('contactMessage').value.trim();

      // Validar campos obligatorios
      if (!nombre || !email || !comentario) {
        mostrarAlerta('danger', 'Todos los campos marcados con * son obligatorios', 'contactAlert');
        return;
      }

      // Validar longitud del nombre
      if (nombre.length > 100) {
        mostrarAlerta('danger', 'El nombre no puede exceder 100 caracteres', 'contactAlert');
        return;
      }

      // Validar email
      if (!validarEmail(email)) {
        mostrarAlerta('danger', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com', 'contactAlert');
        return;
      }

      // Validar longitud del comentario
      if (comentario.length > 500) {
        mostrarAlerta('danger', 'El comentario no puede exceder 500 caracteres', 'contactAlert');
        return;
      }

      // Simular envío exitoso
      mostrarAlerta('success', 'Mensaje enviado correctamente. Te contactaremos pronto.', 'contactAlert');

      // Limpiar formulario
      formularioContacto.reset();
    });
  }

  // ===========================================
  // FORMULARIO DE LOGIN
  // ===========================================

  const formularioLogin = document.getElementById('loginForm');

  if (formularioLogin) {
    console.log('Formulario de login encontrado');

    formularioLogin.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtener datos del formulario
      const usuario = document.getElementById('loginId').value.trim();
      const password = document.getElementById('loginPassword').value;

      // Validar campos
      if (!usuario || !password) {
        mostrarAlerta('danger', 'Ingresa usuario/email y contraseña', 'loginAlert');
        return;
      }

      // Intentar iniciar sesión
      const usuarioLogueado = iniciarSesionUsuario(usuario, password);

      if (!usuarioLogueado) {
        mostrarAlerta('danger', 'Usuario o contraseña incorrectos', 'loginAlert');
        return;
      }

      // Login exitoso
      mostrarAlerta('success', 'Inicio de sesión correcto. Redirigiendo...', 'loginAlert');

      // Redirigir según el tipo de usuario
      setTimeout(function() {
        const esAdmin = usuarioLogueado.email.includes('@admin.cl') || usuarioLogueado.tipoUsuario === 'administrador';
        const esVendedor = usuarioLogueado.tipoUsuario === 'vendedor';

        if (esAdmin) {
          window.location.href = '../admin/panel-administrador.html';
        } else if (esVendedor) {
          window.location.href = '../admin/panel-vendedor.html';
        } else {
          window.location.href = 'panel-usuario.html';
        }
      }, 900);
    });
  }
});

console.log('Funciones principales cargadas correctamente');

// ===========================================
// CREAR USUARIO ADMIN POR DEFECTO
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
      fechaRegistro: new Date().toISOString()
    };

    // Agregarlo a la lista
    usuarios.push(usuarioAdmin);

    // Guardar en el navegador
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    console.log('Usuario admin creado: admin@admin.cl / admin123');
  }
}

// Crear el usuario admin cuando se carga el archivo
crearUsuarioAdmin();

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