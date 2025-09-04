# 🐾 Tienda MiMascota - Proyecto Final Organizado

Un sitio web completo para una tienda de productos para mascotas con sistema de registro, carrito de compras y panel de administrador. **Proyecto optimizado para nivel principiante** con código simple, bien documentado y **estructura de carpetas organizada**.

## 📋 Descripción del Proyecto

Este es un proyecto de desarrollo web fullstack desarrollado con **HTML5, CSS3 y JavaScript vanilla**. Es una tienda virtual moderna que vende productos para mascotas, permite el registro de clientes con información de sus mascotas, gestiona un carrito de compras funcional y cuenta con un panel de administración completo.

**✨ Características destacadas:**
- **Código nivel principiante** con comentarios explicativos
- **Todas las imágenes utilizadas** (7 productos + logo)
- **Estructura organizada en carpetas** para fácil navegación
- **Documentación completa** para explicar en clase
- **Separación clara** de HTML, CSS y JavaScript

## 🌟 Características Principales

### 🛍️ **Sistema de Productos y Carrito**
- **7 productos** usando TODAS las imágenes disponibles
- **Categorías completas**: comida, juguetes, camas, salud, accesorios, higiene, especial
- **Carrito funcional** desde la página principal
- **Filtros y búsqueda** en el catálogo completo
- **Modal del carrito** con funciones agregar/eliminar

### 👤 **Sistema de Usuarios**
- **Registro simplificado** con validaciones claras
- **Validación de RUT chileno** con algoritmo real
- **Emails restringidos**: @duoc.cl, @profesor.duoc.cl, @gmail.com, @admin.cl
- **Contraseñas seguras**: 6+ caracteres, 1 número, 1 mayúscula
- **Login con redirección** automática según tipo de usuario

### 🔧 **Panel de Administrador**
- **Acceso restringido** solo para emails @admin.cl
- **Gestión de productos** con prompts simples (editar/eliminar)
- **Gestión de usuarios** registrados
- **Estadísticas básicas** de la tienda
- **Interface simplificada** para fácil comprensión

### 📰 **Contenido Adicional**
- **Blog funcional** con 3 artículos predefinidos
- **Página Nosotros** con información de la empresa
- **Formulario de contacto** con validaciones
- **Navegación consistente** en todas las páginas
- **Diseño responsivo** con Bootstrap 5

## 📁 Estructura del Proyecto ORGANIZADA

```
📦 EvaluacionFormativaFullstack/
├── 📄 index.html                    # 🏠 PÁGINA PRINCIPAL (raíz del proyecto)
├── 📄 README.md                     # 📖 Documentación principal del proyecto
├── 📁 pages/                        # 📄 TODAS LAS PÁGINAS HTML ORGANIZADAS
│   ├── 📄 README.md                 # 📖 Explicación de páginas
│   ├── 📄 productos.html            # 🛍️ Catálogo completo con filtros y carrito
│   ├── 📁 admin/                    # 🔧 PÁGINAS DE ADMINISTRADOR
│   │   └── 📄 admin-simple.html     # 👨‍� Panel de administrador completo
│   ├── 📁 user/                     # 👤 PÁGINAS DE USUARIO
│   │   ├── 📄 login.html            # 🔐 Inicio de sesión
│   │   ├── 📄 registro-simple.html  # 📝 Registro de usuarios simplificado
│   │   └── 📄 dashboard.html        # 👤 Panel del usuario logueado
│   └── � content/                  # � PÁGINAS DE CONTENIDO
│       ├── 📄 blogs.html            # 📰 Blog con 3 artículos
│       ├── 📄 nosotros.html         # ℹ️ Información de la empresa
│       └── 📄 contacto.html         # 📧 Formulario de contacto
├── 📁 js/                           # ⚙️ TODOS LOS ARCHIVOS JAVASCRIPT
│   ├── 📄 README.md                 # 📖 Explicación de scripts
│   ├── 📄 main.js                   # ⚙️ JavaScript principal del proyecto
│   ├── 📄 productos-simple.js       # 🛒 Sistema de productos y carrito
│   └── 📄 admin-simple.js           # � Funcionalidad del panel administrador
├── � css/                          # 🎨 ESTILOS DEL PROYECTO
│   └── 📄 styles.css                # 🎨 Estilos únicos y personalizados
├── 📁 assets/                       # 🖼️ RECURSOS MULTIMEDIA
│   └── 📁 img/                      # 🖼️ TODAS LAS IMÁGENES DEL PROYECTO
│       ├── 🖼️ Comida.jpg           # ✅ Producto 1: Alimento Premium
│       ├── 🖼️ jugetes.png          # ✅ Producto 2: Juguetes Divertidos
│       ├── 🖼️ cama2.png           # ✅ Producto 3: Cama Super Cómoda
│       ├── 🖼️ salud.png           # ✅ Producto 4: Productos de Salud
│       ├── 🖼️ accesorios.png      # ✅ Producto 5: Accesorios Fashion
│       ├── � higiene.png         # ✅ Producto 6: Productos de Higiene
│       ├── 🖼️ prod.png            # ✅ Producto 7: Producto Especial
│       └── 🖼️ logo1.png           # ✅ Logo oficial de la empresa
└── 📁 docs/                         # 📚 DOCUMENTACIÓN ADICIONAL
    └── 📄 README.md                 # 📖 Guías y manuales adicionales
```

