# 🐾 Tienda MiMascota

Un sitio web simple para una tienda de productos para mascotas con sistema de registro, carrito de compras y panel de administrador.

## 📋 Descripción del Proyecto

Este es mi proyecto de clase de HTML, CSS y JavaScript. Es una tienda virtual que vende productos para mascotas, permite registrar a los clientes junto con información de sus mascotas, gestionar un carrito de compras y administrar productos.

## 🌟 Características Principales

- **Página principal**: Muestra productos con imágenes y carrito desde la primera página
- **Catálogo de productos**: Lista completa con filtros y búsqueda
- **Carrito de compras**: Agregar productos y realizar compras
- **Registro de clientes**: Formulario para registrar personas y sus mascotas
- **Validación de RUT**: Sistema que valida RUTs chilenos automáticamente
- **Sistema de login**: Inicio de sesión con diferentes tipos de usuario
- **Panel de administrador**: Gestión completa de productos y usuarios (solo para admins)
- **Ver registros**: Página protegida para admins ver todos los registros
- **Creación automática de admin**: Si registras con email @admin.cl, creas usuario admin
- **Diseño responsivo**: Funciona en computadores y móviles

## 📁 Archivos del Proyecto

```
📦 Tienda MiMascota
├── 📄 index.html          # Página principal con productos y carrito
├── 📄 productos.html      # Catálogo de productos con carrito
├── 📄 registro.html       # Formulario de registro (persona + mascota)
├── 📄 login.html          # Página de inicio de sesión
├── 📄 ver-registros.html  # Ver todos los registros (solo admins)
├── 📄 dashboard.html      # Panel del usuario
├── 📄 admin.html          # Panel de administrador
├── 📄 main.js             # Lógica principal (registro, login, RUT)
├── 📄 productos.js        # Lógica del carrito y productos
├── 📄 admin.js            # Lógica del panel de administrador
├── 📄 README.md           # Este archivo
└── 📁 css/
    └── 📄 styles.css      # Estilos CSS
```

## 🚀 Cómo usar el proyecto

### 👤 **Para Usuarios Normales:**
1. **Abrir la tienda**: Hacer doble clic en `index.html`
2. **Ver productos**: En la página principal verás productos destacados con imágenes
3. **Comprar**: Agregar productos al carrito y realizar compras
4. **Registrarse**: Crear cuenta con datos personales y de mascota
5. **Iniciar sesión**: Acceder con email/usuario y contraseña

### 🔧 **Para Administradores:**
1. **Crear usuario admin**: Registrarse con email que termine en `@admin.cl` (ej: admin@admin.cl)
2. **Iniciar sesión**: Al hacer login, será redirigido automáticamente al panel de admin
3. **Gestionar productos**: Crear, editar y eliminar productos
4. **Gestionar usuarios**: Ver lista de usuarios registrados
5. **Ver registros**: Acceder a la página de registros desde el panel admin
6. **Ver estadísticas**: Consultar números de la tienda

## 🧪 Datos de Prueba

### **RUTs válidos para registro:**
- `12345678-5`
- `11111111-1`
- `22222222-2`
- `33333333-3`

### **Usuario administrador de prueba:**
- Email: `admin@admin.cl`
- Usuario: `admin`
- Contraseña: `123456`

### **Usuario normal de prueba:**
- Email: `usuario@test.cl`
- Usuario: `usuario`
- Contraseña: `123456`

## 💻 Tecnologías Usadas

- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos y diseño
- **JavaScript**: Funcionalidad e interactividad
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **LocalStorage**: Para guardar datos en el navegador (carrito, productos, usuarios)

## 📱 Funcionalidades Principales

### 🏠 **Página Principal**
- Muestra 6 productos destacados con precios e imágenes
- Carrito funcional desde la primera página
- Navegación fácil a productos, registro y login
- Diseño atractivo con imágenes y botones

