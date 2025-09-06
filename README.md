# 🐾 Tienda MiMascota

[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-blue.svg)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-5-orange.svg)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-3-blue.svg)](https://developer.mozilla.org/es/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Una tienda online completa y moderna para productos de mascotas, desarrollada con tecnologías web modernas. Incluye sistema de autenticación, gestión de roles, carrito de compras y paneles de administración.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Roles de Usuario](#-roles-de-usuario)
- [Funcionalidades](#-funcionalidades)
- [API y Datos](#-api-y-datos)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autor](#-autor)

## ✨ Características

- 🛒 **Carrito de Compras** - Sistema completo de carrito con persistencia local
- 👥 **Sistema de Usuarios** - Autenticación y gestión de roles
- 📊 **Panel de Administración** - Dashboard completo para administradores
- 🏪 **Panel de Vendedor** - Vista especializada para vendedores
- 📱 **Responsive Design** - Optimizado para móviles y desktop
- 🎨 **Interfaz Moderna** - Bootstrap 5 con diseño personalizado
- 💾 **Persistencia Local** - Almacenamiento en localStorage
- 🔒 **Validaciones Seguras** - Formularios validados y seguros
- 📧 **Sistema de Contacto** - Formulario de contacto funcional
- 📝 **Blog Integrado** - Artículos y contenido informativo

## 🛠 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica del sitio web
- **CSS3** - Estilos personalizados y responsive
- **JavaScript (ES6+)** - Lógica de negocio y interactividad
- **Bootstrap 5.3.8** - Framework CSS para diseño responsive

### Almacenamiento
- **localStorage** - Persistencia de datos del lado cliente
- **JSON** - Formato de datos para almacenamiento

### Herramientas de Desarrollo
- **Visual Studio Code** - Entorno de desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

## 📁 Estructura del Proyecto

```
Tienda-MiMascota/
├── 📄 index.html                    # Página principal
├── 📄 README.md                     # Documentación del proyecto
├── 📁 assets/                       # Recursos estáticos
│   └── 📁 img/                      # Imágenes del proyecto
├── 📁 css/                          # Hojas de estilo
│   └── 📄 styles.css                # Estilos personalizados
├── 📁 js/                           # Lógica JavaScript
│   ├── 📁 admin/                    # Funcionalidades de administración
│   │   ├── 📄 panel-administrador.js
│   │   └── 📄 panel-vendedor.js
│   ├── 📁 shop/                     # Funcionalidades de tienda
│   │   ├── 📄 productos.js
│   │   └── 📄 carrito.js
│   ├── 📁 user/                     # Funcionalidades de usuario
│   │   ├── 📄 usuarios.js
│   │   ├── 📄 validaciones.js
│   │   └── 📄 panel-usuario.js
│   └── 📁 utils/                    # Utilidades compartidas
│       ├── 📄 utilidades.js
│       ├── 📄 regiones-comunas.js
│       ├── 📄 contacto.js
│       └── 📄 blog-articulos.js
└── 📁 pages/                        # Páginas del sitio
    ├── 📁 admin/                    # Paneles de administración
    │   ├── 📄 panel-administrador.html
    │   └── 📄 panel-vendedor.html
    ├── 📁 content/                  # Contenido estático
    │   ├── 📄 detalle-producto.html
    │   ├── 📄 blog-articulos.html
    │   ├── 📄 formulario-contacto.html
    │   └── 📄 acerca-de-nosotros.html
    └── 📁 user/                     # Páginas de usuario
        ├── 📄 registro-usuario.html
        ├── 📄 iniciar-sesion.html
        └── 📄 panel-usuario.html
```

## 🚀 Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para Bootstrap CDN

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ddoblejotadev/EvaluacionFormativaFullstack.git
   cd EvaluacionFormativaFullstack
   ```

2. **Abrir en el navegador**
   - Abrir `index.html` en tu navegador web
   - O usar un servidor local (recomendado para desarrollo)

3. **Servidor Local (Opcional)**
   ```bash
   # Usando Python
   python -m http.server 8000

   # Usando Node.js
   npx serve .

   # Usando PHP
   php -S localhost:8000
   ```

## 📖 Uso

### Para Usuarios Normales
1. **Navegar la tienda** - Ver productos disponibles
2. **Agregar al carrito** - Seleccionar productos y cantidades
3. **Registrarse** - Crear cuenta para compras
4. **Iniciar sesión** - Acceder a funcionalidades adicionales
5. **Realizar compras** - Completar pedidos

### Para Administradores
1. **Iniciar sesión** con credenciales de admin
2. **Gestionar usuarios** - Crear, editar, eliminar usuarios
3. **Gestionar productos** - CRUD completo de productos
4. **Ver estadísticas** - Dashboard con métricas

### Para Vendedores
1. **Iniciar sesión** con credenciales de vendedor
2. **Ver productos** - Catálogo completo (solo lectura)
3. **Ver órdenes** - Historial de pedidos

## 👥 Roles de Usuario

### 🛡️ Administrador
- **Email:** admin@duoc.cl
- **Contraseña:** admin123
- **Permisos:** Control total del sistema

### 🏪 Vendedor
- **Email:** vendedor1@duoc.cl
- **Contraseña:** vende123
- **Permisos:** Vista de productos y órdenes

### 👤 Cliente
- **Registro:** Cualquier email válido
- **Permisos:** Compras y gestión de perfil

## 🎯 Funcionalidades

### 🛒 Carrito de Compras
- ✅ Agregar/eliminar productos
- ✅ Modificar cantidades
- ✅ Cálculo automático de totales
- ✅ Persistencia entre sesiones
- ✅ Modal responsive

### 👥 Gestión de Usuarios
- ✅ Registro con validaciones
- ✅ Inicio de sesión seguro
- ✅ Sistema de roles
- ✅ Perfiles de usuario
- ✅ Gestión de sesiones

### 📊 Panel de Administración
- ✅ Dashboard con estadísticas
- ✅ CRUD de usuarios
- ✅ CRUD de productos
- ✅ Gestión de roles
- ✅ Alertas de stock bajo

### 📱 Responsive Design
- ✅ Optimizado para móviles
- ✅ Tablets y desktop
- ✅ Navegación adaptativa
- ✅ Componentes Bootstrap

### 🔍 Búsqueda y Filtros
- ✅ Búsqueda por nombre
- ✅ Filtros por categoría
- ✅ Resultados en tiempo real

## 📊 API y Datos

### Almacenamiento Local
El proyecto utiliza `localStorage` para persistir datos:

```javascript
// Productos
localStorage.getItem('productos')

// Carrito de compras
localStorage.getItem('carrito')

// Usuarios
localStorage.getItem('usuarios')

// Sesión actual
localStorage.getItem('usuarioActual')
```

### Estructura de Datos

#### Producto
```javascript
{
  id: 1,
  codigo: "COM001",
  nombre: "Comida para Perros Premium",
  descripcion: "Alimento balanceado para perros adultos",
  precio: 15000,
  stock: 50,
  stockCritico: 10,
  categoria: "Comida",
  imagen: "assets/img/Comida.jpg"
}
```

#### Usuario
```javascript
{
  id: 1,
  run: "19011022K",
  nombre: "Admin",
  apellidos: "Sistema",
  email: "admin@duoc.cl",
  rol: "administrador",
  password: "admin123",
  activo: true
}
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

### Guías de Contribución
- Mantener el código limpio y bien comentado
- Seguir las convenciones de nomenclatura
- Probar cambios en múltiples navegadores
- Actualizar documentación si es necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Desarrollado por:** 
- **GitHub:** [@ddoblejotadev](https://github.com/ddoblejotadev)
- **GitHub:** [@yasser-duoc](https://github.com/yasser-duoc)

---

⭐ **¡Si te gusta este proyecto, dale una estrella!**

📧 **¿Preguntas o sugerencias?** Abre un issue en GitHub.

---

*Proyecto desarrollado como parte de la evaluación formativa de desarrollo fullstack.*
