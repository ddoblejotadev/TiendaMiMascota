// ========================================
// FORMULARIO DE CONTACTO - CÓDIGO PARA PRINCIPIANTES
// ========================================

// FUNCIÓN 1: Validar email simple
function validarEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// FUNCIÓN 2: Validar teléfono chileno simple
function validarTelefono(telefono) {
  // Aceptar formato: +56912345678 o 912345678 o 9-1234-5678
  var regex = /^(\+?56)?[9][0-9]{8}$|^[9][0-9-\s]{8,12}$/;
  var soloNumeros = telefono.replace(/[\s-]/g, '');
  return regex.test(soloNumeros) && soloNumeros.length >= 9;
}

// FUNCIÓN 3: Validar formulario completo
function validarFormulario() {
  var esValido = true;
  var errores = [];
  
  // Obtener valores del formulario
  var nombre = document.getElementById('nombre').value.trim();
  var email = document.getElementById('email').value.trim();
  var telefono = document.getElementById('telefono').value.trim();
  var asunto = document.getElementById('asunto').value.trim();
  var mensaje = document.getElementById('mensaje').value.trim();
  
  // Limpiar errores anteriores
  limpiarErrores();
  
  // Validar nombre
  if (nombre === '') {
    mostrarError('nombre', 'El nombre es obligatorio');
    errores.push('Nombre vacío');
    esValido = false;
  } else if (nombre.length < 2) {
    mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres');
    errores.push('Nombre muy corto');
    esValido = false;
  } else if (nombre.length > 100) {
    mostrarError('nombre', 'El nombre no puede tener más de 100 caracteres');
    errores.push('Nombre muy largo');
    esValido = false;
  }
  
  // Validar email
  if (email === '') {
    mostrarError('email', 'El email es obligatorio');
    errores.push('Email vacío');
    esValido = false;
  } else if (!validarEmail(email)) {
    mostrarError('email', 'Por favor ingresa un email válido');
    errores.push('Email inválido');
    esValido = false;
  }
  
  // Validar teléfono (opcional)
  if (telefono !== '' && !validarTelefono(telefono)) {
    mostrarError('telefono', 'Por favor ingresa un teléfono chileno válido');
    errores.push('Teléfono inválido');
    esValido = false;
  }
  
  // Validar asunto
  if (asunto === '') {
    mostrarError('asunto', 'El asunto es obligatorio');
    errores.push('Asunto vacío');
    esValido = false;
  } else if (asunto.length > 200) {
    mostrarError('asunto', 'El asunto no puede tener más de 200 caracteres');
    errores.push('Asunto muy largo');
    esValido = false;
  }
  
  // Validar mensaje
  if (mensaje === '') {
    mostrarError('mensaje', 'El mensaje es obligatorio');
    errores.push('Mensaje vacío');
    esValido = false;
  } else if (mensaje.length < 10) {
    mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
    errores.push('Mensaje muy corto');
    esValido = false;
  } else if (mensaje.length > 1000) {
    mostrarError('mensaje', 'El mensaje no puede tener más de 1000 caracteres');
    errores.push('Mensaje muy largo');
    esValido = false;
  }
  
  return esValido;
}

// FUNCIÓN 4: Mostrar error en campo específico
function mostrarError(campo, mensaje) {
  var elemento = document.getElementById(campo);
  if (elemento) {
    elemento.classList.add('is-invalid');
    
    // Buscar o crear div de error
    var errorDiv = elemento.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'invalid-feedback';
      elemento.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = mensaje;
  }
}

// FUNCIÓN 5: Limpiar todos los errores
function limpiarErrores() {
  var campos = ['nombre', 'email', 'telefono', 'asunto', 'mensaje'];
  
  for (var i = 0; i < campos.length; i++) {
    var elemento = document.getElementById(campos[i]);
    if (elemento) {
      elemento.classList.remove('is-invalid');
      var errorDiv = elemento.parentNode.querySelector('.invalid-feedback');
      if (errorDiv) {
        errorDiv.remove();
      }
    }
  }
}

