# 📚 Guía de Funciones Simplificadas - Para Principiantes

## 🎯 Objetivo
Esta guía explica paso a paso cómo funcionan las nuevas funciones JavaScript simplificadas del proyecto Tienda MiMascota.

## 📝 1. Validaciones Simples

### ✉️ Validar Email
```javascript
function validarEmail(email) {
  // Lista de dominios permitidos (solo estos 3)
  const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
  
  // Verificar que tenga @ (símbolo de arroba)
  if (!email.includes('@')) {
    return false; // No es válido
  }
  
  // Obtener la parte después del @ (el dominio)
  const dominio = email.split('@')[1];
  
  // Verificar si el dominio está en nuestra lista
  return dominiosPermitidos.includes(dominio);
}

// Ejemplos de uso:
console.log(validarEmail('juan@duoc.cl'));        // true ✅
console.log(validarEmail('maria@gmail.com'));     // true ✅
console.log(validarEmail('jose@yahoo.com'));      // false ❌
```

### 🔒 Validar Contraseña
```javascript
function validarPassword(password) {
  // Debe tener entre 4 y 10 caracteres
  return password.length >= 4 && password.length <= 10;
}

// Ejemplos de uso:
console.log(validarPassword('123'));       // false (muy corta)
console.log(validarPassword('1234'));      // true ✅
console.log(validarPassword('password123')); // true ✅
console.log(validarPassword('contraseñamuylarguaaa')); // false (muy larga)
```

### 🆔 Validar RUT (Simplificado)
```javascript
function validarRUT(rut) {
  // Verificar longitud (entre 8 y 12 caracteres)
  if (rut.length < 8 || rut.length > 12) {
    return false;
  }
  
  // Obtener el último carácter (dígito verificador)
  const ultimoCaracter = rut.slice(-1).toLowerCase();
  
  // Debe terminar en número (0-9) o en 'k'
  if (ultimoCaracter !== 'k' && isNaN(ultimoCaracter)) {
    return false;
  }
  
  return true;
}

// Ejemplos de uso:
console.log(validarRUT('12345678K'));    // true ✅
console.log(validarRUT('123456789'));    // true ✅
console.log(validarRUT('123'));          // false (muy corto)
console.log(validarRUT('12345678X'));    // false (termina en X)
```

## 🗂️ 2. Manejo de Datos Simples

### 💾 Guardar Usuario
```javascript
function guardarUsuario(usuario) {
  // Paso 1: Obtener usuarios existentes del navegador
  let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Paso 2: Agregar el nuevo usuario a la lista
  usuarios.push(usuario);
  
  // Paso 3: Guardar la lista actualizada en el navegador
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Ejemplo de uso:
const nuevoUsuario = {
  nombre: 'Juan Pérez',
  email: 'juan@duoc.cl',
  password: '1234'
};
guardarUsuario(nuevoUsuario);
```

### 📖 Obtener Usuarios
```javascript
function obtenerUsuarios() {
  // Obtener del navegador y convertir a array
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

// Ejemplo de uso:
const todosLosUsuarios = obtenerUsuarios();
console.log('Cantidad de usuarios:', todosLosUsuarios.length);
```

### 🔍 Verificar si Email Existe
```javascript
function emailYaExiste(email) {
  const usuarios = obtenerUsuarios();
  
  // Buscar en toda la lista
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === email) {
      return true; // Ya existe
    }
  }
  
  return false; // No existe
}

// Ejemplo de uso:
if (emailYaExiste('juan@duoc.cl')) {
  alert('Este email ya está registrado');
}
```

## 🛒 3. Sistema de Carrito Simple

### ➕ Agregar Producto al Carrito
```javascript
function agregarAlCarrito(idProducto) {
  // Paso 1: Buscar el producto por ID
  let producto = null;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      producto = productos[i];
      break; // Salir del bucle cuando lo encontremos
    }
  }
  
  // Paso 2: Si no existe el producto, salir
  if (!producto) {
    return;
  }
  
  // Paso 3: Verificar si ya está en el carrito
  let productoEnCarrito = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      productoEnCarrito = carrito[i];
      break;
    }
  }
  
  // Paso 4: Si ya está, aumentar cantidad; si no, agregarlo
  if (productoEnCarrito) {
    productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  // Paso 5: Guardar en el navegador
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Paso 6: Actualizar la vista
  actualizarContadorCarrito();
  
  // Paso 7: Informar al usuario
  alert('Producto agregado: ' + producto.nombre);
}
```

