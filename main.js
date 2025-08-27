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
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value.trim(),
      createdAt: new Date().toISOString()
    };

    // Guardar en localStorage (array 'users')
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    showAlert('success', 'Registro exitoso. Puedes continuar.');
    form.reset();
    form.classList.remove('was-validated');
  });
});