// FUNCIÓN 6: Enviar formulario
function enviarFormulario(event) {
  event.preventDefault(); // Evitar que se envíe el formulario normalmente
  
  if (!validarFormulario()) {
    return false;
  }
  
  // Obtener datos del formulario
  var datos = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    asunto: document.getElementById('asunto').value.trim(),
    mensaje: document.getElementById('mensaje').value.trim(),
    fecha: new Date().toISOString().split('T')[0] // Fecha actual
  };
  
  // Simular envío (guardar en localStorage para demostración)
  guardarConsulta(datos);
  
  // Mostrar mensaje de éxito
  mostrarMensajeExito();
  
  // Limpiar formulario
  document.getElementById('formularioContacto').reset();
  limpiarErrores();
  
  return false;
}

// FUNCIÓN 7: Guardar consulta en localStorage
function guardarConsulta(datos) {
  var consultas = JSON.parse(localStorage.getItem('consultas') || '[]');
  
  // Agregar ID único
  datos.id = consultas.length + 1;
  
  consultas.push(datos);
  localStorage.setItem('consultas', JSON.stringify(consultas));
}

// FUNCIÓN 8: Mostrar mensaje de éxito
function mostrarMensajeExito() {
  var alerta = document.createElement('div');
  alerta.className = 'alert alert-success alert-dismissible fade show';
  alerta.innerHTML = `
    <strong>✅ Mensaje enviado exitosamente!</strong> 
    Nos pondremos en contacto contigo pronto.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  var formulario = document.getElementById('formularioContacto');
  formulario.parentNode.insertBefore(alerta, formulario);
  
  // Auto-ocultar después de 5 segundos
  setTimeout(function() {
    if (alerta.parentNode) {
      alerta.remove();
    }
  }, 5000);
}

// FUNCIÓN 9: Actualizar contador de caracteres para el mensaje
function actualizarContador() {
  var mensaje = document.getElementById('mensaje');
  var contador = document.getElementById('contadorCaracteres');
  
  if (mensaje && contador) {
    var actual = mensaje.value.length;
    var maximo = 1000;
    contador.textContent = actual + '/' + maximo;
    
    if (actual > maximo * 0.9) {
      contador.style.color = '#dc3545'; // Rojo si está cerca del límite
    } else {
      contador.style.color = '#6c757d'; // Gris normal
    }
  }
}

// FUNCIÓN 10: Inicializar formulario de contacto
function inicializarContacto() {
  var formulario = document.getElementById('formularioContacto');
  if (formulario) {
    formulario.addEventListener('submit', enviarFormulario);
  }
  
  // Event listener para el contador de caracteres
  var mensaje = document.getElementById('mensaje');
  if (mensaje) {
    mensaje.addEventListener('input', actualizarContador);
    actualizarContador(); // Inicializar contador
  }
  
  // Event listeners para validación en tiempo real
  var campos = ['nombre', 'email', 'telefono', 'asunto'];
  for (var i = 0; i < campos.length; i++) {
    var campo = document.getElementById(campos[i]);
    if (campo) {
      campo.addEventListener('blur', function() {
        // Validar solo este campo cuando pierde el foco
        if (this.value.trim() !== '') {
          validarCampoIndividual(this);
        }
      });
    }
  }
}

// FUNCIÓN 11: Validar campo individual
function validarCampoIndividual(elemento) {
  var campo = elemento.id;
  var valor = elemento.value.trim();
  
  // Limpiar error anterior
  elemento.classList.remove('is-invalid');
  var errorDiv = elemento.parentNode.querySelector('.invalid-feedback');
  if (errorDiv) {
    errorDiv.remove();
  }
  
  var esValido = true;
  
  switch (campo) {
    case 'nombre':
      if (valor !== '' && valor.length < 2) {
        mostrarError(campo, 'El nombre debe tener al menos 2 caracteres');
        esValido = false;
      }
      break;
    case 'email':
      if (valor !== '' && !validarEmail(valor)) {
        mostrarError(campo, 'Por favor ingresa un email válido');
        esValido = false;
      }
      break;
    case 'telefono':
      if (valor !== '' && !validarTelefono(valor)) {
        mostrarError(campo, 'Por favor ingresa un teléfono chileno válido');
        esValido = false;
      }
      break;
    case 'asunto':
      if (valor !== '' && valor.length > 200) {
        mostrarError(campo, 'El asunto no puede tener más de 200 caracteres');
        esValido = false;
      }
      break;
  }
  
  return esValido;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarContacto);
