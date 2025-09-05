// ===============================================
// PANEL ADMINISTRADOR - VERSIÓN PRINCIPIANTE
// Código paso a paso fácil de explicar
// ===============================================

// PASO 1: Variables globales simples
var usuariosRegistrados = []; // Lista de todos los usuarios
var productosEnTienda = [];   // Lista de todos los productos

// PASO 2: Cuando la página carga, ejecutar verificaciones
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel admin iniciando...');
    
    // Verificar si hay usuario logueado
    verificarSiEsAdmin();
    
    // Cargar datos de la tienda
    cargarDatos();
    
    // Mostrar datos en pantalla
    mostrarUsuariosEnTabla();
    mostrarProductosEnTabla();
});

// PASO 3: Función para verificar si es administrador
function verificarSiEsAdmin() {
    console.log('Verificando permisos...');
    
    // Obtener usuario actual del navegador
    var usuarioActual = localStorage.getItem('usuarioActual');
    
    // Si no hay usuario, redirigir al login
    if (!usuarioActual) {
        alert('Debes iniciar sesión primero');
        window.location.href = '../user/iniciar-sesion.html';
        return;
    }
    
    // Convertir texto a objeto JavaScript
    var usuario = JSON.parse(usuarioActual);
    
    // Verificar si es admin (email contiene @admin.cl)
    var esAdmin = usuario.email.includes('@admin.cl');
    
    if (!esAdmin) {
        alert('No tienes permisos de administrador');
        window.location.href = '../user/panel-usuario.html';
        return;
    }
    
    // Si llega aquí, es admin - mostrar su nombre
    var nombreElemento = document.getElementById('adminNombre');
    if (nombreElemento) {
        nombreElemento.textContent = 'Bienvenido: ' + usuario.nombre;
    }
    
    console.log('Usuario verificado como admin');
}

// PASO 4: Función para cargar datos del navegador
function cargarDatos() {
    console.log('Cargando datos...');
    
    // Cargar usuarios del localStorage
    var usuariosTexto = localStorage.getItem('usuarios');
    if (usuariosTexto) {
        usuariosRegistrados = JSON.parse(usuariosTexto);
    }
    
    // Cargar productos del localStorage
    var productosTexto = localStorage.getItem('productos');
    if (productosTexto) {
        productosEnTienda = JSON.parse(productosTexto);
    } else {
        // Si no hay productos, crear algunos de ejemplo
        crearProductosDeEjemplo();
    }
    
    console.log('Datos cargados - Usuarios:', usuariosRegistrados.length, 'Productos:', productosEnTienda.length);
}

// PASO 5: Crear productos de ejemplo si no existen
function crearProductosDeEjemplo() {
    console.log('Creando productos de ejemplo...');
    
    productosEnTienda = [
        {
            id: 1,
            codigo: 'COM001',
            nombre: 'Alimento Premium Perros',
            descripcion: 'Alimento balanceado para perros adultos',
            precio: 15990,
            stock: 50,
            stockCritico: 10,
            categoria: 'comida'
        },
        {
            id: 2,
            codigo: 'JUG001',
            nombre: 'Pelota de Goma',
            descripcion: 'Pelota resistente para perros',
            precio: 3990,
            stock: 25,
            stockCritico: 5,
            categoria: 'juguetes'
        },
        {
            id: 3,
            codigo: 'CAM001',
            nombre: 'Cama Suave',
            descripcion: 'Cama cómoda para mascotas',
            precio: 19990,
            stock: 15,
            stockCritico: 3,
            categoria: 'camas'
        }
    ];
    
    // Guardar en el navegador
    localStorage.setItem('productos', JSON.stringify(productosEnTienda));
}