### 🔢 Actualizar Contador del Carrito
```javascript
function actualizarContadorCarrito() {
  // Buscar el elemento donde mostrar el número
  const contador = document.getElementById('cantidadCarrito');
  
  if (contador) {
    // Contar todos los productos en el carrito
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total = total + carrito[i].cantidad;
    }
    
    // Mostrar el número en la página
    contador.textContent = total;
  }
}
```

## 📋 4. Formularios Simples

### 📝 Manejar Formulario de Registro
```javascript
// Buscar el formulario en la página
const formRegistro = document.getElementById('registroForm');

if (formRegistro) {
  // Cuando se envíe el formulario
  formRegistro.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe de verdad
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombreCompleto').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Validar campos obligatorios
    if (!nombre || !email || !password) {
      mostrarMensaje('error', 'Todos los campos son obligatorios', 'alertaRegistro');
      return; // Salir si hay error
    }
    
    // Validar email
    if (!validarEmail(email)) {
      mostrarMensaje('error', 'El email no es válido', 'alertaRegistro');
      return;
    }
    
    // Si todo está bien, crear usuario
    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      password: password,
      fechaRegistro: new Date().toISOString()
    };
    
    // Guardar usuario
    guardarUsuario(nuevoUsuario);
    
    // Mostrar mensaje de éxito
    mostrarMensaje('success', '¡Usuario registrado!', 'alertaRegistro');
    
    // Limpiar formulario
    formRegistro.reset();
  });
}
```

## 💬 5. Mostrar Mensajes al Usuario

### ✅❌ Función Simple para Mensajes
```javascript
function mostrarMensaje(tipo, mensaje, contenedorId) {
  // Buscar dónde mostrar el mensaje
  const contenedor = document.getElementById(contenedorId);
  
  if (contenedor) {
    // Elegir color según el tipo
    if (tipo === 'success') {
      contenedor.innerHTML = `<div style="color: green; padding: 10px; border: 1px solid green; background: #d4edda; margin: 10px 0;">${mensaje}</div>`;
    } else {
      contenedor.innerHTML = `<div style="color: red; padding: 10px; border: 1px solid red; background: #f8d7da; margin: 10px 0;">${mensaje}</div>`;
    }
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(function() {
      contenedor.innerHTML = '';
    }, 3000);
  }
}

// Ejemplos de uso:
mostrarMensaje('success', '¡Guardado correctamente!', 'mensaje');
mostrarMensaje('error', 'Hubo un error', 'mensaje');
```

## 🎯 6. Consejos para Principiantes

### ✅ Buenas Prácticas
1. **Nombres claros**: `guardarUsuario()` en vez de `saveUsr()`
2. **Comentarios útiles**: Explicar qué hace cada paso
3. **Funciones cortas**: Una función = una tarea
4. **Validar siempre**: Verificar que los datos sean correctos
5. **Mensajes claros**: Decir al usuario qué pasó

### 🔍 Debugging Simple
```javascript
// Usar console.log para ver qué está pasando
function validarEmail(email) {
  console.log('Validando email:', email); // Ver qué email llegó
  
  if (!email.includes('@')) {
    console.log('Error: No tiene @'); // Ver por qué falló
    return false;
  }
  
  const dominio = email.split('@')[1];
  console.log('Dominio extraído:', dominio); // Ver el dominio
  
  return dominiosPermitidos.includes(dominio);
}
```

### 📚 Pasos para Entender el Código
1. **Leer los comentarios** - Están en español y explican cada paso
2. **Probar en partes** - Ejecutar funciones individualmente
3. **Usar console.log** - Ver qué valores tienen las variables
4. **Cambiar valores** - Probar con diferentes datos
5. **Preguntar** - Si no entiendes algo, pregunta

---

**🎓 Recuerda:** Este código está diseñado para aprender. Es simple, claro y funcional. ¡Perfecto para empezar!
