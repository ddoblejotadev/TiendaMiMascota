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

// Función simple para validar email
function validarEmail(email) {
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com', 'admin.cl'];
  const partes = email.split('@');
  
  if (partes.length !== 2) return false;
  
  const dominio = partes[1];
  return dominiosPermitidos.includes(dominio);
}

// Función simple para validar contraseña
function validarPassword(password) {
  // Mínimo 6 caracteres, al menos 1 número y 1 mayúscula
  const tieneNumero = /\d/.test(password);
  const tieneMayuscula = /[A-Z]/.test(password);
  
  return password.length >= 6 && tieneNumero && tieneMayuscula;
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

// ============= 4. FUNCIONES PARA MOSTRAR MENSAJES =============

// Función simple para mostrar alertas
function mostrarAlerta(tipo, mensaje, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `<div class="alert alert-${tipo}">${mensaje}</div>`;
    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
      contenedor.innerHTML = '';
    }, 4000);
  }
}

// ============= 5. CÓDIGO PRINCIPAL - CUANDO LA PÁGINA ESTÉ LISTA =============

document.addEventListener('DOMContentLoaded', function() {
  
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
      
      // Variables para datos de mascota
      const nombreMascota = document.getElementById('nombreMascota')?.value.trim() || '';
      const tipoMascota = document.getElementById('tipoMascota')?.value || '';
      const edadMascota = document.getElementById('edadMascota')?.value || '';
      
      // ============= VALIDACIONES =============
      
      // Validar campos obligatorios
      if (!rut || !nombre || !email || !password || !confirmPassword || !region || !comuna || !telefono) {
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
        mostrarAlerta('danger', 'Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com o @admin.cl', 'alertaRegistro');
        return;
      }
      
      // Validar contraseña
      if (!validarPassword(password)) {
        mostrarAlerta('danger', 'La contraseña debe tener mínimo 6 caracteres, 1 número y 1 mayúscula', 'alertaRegistro');
        return;
      }
      
      // Validar confirmación de contraseña
      if (password !== confirmPassword) {
        mostrarAlerta('danger', 'Las contraseñas no coinciden', 'alertaRegistro');
        return;
      }
      
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
        mascota: {
          nombre: nombreMascota,
          tipo: tipoMascota,
          edad: edadMascota
        },
        fechaRegistro: new Date().toISOString()
      };
      
      // Obtener usuarios existentes del localStorage
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Verificar si el email ya está registrado
      const emailExiste = usuariosExistentes.find(usuario => usuario.email === email);
      if (emailExiste) {
        mostrarAlerta('danger', 'Ya existe un usuario registrado con este email', 'alertaRegistro');
        return;
      }
      
      // Agregar nuevo usuario
      usuariosExistentes.push(nuevoUsuario);
      
      // Guardar en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
      
      // Mostrar mensaje de éxito
      mostrarAlerta('success', '¡Registro exitoso! Ahora puedes iniciar sesión', 'alertaRegistro');
      
      // Limpiar formulario
      formularioRegistro.reset();
      
      // Redireccionar al login después de 2 segundos
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
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
      
      // Login exitoso
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
      
      // Verificar si es admin (email termina en @admin.cl)
      if (usuarioEncontrado.email.includes('@admin.cl')) {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    });
  }
  
});

console.log('main.js cargado correctamente');

// Función para mostrar alertas
function mostrarAlerta(tipo, mensaje, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
    setTimeout(() => { contenedor.innerHTML = ''; }, 4000);
  }
}