### 🛍️ **Sistema de Productos y Carrito**
- Catálogo completo de productos
- Filtros por categoría
- Búsqueda de productos
- Carrito de compras funcional
- Modificar cantidades
- Proceso de compra simulado

### 📝 **Sistema de Registro**
- Datos del propietario (RUT obligatorio)
- Información de la mascota
- Validación automática de formularios
- Diferentes tipos de usuario

### 🔍 **Validación de RUT**
- Formato automático mientras escribes
- Validación del dígito verificador
- Mensajes de error claros

### 👨‍💼 **Panel de Administrador**
- **Gestión de productos**: Crear, editar, eliminar
- **Gestión de usuarios**: Ver lista, crear nuevos, eliminar
- **Estadísticas**: Resumen de la tienda
- **Acceso restringido**: Solo usuarios con email `@admin.cl`

### 📊 **Ver Registros**
- Lista de todos los clientes registrados (solo para admins)
- Información organizada por cliente y mascota
- Opción para limpiar todos los registros
- Página protegida, requiere login de admin

## 🎯 Objetivos de Aprendizaje Cumplidos

Este proyecto me ayudó a aprender:
- ✅ Crear páginas web con HTML
- ✅ Dar estilo con CSS y Bootstrap
- ✅ Añadir interactividad con JavaScript
- ✅ Validar formularios
- ✅ Trabajar con LocalStorage
- ✅ Manejar eventos y funciones
- ✅ Crear un carrito de compras funcional
- ✅ Implementar diferentes tipos de usuario
- ✅ Desarrollar un panel de administración
- ✅ Organizar código en múltiples archivos

## 📋 Requisitos del Profesor Cumplidos

- ✅ **Página principal**: Tienda con productos destacados e imágenes
- ✅ **Página de productos**: Lista con carrito funcional
- ✅ **Detalle del carrito**: Modal con productos y totales
- ✅ **Registro de usuarios**: Con datos personales y mascotas
- ✅ **Inicio de sesión**: Con validación y tipos de usuario
- ✅ **Panel administrador**: CRUD completo de productos y usuarios
- ✅ **LocalStorage**: Para carrito y persistencia de datos
- ✅ **Acceso admin**: Restringido a emails `@admin.cl`
- ✅ **Carrito desde página principal**: No requiere ir a otra página
- ✅ **Imágenes de productos**: Todas las imágenes se muestran correctamente
- ✅ **Logo mejorado**: Posición visualmente atractiva
- ✅ **Código principiante**: Simple y fácil de explicar

## 🐛 Consideraciones Técnicas

- Los datos se guardan solo en el navegador (LocalStorage)
- No hay base de datos real
- Es solo un proyecto de práctica educativa
- Las imágenes son referencias a archivos locales

## 👨‍🎓 Sobre el Proyecto

Este es mi proyecto para la clase de **Introducción al Desarrollo Web**.  
Fue creado como ejercicio para aprender HTML, CSS y JavaScript básico con funcionalidades avanzadas.

**Autor**: [Tu nombre]  
**Fecha**: Septiembre 2025  
**Curso**: Introducción al Desarrollo Web  

---

*Proyecto creado con ❤️ para aprender desarrollo web completo***
1. **Crear usuario admin**: Registrarse con email que termine en `@admin.cl` (ej: admin@admin.cl)
2. **Iniciar sesión**: Al hacer login, será redirigido automáticamente al panel de admin
3. **Gestionar productos**: Crear, editar y eliminar productos
4. **Gestionar usuarios**: Ver lista de usuarios registrados
5. **Ver registros**: Acceder a la página de registros desde el panel admin
6. **Ver estadísticas**: Consultar números de la tienda

## 🧪 Datos de Prueba

### **RUTs válidos para registro:**
- `12345678-5`
- `11111111-1`
- `22222222-2`
- `33333333-3`

### **Usuario administrador de prueba:**
- Email: `admin@admin.cl`
- Usuario: `admin`
- Contraseña: `123456`

