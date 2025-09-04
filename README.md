# 🐾 Tienda MiMascota

Sitio web de tienda virtual para productos de mascotas con sistema de usuarios, carrito de compras y panel administrativo.

## 📋 Descripción

Proyecto desarrollado con **HTML5, CSS3 y JavaScript vanilla**. Incluye catálogo de productos, registro de usuarios, carrito funcional y gestión administrativa.

**Características principales:**
- Sistema completo de productos y carrito
- Registro y login de usuarios con validaciones
- Panel administrativo para gestión
- Diseño responsivo con Bootstrap 5
- Estructura organizada y escalable

## 📁 Estructura del Proyecto

```
📦 EvaluacionFormativaFullstack/
├── 📄 index.html                           # Página principal
├── 📁 pages/                               # Páginas HTML organizadas
│   ├── 📄 catalogo-productos.html          # Catálogo con filtros y carrito
│   ├── 📁 admin/
│   │   └── 📄 panel-administrador.html     # Panel de administrador
│   ├── 📁 user/
│   │   ├── 📄 iniciar-sesion.html          # Login
│   │   ├── 📄 registro-usuario.html        # Registro
│   │   └── 📄 panel-usuario.html           # Dashboard usuario
│   └── 📁 content/
│       ├── 📄 blog-articulos.html          # Blog
│       ├── 📄 acerca-de-nosotros.html      # Información empresa
│       └── 📄 formulario-contacto.html     # Contacto
├── 📁 js/                                  # Scripts JavaScript
│   ├── 📄 funciones-principales.js         # JavaScript principal
│   ├── 📄 sistema-productos-carrito.js     # Productos y carrito
│   └── 📄 panel-administrador.js           # Funcionalidad admin
├── 📁 css/
│   └── 📄 styles.css                       # Estilos personalizados
└── 📁 assets/img/                          # Imágenes
    ├── 🖼️ Comida.jpg, jugetes.png, cama2.png
    ├── 🖼️ salud.png, accesorios.png, higiene.png
    └── 🖼️ prod.png, logo1.png
```

## 🚀 Funcionalidades

### 🛍️ **Tienda**
- Catálogo de 7 productos con imágenes
- Carrito de compras funcional
- Filtros por categoría
- Búsqueda de productos

### 👤 **Usuarios**
- Registro con validación de RUT chileno
- Login con redirección automática
- Tipos de usuario: cliente y administrador
- Validaciones de email y contraseña

### 🔧 **Administración**
- Panel exclusivo para emails @admin.cl
- Gestión de productos (CRUD)
- Gestión de usuarios
- Estadísticas básicas

## 💻 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Framework CSS**: Bootstrap 5
- **Almacenamiento**: localStorage
- **Validaciones**: RUT chileno, emails, contraseñas

## 🧪 Datos de Prueba

### **Usuario Administrador:**
- Email: `admin@admin.cl`
- Contraseña: `Admin123`

### **RUTs válidos:**
- `12345678-5`
- `11111111-1`
- `22222222-2`

### **Emails permitidos:**
- `@duoc.cl` - Estudiantes
- `@profesor.duoc.cl` - Profesores
- `@gmail.com` - Público general
- `@admin.cl` - Administradores

## 🎯 Características Técnicas

- **Responsive**: Compatible con móvil y desktop
- **Accesible**: Estructura semántica HTML5
- **Modular**: Código JavaScript organizado
- **Validaciones**: Formularios completamente validados
- **Persistencia**: Datos guardados en localStorage

## 🚀 Instalación y Uso

1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador web
3. Para funciones de administrador, registrarse con email @admin.cl

---

**Desarrollado por:** Juan Llontop y Yasser Illanes  
**Institución:** DUOC UC  
**Fecha:** Septiembre 2025