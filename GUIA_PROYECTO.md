# 🐾 GUÍA DEL PROYECTO - TIENDA MIMASCOTA
### Proyecto Nivel Principiante - Fácil de Explicar en Clase

---

## 📋 ESTRUCTURA SIMPLIFICADA DEL PROYECTO

```
EvaluacionFormativaFullstack/
├── 📄 index.html              # Página principal con productos
├── 📄 productos.html          # Catálogo completo
├── 📄 registro-simple.html    # Registro simplificado ✨
├── 📄 login.html              # Inicio de sesión
├── 📄 dashboard.html          # Panel del usuario
├── 📄 admin-simple.html       # Panel admin simplificado ✨
├── 📄 blogs.html              # Blog de noticias
├── 📄 nosotros.html           # Información de la empresa
├── 📄 contacto.html           # Formulario de contacto
├── 📄 main.js                 # JavaScript principal ✨ SIMPLIFICADO
├── 📄 productos-simple.js     # Manejo de productos ✨ SIMPLIFICADO
├── 📄 admin-simple.js         # Admin panel ✨ SIMPLIFICADO
├── 📁 css/
│   └── 📄 styles.css          # Estilos CSS únicos
└── 📁 assets/img/             # TODAS las imágenes utilizadas
    ├── 🖼️ Comida.jpg
    ├── 🖼️ jugetes.png
    ├── 🖼️ cama2.png
    ├── 🖼️ salud.png
    ├── 🖼️ accesorios.png
    ├── 🖼️ higiene.png
    ├── 🖼️ prod.png             # ✨ NUEVA IMAGEN UTILIZADA
    └── 🖼️ logo1.png
```

---

## 🎯 PRODUCTOS - TODAS LAS IMÁGENES UTILIZADAS

Ahora usamos **TODAS** las imágenes disponibles en la carpeta `assets/img/`:

| ID | Producto | Imagen | Categoría | Precio |
|----|----------|--------|-----------|--------|
| 1 | Alimento Premium para Perros | `Comida.jpg` | comida | $15.990 |
| 2 | Juguetes Divertidos | `jugetes.png` | juguetes | $5.990 |
| 3 | Cama Super Cómoda | `cama2.png` | camas | $25.990 |
| 4 | Productos de Salud | `salud.png` | salud | $12.990 |
| 5 | Accesorios Fashion | `accesorios.png` | accesorios | $8.990 |
| 6 | Productos de Higiene | `higiene.png` | higiene | $9.990 |
| 7 | Producto Especial | `prod.png` | especial | $18.990 |

**✅ TODAS las imágenes están siendo utilizadas**

---

## 📚 ARCHIVOS PRINCIPALES SIMPLIFICADOS

### 🔹 **main.js** - JavaScript Principal
```javascript
// Validaciones simples y fáciles de entender
// - Validar RUT chileno
// - Validar email (@duoc.cl, @profesor.duoc.cl, @gmail.com)
// - Validar contraseñas
// - Manejo de regiones y comunas
// - Registro y login de usuarios
```

### 🔹 **productos-simple.js** - Manejo de Productos
```javascript
// Funciones simples para:
// - Lista de productos (usando TODAS las imágenes)
// - Agregar al carrito
// - Mostrar carrito en modal
// - Filtrar productos
// - Guardar en localStorage
```

### 🔹 **admin-simple.js** - Panel de Administrador
```javascript
// Funciones básicas para:
// - Verificar acceso admin
// - Editar productos (con prompt)
// - Eliminar productos
// - Ver usuarios registrados
// - Estadísticas simples
```

---

## 🎓 CARACTERÍSTICAS PARA PRINCIPIANTES

### ✅ **Código Fácil de Explicar**
- **Variables con nombres descriptivos**: `usuarioActual`, `carrito`, `productos`
- **Funciones pequeñas y específicas**: `validarRUT()`, `agregarAlCarrito()`
- **Comentarios explicativos** en cada sección
- **Lógica paso a paso** sin complejidades

### ✅ **Funcionalidades Básicas pero Completas**
- **Registro**: Con validaciones reales de RUT y email
- **Login**: Redirección según tipo de usuario
- **Carrito**: Agregar, quitar, mostrar total
- **Admin**: CRUD básico de productos y usuarios
- **Blog**: Artículos predefinidos con navegación