### **Usuario normal de prueba:**
- Email: `usuario@test.cl`
- Usuario: `usuario`
- Contraseña: `123456`

## 💻 Tecnologías Usadas

- **HTML5**: Estructura de las páginas
- **CSS3**: Estilos y diseño
- **JavaScript**: Funcionalidad e interactividad
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **LocalStorage**: Para guardar datos en el navegador (carrito, productos, usuarios)

## 📱 Funcionalidades Principales

### 🏠 **Página Principal**
- Muestra 6 productos destacados con precios
- Navegación fácil a productos, registro y login
- Diseño atractivo con imágenes y botones

### 🛍️ **Sistema de Productos y Carrito**
- Catálogo completo de productos
- Filtros por categoría
- Búsqueda de productos
- Carrito de compras funcional
- Modificar cantidades
- Proceso de compra simulado

### 📝 **Sistema de Registro**
- Datos del propietario (RUT obligatorio)
- Información de la mascota
- Validación automática de formularios
- Diferentes tipos de usuario

### 🔍 **Validación de RUT**
- Formato automático mientras escribes
- Validación del dígito verificador
- Mensajes de error claros

### 👨‍💼 **Panel de Administrador**
- **Gestión de productos**: Crear, editar, eliminar
- **Gestión de usuarios**: Ver lista, crear nuevos, eliminar
- **Estadísticas**: Resumen de la tienda
- **Acceso restringido**: Solo usuarios con email `@admin.cl`

### 📊 **Ver Registros**
- Lista de todos los clientes registrados (solo para admins)
- Información organizada por cliente y mascota
- Opción para limpiar todos los registros
- Página protegida, requiere login de admin

## 🎯 Objetivos de Aprendizaje Cumplidos

Este proyecto me ayudó a aprender:
- ✅ Crear páginas web con HTML
- ✅ Dar estilo con CSS y Bootstrap
- ✅ Añadir interactividad con JavaScript
- ✅ Validar formularios
- ✅ Trabajar con LocalStorage
- ✅ Manejar eventos y funciones
- ✅ Crear un carrito de compras funcional
- ✅ Implementar diferentes tipos de usuario
- ✅ Desarrollar un panel de administración
- ✅ Organizar código en múltiples archivos

## 📋 Requisitos del Profesor Cumplidos

- ✅ **Página principal**: Tienda con productos destacados
- ✅ **Página de productos**: Lista con carrito funcional
- ✅ **Detalle del carrito**: Modal con productos y totales
- ✅ **Registro de usuarios**: Con datos personales y mascotas
- ✅ **Inicio de sesión**: Con validación y tipos de usuario
- ✅ **Panel administrador**: CRUD completo de productos y usuarios
- ✅ **LocalStorage**: Para carrito y persistencia de datos
- ✅ **Acceso admin**: Restringido a emails `@admin.cl`

## 🐛 Consideraciones Técnicas

- Los datos se guardan solo en el navegador (LocalStorage)
- No hay base de datos real
- Es solo un proyecto de práctica educativa
- Las imágenes son referencias a archivos locales

## 🔧 Mejoras Futuras

Ideas para mejorar el proyecto:
- [ ] Base de datos real
- [ ] Pasarela de pagos real
- [ ] Subida de imágenes
- [ ] Sistema de notificaciones
- [ ] Historial de compras
- [ ] Reportes avanzados
- [ ] API REST

## 👨‍🎓 Sobre el Proyecto

Este es mi proyecto para la clase de **Introducción al Desarrollo Web**.  
Fue creado como ejercicio para aprender HTML, CSS y JavaScript básico con funcionalidades avanzadas.

**Autor**: [Tu nombre]  
**Fecha**: Septiembre 2025  
**Curso**: Introducción al Desarrollo Web  

## 📞 Contacto

Si tienes preguntas sobre el proyecto, puedes contactarme en:
- Email: [tu-email@ejemplo.com]
- GitHub: [tu-usuario]

---

*Proyecto creado con ❤️ para aprender desarrollo web completo*