// PASO 6: Mostrar usuarios en la tabla HTML
function mostrarUsuariosEnTabla() {
    console.log('Mostrando usuarios en tabla...');
    
    // Buscar la tabla en el HTML
    var tablaUsuarios = document.getElementById('listaUsuarios');
    
    // Si no existe la tabla, salir
    if (!tablaUsuarios) {
        console.log('No se encontró tabla de usuarios');
        return;
    }
    
    // Crear contenido HTML para cada usuario
    var htmlUsuarios = '';
    
    for (var i = 0; i < usuariosRegistrados.length; i++) {
        var usuario = usuariosRegistrados[i];
        
        htmlUsuarios += '<tr>';
        htmlUsuarios += '  <td>' + usuario.rut + '</td>';
        htmlUsuarios += '  <td>' + usuario.nombre + '</td>';
        htmlUsuarios += '  <td>' + usuario.email + '</td>';
        htmlUsuarios += '  <td>' + (usuario.tipoUsuario || 'cliente') + '</td>';
        htmlUsuarios += '  <td>';
        htmlUsuarios += '    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(\'' + usuario.email + '\')">Eliminar</button>';
        htmlUsuarios += '  </td>';
        htmlUsuarios += '</tr>';
    }
    
    // Poner el HTML en la tabla
    tablaUsuarios.innerHTML = htmlUsuarios;
    
    console.log('Tabla de usuarios actualizada');
}

// PASO 7: Mostrar productos en la tabla HTML
function mostrarProductosEnTabla() {
    console.log('Mostrando productos en tabla...');
    
    // Buscar la tabla en el HTML
    var tablaProductos = document.getElementById('listaProductos');
    
    // Si no existe la tabla, salir
    if (!tablaProductos) {
        console.log('No se encontró tabla de productos');
        return;
    }
    
    // Crear contenido HTML para cada producto
    var htmlProductos = '';
    
    for (var i = 0; i < productosEnTienda.length; i++) {
        var producto = productosEnTienda[i];
        
        // Determinar color del stock (rojo si es crítico)
        var colorStock = '';
        if (producto.stock <= producto.stockCritico) {
            colorStock = 'style="color: red; font-weight: bold;"';
        }
        
        htmlProductos += '<tr>';
        htmlProductos += '  <td>' + producto.codigo + '</td>';
        htmlProductos += '  <td>' + producto.nombre + '</td>';
        htmlProductos += '  <td>$' + producto.precio.toLocaleString() + '</td>';
        htmlProductos += '  <td ' + colorStock + '>' + producto.stock + '</td>';
        htmlProductos += '  <td>' + producto.categoria + '</td>';
        htmlProductos += '  <td>';
        htmlProductos += '    <button class="btn btn-sm btn-primary" onclick="editarProducto(' + producto.id + ')">Editar</button> ';
        htmlProductos += '    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(' + producto.id + ')">Eliminar</button>';
        htmlProductos += '  </td>';
        htmlProductos += '</tr>';
    }
    
    // Poner el HTML en la tabla
    tablaProductos.innerHTML = htmlProductos;
    
    console.log('Tabla de productos actualizada');
}

// PASO 8: Función para eliminar usuario
function eliminarUsuario(emailUsuario) {
    console.log('Eliminando usuario:', emailUsuario);
    
    // Confirmar con el administrador
    var confirmar = confirm('¿Estás seguro de eliminar el usuario: ' + emailUsuario + '?');
    
    if (confirmar) {
        // Crear nueva lista sin el usuario a eliminar
        var nuevaListaUsuarios = [];
        
        for (var i = 0; i < usuariosRegistrados.length; i++) {
            if (usuariosRegistrados[i].email !== emailUsuario) {
                nuevaListaUsuarios.push(usuariosRegistrados[i]);
            }
        }
        
        // Actualizar la lista global
        usuariosRegistrados = nuevaListaUsuarios;
        
        // Guardar en el navegador
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        
        // Actualizar la tabla en pantalla
        mostrarUsuariosEnTabla();
        
        alert('Usuario eliminado correctamente');
        console.log('Usuario eliminado');
    }
}

