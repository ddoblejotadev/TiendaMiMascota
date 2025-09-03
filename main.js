// ============= FUNCIONES AUXILIARES =============

// Datos de regiones y comunas de Chile
const regionesYcomunas = {
  "Región de Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Región de Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Región de Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Región de Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Limache", "Olmué", "Villa Alemana"],
  "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "Santiago", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "Región del Libertador General Bernardo O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Región del Maule": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Región del Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Región del Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel"],
  "Región de La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Región de Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Región de Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// Función para validar RUT chileno (SIN puntos ni guión)
function validarRUT(rut) {
  // El RUT debe venir sin puntos ni guión como lo requiere la evaluación
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

// Función para validar email según los dominios permitidos
function validarEmail(email) {
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  const emailPattern = /^[^\s@]+@([^\s@]+)$/;
  
  const match = email.match(emailPattern);
  if (!match) return false;
  
  const dominio = match[1];
  return dominiosPermitidos.includes(dominio);
}

// Función para validar contraseña (mínimo 6 caracteres, al menos 1 número y 1 mayúscula)
function validarPassword(password) {
  const minLength = 6;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  
  return password.length >= minLength && hasNumber && hasUppercase;
}

// Función para poblar selectores de región y comuna
function poblarRegiones(selectRegion, selectComuna) {
  const regionSelect = document.getElementById(selectRegion);
  const comunaSelect = document.getElementById(selectComuna);
  
  if (!regionSelect || !comunaSelect) return;
  
  // Limpiar selectores
  regionSelect.innerHTML = '<option value="">Selecciona una región</option>';
  comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
  
  // Poblar regiones
  Object.keys(regionesYcomunas).forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });
  
  // Evento para cargar comunas cuando se selecciona una región
  regionSelect.addEventListener('change', function() {
    const regionSeleccionada = this.value;
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    
    if (regionSeleccionada && regionesYcomunas[regionSeleccionada]) {
      regionesYcomunas[regionSeleccionada].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
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
        errores.push('Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com');
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