### 🎯 **VENTAJAS DE LA NUEVA ESTRUCTURA:**

✅ **Organización Profesional**: Carpetas separadas por función (páginas, scripts, estilos)  
✅ **Fácil Navegación**: Encuentras rápidamente lo que buscas  
✅ **Separación Clara**: HTML, CSS y JavaScript en sus propias carpetas  
✅ **Escalable**: Fácil agregar nuevas funcionalidades  
✅ **Educativo**: Estructura como proyectos reales en la industria  
✅ **README en cada carpeta**: Explicación de cada sección

## 🚀 Cómo usar el proyecto

### 🎯 **Navegar la Nueva Estructura:**
1. **`index.html`** - PÁGINA PRINCIPAL (abrir aquí para empezar)
2. **`pages/`** - Todas las páginas HTML organizadas por función
3. **`js/`** - Todo el JavaScript separado y comentado
4. **`css/`** - Estilos únicos del proyecto
5. **`assets/img/`** - Todas las imágenes utilizadas

### 👨‍🎓 **Para Estudiantes/Usuarios:**
1. **Abrir la tienda**: Hacer doble clic en `index.html` en la raíz del proyecto
2. **Explorar productos**: Página principal con productos destacados y carrito funcional
3. **Ver catálogo completo**: Ir a `pages/productos.html` para todos los productos con filtros
4. **Registrarse**: Usar `pages/user/registro-simple.html` con validaciones completas
5. **Iniciar sesión**: Login en `pages/user/login.html` con redirección automática
6. **Navegar contenido**: Explorar blog, nosotros y contacto en `pages/content/`

### 🔧 **Para Administradores:**
1. **Crear cuenta admin**: Registrarse con email `admin@admin.cl` (o cualquier @admin.cl)
2. **Login automático**: Al iniciar sesión, redirección automática a `pages/admin/admin-simple.html`
3. **Gestionar productos**: Editar precios, nombres, stock con prompts simples
4. **Ver usuarios**: Lista de todos los usuarios registrados
5. **Estadísticas**: Ver totales de productos, usuarios y carrito

### 👨‍🏫 **Para Profesores/Explicación:**
1. **Estructura clara**: Mostrar organización de carpetas profesional
2. **JavaScript modular**: Explicar `js/main.js`, `js/productos-simple.js`, `js/admin-simple.js`
3. **HTML organizado**: Páginas separadas por función en `pages/`
4. **Validaciones**: Demostrar RUT, email y contraseñas
5. **localStorage**: Mostrar persistencia de datos
6. **Bootstrap**: Explicar diseño responsivo

## 🧪 Datos de Prueba

### **RUTs válidos para testing:**
- `12345678K` (sin puntos ni guión)
- `11111111-1` 
- `98765432-1`
- `87654321-9`

### **Usuarios de prueba preconfigurados:**

**👨‍💼 Administrador:**
- Email: `admin@admin.cl`
- Contraseña: `Admin123`
- Acceso: Panel de administrador completo

**👤 Usuario normal:**
- Email: `usuario@duoc.cl`
- Contraseña: `User123`
- Acceso: Dashboard de usuario

### **Emails válidos para registro:**
- `@duoc.cl` - Estudiantes
- `@profesor.duoc.cl` - Profesores  
- `@gmail.com` - Público general
- `@admin.cl` - Administradores (acceso especial al panel admin)

## 💻 Tecnologías Utilizadas

### 🔧 **Frontend**
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos personalizados y variables CSS
- **Bootstrap 5**: Framework para diseño responsivo
- **JavaScript ES6**: Funcionalidad moderna y modular