// PASO 9: Función para eliminar producto
function eliminarProducto(idProducto) {
    console.log('Eliminando producto ID:', idProducto);
    
    // Confirmar con el administrador
    var confirmar = confirm('¿Estás seguro de eliminar este producto?');
    
    if (confirmar) {
        // Crear nueva lista sin el producto a eliminar
        var nuevaListaProductos = [];
        
        for (var i = 0; i < productosEnTienda.length; i++) {
            if (productosEnTienda[i].id !== idProducto) {
                nuevaListaProductos.push(productosEnTienda[i]);
            }
        }
        
        // Actualizar la lista global
        productosEnTienda = nuevaListaProductos;
        
        // Guardar en el navegador
        localStorage.setItem('productos', JSON.stringify(productosEnTienda));
        
        // Actualizar la tabla en pantalla
        mostrarProductosEnTabla();
        
        alert('Producto eliminado correctamente');
        console.log('Producto eliminado');
    }
}

// PASO 10: Función para editar producto (versión simple)
function editarProducto(idProducto) {
    console.log('Editando producto ID:', idProducto);
    
    // Buscar el producto por ID
    var productoEncontrado = null;
    
    for (var i = 0; i < productosEnTienda.length; i++) {
        if (productosEnTienda[i].id === idProducto) {
            productoEncontrado = productosEnTienda[i];
            break;
        }
    }
    
    if (!productoEncontrado) {
        alert('Producto no encontrado');
        return;
    }
    
    // Pedir nuevos datos (versión simple con prompts)
    var nuevoNombre = prompt('Nuevo nombre del producto:', productoEncontrado.nombre);
    if (!nuevoNombre) return;
    
    var nuevoPrecio = prompt('Nuevo precio:', productoEncontrado.precio);
    if (!nuevoPrecio) return;
    
    var nuevoStock = prompt('Nuevo stock:', productoEncontrado.stock);
    if (!nuevoStock) return;
    
    // Validar que sean números
    nuevoPrecio = parseFloat(nuevoPrecio);
    nuevoStock = parseInt(nuevoStock);
    
    if (isNaN(nuevoPrecio) || nuevoPrecio < 0) {
        alert('El precio debe ser un número válido mayor o igual a 0');
        return;
    }
    
    if (isNaN(nuevoStock) || nuevoStock < 0) {
        alert('El stock debe ser un número entero mayor o igual a 0');
        return;
    }
    
    // Actualizar el producto
    productoEncontrado.nombre = nuevoNombre;
    productoEncontrado.precio = nuevoPrecio;
    productoEncontrado.stock = nuevoStock;
    
    // Guardar en el navegador
    localStorage.setItem('productos', JSON.stringify(productosEnTienda));
    
    // Actualizar la tabla en pantalla
    mostrarProductosEnTabla();
    
    alert('Producto actualizado correctamente');
    console.log('Producto actualizado');
}

// PASO 11: Función para agregar nuevo producto
function agregarNuevoProducto() {
    console.log('Agregando nuevo producto...');
    
    // Pedir datos básicos
    var codigo = prompt('Código del producto (ej: COM002):');
    if (!codigo) return;
    
    var nombre = prompt('Nombre del producto:');
    if (!nombre) return;
    
    var descripcion = prompt('Descripción del producto:');
    if (!descripcion) return;
    
    var precio = prompt('Precio del producto:');
    if (!precio) return;
    
    var stock = prompt('Stock inicial:');
    if (!stock) return;
    
    var stockCritico = prompt('Stock crítico (opcional, presiona Enter para 5):') || '5';
    
    var categoria = prompt('Categoría (comida, juguetes, camas, salud, accesorios, higiene):');
    if (!categoria) return;
    
    // Validaciones básicas
    if (codigo.length < 3) {
        alert('El código debe tener al menos 3 caracteres');
        return;
    }
    
    if (nombre.length > 100) {
        alert('El nombre no puede tener más de 100 caracteres');
        return;
    }
    
    precio = parseFloat(precio);
    stock = parseInt(stock);
    stockCritico = parseInt(stockCritico);
    
    if (isNaN(precio) || precio < 0) {
        alert('El precio debe ser un número válido mayor o igual a 0');
        return;
    }
    
    if (isNaN(stock) || stock < 0) {
        alert('El stock debe ser un número entero mayor o igual a 0');
        return;
    }
    
    // Verificar que el código no exista
    for (var i = 0; i < productosEnTienda.length; i++) {
        if (productosEnTienda[i].codigo === codigo) {
            alert('Ya existe un producto con el código: ' + codigo);
            return;
        }
    }
    
    // Generar nuevo ID
    var nuevoId = 1;
    for (var i = 0; i < productosEnTienda.length; i++) {
        if (productosEnTienda[i].id >= nuevoId) {
            nuevoId = productosEnTienda[i].id + 1;
        }
    }
    
    // Crear nuevo producto
    var nuevoProducto = {
        id: nuevoId,
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        stockCritico: stockCritico,
        categoria: categoria
    };
    
    // Agregar a la lista
    productosEnTienda.push(nuevoProducto);
    
    // Guardar en el navegador
    localStorage.setItem('productos', JSON.stringify(productosEnTienda));
    
    // Actualizar la tabla en pantalla
    mostrarProductosEnTabla();
    
    alert('Producto agregado correctamente');
    console.log('Producto agregado:', nuevoProducto);
}

