// ============= FUNCIONES AUXILIARES =============

// Función para validar RUT chileno
function validarRUT(rut) {
  // Limpiar el RUT
  rut = rut.replace(/\./g, '').replace('-', '');
  
  if (rut.length < 8 || rut.length > 9) return false;
  
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

// Función para formatear RUT
function formatearRUT(rut) {
  rut = rut.replace(/\./g, '').replace('-', '');
  if (rut.length > 1) {
    return rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + rut.slice(-1);
  }
  return rut;
}

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
  
  // ============= REGISTRO DE CLIENTE Y MASCOTA =============
  const formularioRegistro = document.getElementById('registroForm');
  
  if (formularioRegistro) {
    // Formatear RUT mientras se escribe
    const campoRUT = document.getElementById('rut');
    if (campoRUT) {
      campoRUT.addEventListener('input', function() {
        let valor = this.value.replace(/[^0-9kK]/g, '');
        if (valor.length > 9) valor = valor.slice(0, 9);
        this.value = formatearRUT(valor);
      });
    }

    formularioRegistro.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validar formulario HTML5
      if (!formularioRegistro.checkValidity()) {
        formularioRegistro.classList.add('was-validated');
        mostrarAlerta('danger', 'Por favor completa todos los campos obligatorios.', 'alertaRegistro');
        return;
      }

      // Validar RUT
      const rut = document.getElementById('rut').value;
      if (!validarRUT(rut)) {
        mostrarAlerta('danger', 'El RUT ingresado no es válido.', 'alertaRegistro');
        document.getElementById('rut').classList.add('is-invalid');
        return;
      } else {
        document.getElementById('rut').classList.remove('is-invalid');
        document.getElementById('rut').classList.add('is-valid');
      }

      // Crear objeto con los datos
      const registro = {
        // Datos de la persona
        rut: document.getElementById('rut').value.trim(),
        nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('email').value.trim(),
        direccion: document.getElementById('direccion').value.trim(),
        
        // Datos de la mascota
        nombreMascota: document.getElementById('nombreMascota').value.trim(),
        tipoMascota: document.getElementById('tipoMascota').value,
        raza: document.getElementById('raza').value.trim(),
        edadMascota: document.getElementById('edadMascota').value,
        observaciones: document.getElementById('observaciones').value.trim(),
        
        // Metadata
        fechaRegistro: new Date().toISOString(),
        id: Date.now() // ID simple para identificar el registro
      };

      // Guardar en localStorage
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