### 💾 **Persistencia**
- **localStorage**: Almacenamiento local para carrito, productos y usuarios
- **sessionStorage**: Manejo de sesiones de usuario

### 🎨 **Diseño**
- **Bootstrap Icons**: Iconografía consistente
- **Google Fonts**: Tipografías web
- **Responsive Design**: Compatibilidad móvil y desktop

## 📱 Funcionalidades Implementadas

### 🏪 **Sistema de Tienda**
- **7 productos completos** usando todas las imágenes disponibles
- **Categorías organizadas**: comida, juguetes, camas, salud, accesorios, higiene, especial
- **Carrito persistente** con localStorage
- **Filtros dinámicos** por categoría
- **Búsqueda de productos** en tiempo real
- **Modal del carrito** con funciones completas

### 👤 **Gestión de Usuarios**
- **Registro con validaciones** de RUT chileno real
- **Login seguro** con redirección automática
- **Roles diferenciados**: usuario normal y administrador
- **Sesiones persistentes** entre navegación
- **Validación de emails** específicos (@duoc.cl, @profesor.duoc.cl, @gmail.com, @admin.cl)

### � **Validaciones de Seguridad**
- **RUT chileno**: Algoritmo de validación del dígito verificador
- **Contraseñas seguras**: 6+ caracteres, 1 número, 1 mayúscula
- **Emails restringidos**: Dominios específicos permitidos
- **Formularios validados**: HTML5 + JavaScript personalizado

### 🛠️ **Panel de Administración**
- **Acceso restringido** solo para @admin.cl
- **CRUD de productos** con interface simple
- **Gestión de usuarios** registrados
- **Estadísticas en tiempo real**
- **Prompts intuitivos** para edición
- Carrito funcional desde la primera página
- Navegación fácil a productos, registro y login
- Diseño atractivo con imágenes y botones

### 🛍️ **Sistema de Productos y Carrito**
- Catálogo completo de productos
- Filtros por categoría
- Búsqueda de productos

## 🎯 Características para Principiantes

### ✅ **Código Limpio y Comentado**
- **Funciones pequeñas** con una responsabilidad específica
- **Nombres descriptivos** en variables y funciones
- **Comentarios explicativos** en español
- **Estructura modular** fácil de entender

### ✅ **Fácil de Explicar en Clase**
- **Lógica lineal** sin patrones complejos
- **console.log()** para debugging
- **Alertas informativas** para el usuario
- **Validaciones paso a paso**

### ✅ **Sin Dependencias Complejas**
- Solo **HTML, CSS, JavaScript vanilla**
- **Bootstrap 5** via CDN
- **localStorage** para persistencia
- **No frameworks** de JavaScript

## 🏆 Logros del Proyecto

✅ **Todas las imágenes utilizadas** (7 productos + logo)  
✅ **Código nivel principiante** con comentarios abundantes  
✅ **Estructura profesional organizada** en carpetas lógicas  
✅ **Navegación actualizada** para nueva estructura  
✅ **Funcionalidades completas** pero simples de entender  
✅ **Validaciones reales** (RUT, email, contraseñas)  
✅ **Navegación consistente** en todas las páginas  
✅ **Panel admin funcional** con CRUD básico  
✅ **Carrito persistente** en localStorage  
✅ **Blog operativo** con 3 artículos  
✅ **Responsive design** con Bootstrap 5  
✅ **Documentación completa** con README en cada carpeta  
✅ **Separación clara** de HTML, CSS y JavaScript  
✅ **Fácil de explicar** y navegar para principiantes  

## 📞 Información del Proyecto

**Desarrollado por:** Juan Llontop y Yasser Illanes  
**Institución:** DUOC UC  
**Tecnologías:** HTML5, CSS3, JavaScript ES6, Bootstrap 5  
**Fecha:** Septiembre 2025  
**Versión:** 3.0 - Estructura Organizada Profesional  

**🎓 Perfecto para explicar paso a paso en clase!**
- ✅ **Estructura profesional**: Carpetas organizadas como proyectos reales
- ✅ **Carrito desde página principal**: No requiere ir a otra página
- ✅ **Imágenes de productos**: Todas las imágenes se muestran correctamente
- ✅ **Logo mejorado**: Posición visualmente atractiva
- ✅ **Código principiante**: Simple y fácil de explicar
- ✅ **Navegación actualizada**: Referencias correctas entre páginas

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