// ============= CUANDO LA PÁGINA ESTÁ LISTA =============
document.addEventListener('DOMContentLoaded', () => {
  
  // Poblar selectores de región y comuna si existen
  poblarRegiones('region', 'comuna');
  
  // ============= REGISTRO DE CLIENTE Y MASCOTA =============
  const formularioRegistro = document.getElementById('registroForm');
  
  if (formularioRegistro) {
    
    // Validación en tiempo real del RUT
    const campoRUT = document.getElementById('rut');
    if (campoRUT) {
      campoRUT.addEventListener('input', function() {
        // Solo permitir números y K/k
        let valor = this.value.replace(/[^0-9kK]/g, '');
        if (valor.length > 9) valor = valor.slice(0, 9);
        this.value = valor;
        
        // Validar en tiempo real
        if (valor.length >= 8) {
          if (validarRUT(valor)) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
          } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
          }
        }
      });
    }

    // Validación en tiempo real del email
    const campoEmail = document.getElementById('email');
    if (campoEmail) {
      campoEmail.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && validarEmail(email)) {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        } else if (email) {
          this.classList.remove('is-valid');
          this.classList.add('is-invalid');
        }
      });
    }

    // Validación en tiempo real de la contraseña
    const campoPassword = document.getElementById('password');
    const campoConfirmPassword = document.getElementById('confirmPassword');
    
    if (campoPassword) {
      campoPassword.addEventListener('input', function() {
        const password = this.value;
        if (validarPassword(password)) {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        } else if (password) {
          this.classList.remove('is-valid');
          this.classList.add('is-invalid');
        }
        
        // Revalidar confirmación si ya tiene valor
        if (campoConfirmPassword && campoConfirmPassword.value) {
          verificarConfirmacionPassword();
        }
      });
    }

    if (campoConfirmPassword) {
      campoConfirmPassword.addEventListener('input', verificarConfirmacionPassword);
    }

    function verificarConfirmacionPassword() {
      const password = campoPassword.value;
      const confirmPassword = campoConfirmPassword.value;
      
      if (confirmPassword && password === confirmPassword) {
        campoConfirmPassword.classList.remove('is-invalid');
        campoConfirmPassword.classList.add('is-valid');
      } else if (confirmPassword) {
        campoConfirmPassword.classList.remove('is-valid');
        campoConfirmPassword.classList.add('is-invalid');
      }
    }

    formularioRegistro.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar validaciones previas
      formularioRegistro.classList.remove('was-validated');
      
      let esValido = true;
      const errores = [];

      // Validar RUT
      const rut = document.getElementById('rut').value.trim();
      if (!rut) {
        errores.push('El RUT es obligatorio');
        esValido = false;
      } else if (!validarRUT(rut)) {
        errores.push('El RUT ingresado no es válido');
        esValido = false;
      }

      // Validar nombre
      const nombre = document.getElementById('nombreCompleto').value.trim();
      if (!nombre || nombre.length < 3) {
        errores.push('El nombre debe tener al menos 3 caracteres');
        esValido = false;
      }

      // Validar email
      const email = document.getElementById('email').value.trim();
      if (!email) {
        errores.push('El email es obligatorio');
        esValido = false;
      } else if (!validarEmail(email)) {
        errores.push('Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com o @admin.cl');
        esValido = false;
      }

      // Validar contraseña
      const password = document.getElementById('password').value;
      if (!password) {
        errores.push('La contraseña es obligatoria');
        esValido = false;
      } else if (!validarPassword(password)) {
        errores.push('La contraseña debe tener mínimo 6 caracteres, 1 número y 1 mayúscula');
        esValido = false;
      }

      // Validar confirmación de contraseña
      const confirmPassword = document.getElementById('confirmPassword').value;
      if (password !== confirmPassword) {
        errores.push('Las contraseñas no coinciden');
        esValido = false;
      }

      // Validar región y comuna
      const region = document.getElementById('region').value;
      const comuna = document.getElementById('comuna').value;
      if (!region) {
        errores.push('Selecciona una región');
        esValido = false;
      }
      if (!comuna) {
        errores.push('Selecciona una comuna');
        esValido = false;
      }

      // Validar teléfono
      const telefono = document.getElementById('telefono').value.trim();
      if (!telefono) {
        errores.push('El teléfono es obligatorio');
        esValido = false;
      }

      // Mostrar errores o procesar formulario
      if (!esValido) {
        mostrarAlerta('danger', errores.join('<br>'), 'alertaRegistro');
        formularioRegistro.classList.add('was-validated');
        return;
      }

      // Validar formulario HTML5 básico
      if (!formularioRegistro.checkValidity()) {
        formularioRegistro.classList.add('was-validated');
        mostrarAlerta('danger', 'Por favor completa todos los campos obligatorios.', 'alertaRegistro');
        return;
      }

      // Crear objeto con los datos
      const registro = {
        // Datos de la persona
        rut: document.getElementById('rut').value.trim(),
        nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('email').value.trim(),
        
        // Datos de la mascota
        nombreMascota: document.getElementById('nombreMascota').value.trim(),
        tipoMascota: document.getElementById('tipoMascota').value,
        
        // Metadata
        fechaRegistro: new Date().toISOString(),
        id: Date.now() // ID simple para identificar el registro
      };

      // Crear usuario para login
      const usuario = {
        username: registro.nombreCompleto.split(' ')[0].toLowerCase(), // Primer nombre como username
        fullName: registro.nombreCompleto,
        email: registro.email,
        password: document.getElementById('password').value,
        isAdmin: registro.email.includes('@admin.cl') // Si email termina en @admin.cl, es admin
      };

      // Guardar usuario en localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find(u => u.email === usuario.email);
      if (!userExists) {
        users.push(usuario);
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Guardar registro en localStorage
      const registros = JSON.parse(localStorage.getItem('registros') || '[]');
      
      // Verificar si ya existe un registro con ese RUT
      const existe = registros.find(r => r.rut === registro.rut);
      if (existe) {
        mostrarAlerta('warning', 'Ya existe un registro con este RUT. Se actualizarán los datos.', 'alertaRegistro');
        // Actualizar registro existente
        const index = registros.findIndex(r => r.rut === registro.rut);
        registros[index] = registro;
      } else {
        // Agregar nuevo registro
        registros.push(registro);
      }

      localStorage.setItem('registros', JSON.stringify(registros));

      // Mostrar mensaje de éxito
      mostrarAlerta('success', 
        `¡Registro exitoso! ${registro.nombreCompleto} y su mascota ${registro.nombreMascota} han sido registrados.`, 
        'alertaRegistro'
      );

      // Limpiar formulario
      formularioRegistro.reset();
      formularioRegistro.classList.remove('was-validated');
    });
  }

  // ============= FORMULARIO DE REGISTRO ANTIGUO (si existe) =============
  const form = document.getElementById('registerForm');
  if (form) {
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    const alertBox = document.getElementById('formAlert');

    function showAlert(type, message) {
      if (alertBox) {
        alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => { alertBox.innerHTML = ''; }, 4000);
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Usar validación HTML5 primero
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showAlert('danger', 'Por favor corrige los campos obligatorios.');
        return;
      }

      // Validación adicional en JS: coincidir contraseñas
      if (password && confirm && password.value !== confirm.value) {
        confirm.setCustomValidity('no-match');
        const confirmFeedback = document.getElementById('confirmFeedback');
        if (confirmFeedback) {
          confirmFeedback.textContent = 'Las contraseñas no coinciden.';
        }
        form.classList.add('was-validated');
        showAlert('danger', 'Las contraseñas no coinciden.');
        return;
      } else if (confirm) {
        confirm.setCustomValidity('');
      }

      // Si todo OK: guardar usuario simple en localStorage (proyecto demo)
      const user = {
        fullName: document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : '',
        email: document.getElementById('email') ? document.getElementById('email').value.trim() : '',
        username: document.getElementById('username') ? document.getElementById('username').value.trim() : '',
        password: password ? password.value : '',
        phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
        address: document.getElementById('address') ? document.getElementById('address').value.trim() : '',
        city: document.getElementById('city') ? document.getElementById('city').value.trim() : '',
        createdAt: new Date().toISOString()
      };

      // Guardar en localStorage (array 'users')
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // comprobar usuario duplicado básico (por email o username)
      const exists = users.some(u => u.email === user.email || u.username === user.username);
      if (exists) {
        showAlert('danger', 'El email o usuario ya está registrado.');
        return;
      }

      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      showAlert('success', 'Registro exitoso. Puedes continuar.');
      form.reset();
      form.classList.remove('was-validated');
    });
  }

  // ============= FUNCIONES PARA CONTRASEÑA (si existen los elementos) =============
  const pwd = document.getElementById('password');
  if (pwd) {
    // botón mostrar/ocultar
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary btn-sm pwd-toggle';
    btn.textContent = 'Mostrar';
    pwd.after(btn);

    btn.addEventListener('click', () => {
      if (pwd.type === 'password') { 
        pwd.type = 'text'; 
        btn.textContent = 'Ocultar'; 
      } else { 
        pwd.type = 'password'; 
        btn.textContent = 'Mostrar'; 
      }
    });

    // barra de fuerza
    const meterWrap = document.createElement('div');
    meterWrap.className = 'mt-2';
    meterWrap.innerHTML = `
      <div class="progress"><div class="progress-bar" role="progressbar" style="width:0%"></div></div>
      <small class="text-muted d-block mt-1" id="pwdHint"></small>
    `;
    pwd.after(meterWrap);

    pwd.addEventListener('input', () => {
      const val = pwd.value;
      let score = 0;
      if (val.length >= 6) score += 30;
      if (/[A-Z]/.test(val)) score += 20;
      if (/[0-9]/.test(val)) score += 25;
      if (/[\W_]/.test(val)) score += 25;
      score = Math.min(100, score);

      const bar = meterWrap.querySelector('.progress-bar');
      if (bar) {
        bar.style.width = score + '%';
        bar.className = 'progress-bar';
        if (score < 40) bar.classList.add('bg-danger');
        else if (score < 70) bar.classList.add('bg-warning');
        else bar.classList.add('bg-success');
      }

      const hint = document.getElementById('pwdHint');
      if (hint) {
        if (!val) hint.textContent = '';
        else if (score < 40) hint.textContent = 'Contraseña débil';
        else if (score < 70) hint.textContent = 'Contraseña moderada';
        else hint.textContent = 'Contraseña fuerte';
      }
    });

    // validación en tiempo real para algunos campos
    ['fullName','email','username','phone'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        if (el.checkValidity()) { 
          el.classList.remove('is-invalid'); 
          el.classList.add('is-valid'); 
        } else { 
          el.classList.remove('is-valid'); 
          if (el.value) el.classList.add('is-invalid'); 
          else el.classList.remove('is-invalid'); 
        }
      });
    });
  }

  // ============= LÓGICA DE INICIO DE SESIÓN =============
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const formAlert2 = document.getElementById('loginAlert');

    function showLoginAlert(type, msg) {
      if (formAlert2) {
        formAlert2.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
        setTimeout(() => { formAlert2.innerHTML = ''; }, 3500);
      }
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginIdElement = document.getElementById('loginId');
      const loginPasswordElement = document.getElementById('loginPassword');
      
      if (!loginIdElement || !loginPasswordElement) return;
      
      const idVal = loginIdElement.value.trim();
      const pwd = loginPasswordElement.value;

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === idVal || u.email === idVal);
      if (!user) {
        showLoginAlert('danger', 'Usuario o email no registrado.');
        return;
      }
      if (user.password !== pwd) {
        showLoginAlert('danger', 'Contraseña incorrecta.');
        return;
      }

      // guardamos usuario actual (sin contraseña por seguridad mínima)
      const current = { 
        username: user.username, 
        fullName: user.fullName, 
        email: user.email,
        isAdmin: user.isAdmin || user.email?.includes('@admin.cl') // Verificar si es admin
      };
      localStorage.setItem('currentUser', JSON.stringify(current));

      showLoginAlert('success', 'Inicio de sesión correcto. Redirigiendo...');
      
      // Redirigir según tipo de usuario
      setTimeout(() => { 
        if (current.isAdmin || current.email?.includes('@admin.cl')) {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 900);
    });
  }
});