// PASO 12: Función para agregar nuevo usuario
function agregarNuevoUsuario() {
    console.log('Agregando nuevo usuario...');
    
    // Pedir datos básicos
    var rut = prompt('RUT del usuario (sin puntos ni guión):');
    if (!rut) return;
    
    var nombre = prompt('Nombre completo:');
    if (!nombre) return;
    
    var apellidos = prompt('Apellidos:');
    if (!apellidos) return;
    
    var email = prompt('Email:');
    if (!email) return;
    
    var tipoUsuario = prompt('Tipo de usuario (cliente, vendedor, administrador):') || 'cliente';
    
    var region = prompt('Región:') || '';
    var comuna = prompt('Comuna:') || '';
    var direccion = prompt('Dirección:') || '';
    
    // Validaciones básicas
    if (rut.length < 7 || rut.length > 9) {
        alert('El RUT debe tener entre 7 y 9 caracteres');
        return;
    }
    
    if (nombre.length > 50) {
        alert('El nombre no puede tener más de 50 caracteres');
        return;
    }
    
    if (apellidos.length > 100) {
        alert('Los apellidos no pueden tener más de 100 caracteres');
        return;
    }
    
    if (!email.includes('@')) {
        alert('El email debe contener @');
        return;
    }
    
    var dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    var emailValido = false;
    for (var i = 0; i < dominiosValidos.length; i++) {
        if (email.indexOf(dominiosValidos[i]) !== -1) {
            emailValido = true;
            break;
        }
    }
    
    if (!emailValido) {
        alert('Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com');
        return;
    }
    
    // Verificar que el email no exista
    for (var i = 0; i < usuariosRegistrados.length; i++) {
        if (usuariosRegistrados[i].email === email) {
            alert('Ya existe un usuario con el email: ' + email);
            return;
        }
    }
    
    // Crear nuevo usuario
    var nuevoUsuario = {
        rut: rut,
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        password: '123456', // Contraseña por defecto
        tipoUsuario: tipoUsuario,
        region: region,
        comuna: comuna,
        direccion: direccion,
        fechaRegistro: new Date().toISOString()
    };
    
    // Agregar a la lista
    usuariosRegistrados.push(nuevoUsuario);
    
    // Guardar en el navegador
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    
    // Actualizar la tabla en pantalla
    mostrarUsuariosEnTabla();
    
    alert('Usuario agregado correctamente (contraseña por defecto: 123456)');
    console.log('Usuario agregado:', nuevoUsuario);
}

// PASO 13: Función para cerrar sesión
function cerrarSesion() {
    console.log('Cerrando sesión...');
    
    // Eliminar usuario actual del navegador
    localStorage.removeItem('usuarioActual');
    
    // Redirigir al login
    window.location.href = '../user/iniciar-sesion.html';
}

console.log('Panel administrador cargado - Versión principiante');