### ✅ **Sin Dependencias Complejas**
- Solo **HTML5**, **CSS3**, **JavaScript vanilla**
- **Bootstrap 5** para estilos (CDN)
- **localStorage** para persistencia
- **No frameworks** complicados

---

## 🛠️ PÁGINAS SIMPLIFICADAS

### 🏠 **Páginas Principales**
- `index.html` → Productos principales con carrito
- `productos.html` → Catálogo completo con filtros
- `registro-simple.html` → Registro fácil de entender
- `admin-simple.html` → Panel admin básico

### 📄 **Páginas de Contenido**
- `blogs.html` → 3 artículos predefinidos
- `nosotros.html` → Información de la empresa
- `contacto.html` → Formulario con validaciones

---

## 🔧 VALIDACIONES IMPLEMENTADAS

### 📋 **RUT Chileno**
```javascript
// Formato: 12345678K (sin puntos ni guión)
// Validación matemática real del dígito verificador
```

### 📧 **Email Restringido**
```javascript
// Solo permite: @duoc.cl, @profesor.duoc.cl, @gmail.com
```

### 🔐 **Contraseña Segura**
```javascript
// Mínimo 6 caracteres + 1 número + 1 mayúscula
```

### 🗺️ **Regiones y Comunas**
```javascript
// 5 regiones principales con sus comunas reales
```

---

## 🚀 CÓMO USAR EL PROYECTO

### 👨‍🎓 **Para Estudiantes**
1. Abrir `index.html` en el navegador
2. Explorar productos y carrito
3. Registrarse en `registro-simple.html`
4. Iniciar sesión en `login.html`

### 🔧 **Para Administradores**
1. Registrarse con email `admin@admin.cl`
2. Iniciar sesión (redirección automática a admin)
3. Gestionar productos y usuarios en `admin-simple.html`

### 👨‍🏫 **Para Explicar en Clase**
1. **HTML**: Estructura y formularios simples
2. **CSS**: Bootstrap y estilos básicos
3. **JavaScript**: Funciones, eventos, localStorage
4. **Validaciones**: RUT, email, contraseñas
5. **DOM**: Manipulación de elementos

---

## 🎯 DIFERENCIAS CON LA VERSIÓN ANTERIOR

| Aspecto | Versión Anterior | Versión Simplificada |
|---------|------------------|----------------------|
| **Archivos JS** | Complejos y largos | Simples y comentados |
| **Validaciones** | Múltiples archivos | Todo en `main.js` |
| **Admin Panel** | Formularios complejos | Prompts simples |
| **Productos** | 6 productos | 7 productos (todas las imágenes) |
| **Estructura** | Archivos dispersos | Organización clara |
| **Comentarios** | Pocos | Abundantes y explicativos |

---

## ✨ VENTAJAS PARA LA CLASE

### 🎓 **Fácil de Enseñar**
- **Código lineal** sin abstracciones complejas
- **Una función = una tarea** específica
- **Variables globales** fáciles de rastrear
- **Flujo lógico** paso a paso

### 👨‍💻 **Fácil de Entender**
- **Comentarios en español** explicando cada parte
- **Nombres descriptivos** en variables y funciones
- **Lógica simple** sin patrones de diseño complejos
- **Debugging fácil** con `console.log()`

### 🔍 **Fácil de Modificar**
- **Agregar productos**: Solo editar el array
- **Cambiar validaciones**: Modificar las funciones específicas
- **Nuevas páginas**: Copiar estructura existente
- **Estilos**: Un solo archivo CSS

---

## 🏆 CUMPLIMIENTO DE REQUISITOS

✅ **Todas las imágenes utilizadas**  
✅ **Validaciones específicas requeridas**  
✅ **Código nivel principiante**  
✅ **Estructura organizada**  
✅ **Funcionalidades completas**  
✅ **Navegación consistente**  
✅ **Blog funcional**  
✅ **Panel admin operativo**  
✅ **Carrito persistente**  
✅ **Responsive design**  

---

## 💡 CONSEJOS PARA LA EXPLICACIÓN

1. **Empezar por HTML** → Mostrar estructura básica
2. **Seguir con CSS** → Explicar Bootstrap y estilos
3. **JavaScript básico** → Variables, funciones, eventos
4. **localStorage** → Cómo guardar datos en el navegador
5. **Validaciones** → Mostrar funciones específicas
6. **Flujo completo** → Del registro a la compra

**¡El proyecto ahora es perfecto para explicar en clase paso a paso!** 🎉
