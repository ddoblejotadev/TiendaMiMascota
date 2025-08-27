document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');
  const alertBox = document.getElementById('formAlert');

  function showAlert(type, message) {
    alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    setTimeout(() => { alertBox.innerHTML = ''; }, 4000);
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
    if (password.value !== confirm.value) {
      confirm.setCustomValidity('no-match');
      document.getElementById('confirmFeedback').textContent = 'Las contraseñas no coinciden.';
      form.classList.add('was-validated');
      showAlert('danger', 'Las contraseñas no coinciden.');
      return;
    } else {
      confirm.setCustomValidity('');
    }

    // Si todo OK: guardar usuario simple en localStorage (proyecto demo)
    const user = {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value, // <-- ahora se guarda la contraseña (demo)
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value.trim(),
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
});

/* --- Nuevas funciones: toggle contraseña, barra de fuerza y validación en vivo --- */
(function() {
  const pwd = document.getElementById('password');
  if (!pwd) return;

  // botón mostrar/ocultar
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn-outline-secondary btn-sm pwd-toggle';
  btn.textContent = 'Mostrar';
  pwd.after(btn);

  btn.addEventListener('click', () => {
    if (pwd.type === 'password') { pwd.type = 'text'; btn.textContent = 'Ocultar'; }
    else { pwd.type = 'password'; btn.textContent = 'Mostrar'; }
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
    bar.style.width = score + '%';
    bar.className = 'progress-bar';
    if (score < 40) bar.classList.add('bg-danger');
    else if (score < 70) bar.classList.add('bg-warning');
    else bar.classList.add('bg-success');

    const hint = document.getElementById('pwdHint');
    if (!val) hint.textContent = '';
    else if (score < 40) hint.textContent = 'Contraseña débil';
    else if (score < 70) hint.textContent = 'Contraseña moderada';
    else hint.textContent = 'Contraseña fuerte';
  });

  // validación en tiempo real para algunos campos
  ['fullName','email','username','phone'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      if (el.checkValidity()) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }
      else { el.classList.remove('is-valid'); if (el.value) el.classList.add('is-invalid'); else el.classList.remove('is-invalid'); }
    });
  });
})();

/* --- Lógica de inicio de sesión (si estamos en login.html) --- */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const formAlert2 = document.getElementById('loginAlert');
  if (!loginForm) return;

  function showLoginAlert(type, msg) {
    if (!formAlert2) return;
    formAlert2.innerHTML = `<div class="alert alert-${type}" role="alert">${msg}</div>`;
    setTimeout(() => { formAlert2.innerHTML = ''; }, 3500);
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('loginId').value.trim();
    const pwd = document.getElementById('loginPassword').value;

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
    const current = { username: user.username, fullName: user.fullName, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(current));

    showLoginAlert('success', 'Inicio de sesión correcto. Redirigiendo...');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
  });
});