// ==============================================
// FORMULARIO DE CONTACTO - PRINCIPIANTE
// ==============================================

// Función para enviar mensaje de contacto
function enviarContacto() {
  var nombre = document.getElementById('nombre').value.trim();
  var email = document.getElementById('email').value.trim();
  var comentario = document.getElementById('comentario').value.trim();
  
  // Validaciones según requerimientos
  if (!nombre) {
    mostrarError('Nombre', 'Campo obligatorio');
    return;
  }
  
  if (nombre.length > 100) {
    mostrarError('Nombre', 'Máximo 100 caracteres');
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
  
  if (!comentario) {
    mostrarError('Comentario', 'Campo obligatorio');
    return;
  }
  
  if (!validarComentario(comentario)) {
    mostrarError('Comentario', 'Máximo 500 caracteres');
    return;
  }
  
  // Crear mensaje de contacto
  var mensaje = {
    id: Date.now(),
    nombre: nombre,
    email: email,
    comentario: comentario,
    fecha: new Date().toISOString()
  };
  
  // Guardar en localStorage (simulando envío)
  var mensajes = localStorage.getItem('mensajes-contacto');
  mensajes = mensajes ? JSON.parse(mensajes) : [];
  mensajes.push(mensaje);
  localStorage.setItem('mensajes-contacto', JSON.stringify(mensajes));
  
  mostrarExito('Mensaje enviado correctamente. Te contactaremos pronto.');
  
  // Limpiar formulario
  document.getElementById('contactoForm').reset();
}
