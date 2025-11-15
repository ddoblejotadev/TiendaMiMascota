# 🐾 TiendaMiMascota - E-commerce Full-Stack para Mascotas

![React](https://img.shields.io/badge/React-19.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![React Router](https://img.shields.io/badge/React_Router-7.9-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet)
![Axios](https://img.shields.io/badge/Axios-1.7-green)
![Tests](https://img.shields.io/badge/Tests-30/30_passing-brightgreen)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)

## 📖 Descripción

TiendaMiMascota es una **aplicación full-stack completa** especializada en productos para mascotas. Desarrollada con **React 19**, **Vite**, **React Router**, **Bootstrap 5** y conectada a un **backend Spring Boot** via **API REST**, ofrece una experiencia de compra moderna, escalable y completamente integrada.

> **✅ Proyecto Full-Stack Completado - DSY1104 (Duoc UC)**  
> Frontend React + Backend Spring Boot + Base de Datos MySQL

## ✨ Características Principales

### 🌐 Arquitectura Full-Stack
- **Frontend React** conectado a backend via **Axios**
- **API REST** con endpoints estandarizados
- **Autenticación JWT** con interceptores
- **Sincronización de datos** Frontend ↔ Backend ↔ Android
- **Estructura unificada** de modelos de datos
- **Manejo de errores 401** con redirección automática

### 🛍️ E-commerce Completo
- **Catálogo de productos** sincronizado con backend
- **Carrito de compras** con persistencia
- **Proceso de checkout** completo
- **5 vistas nuevas**: Categorías, Checkout, Compra Exitosa, Error Pago, Ofertas
- **Validación de RUT chileno** en registro (algoritmo módulo 11)
- **Auto-completado** de formularios para usuarios logueados
- **18 productos** organizados en 6 categorías

### 👤 Gestión de Usuarios
- Sistema de **autenticación JWT**
- **Registro con validación de RUT** (opcional)
- **Auto-formateo de RUT** a formato `XX.XXX.XXX-X`
- **Panel de usuario** con historial
- **Validación en tiempo real** de formularios

### 🎨 Diseño y UX
- **Bootstrap 5.3.8** integrado
- **Diseño responsive** (mobile-first)
- **Notificaciones toast** para feedback
- **Animaciones CSS** suaves
- **Interfaz moderna** e intuitiva

### 🧪 Testing Exhaustivo
- **30 tests pasando** (100% success)
- **Mocks de axios** para independencia del backend
- **14 tests de validación de RUT** (algoritmo módulo 11)
- **Cobertura completa**: Componentes + Hooks + Páginas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn
- Backend Spring Boot corriendo en `localhost:8080` (opcional para desarrollo con mocks)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ddoblejotadev/TiendaMiMascota.git

# Navegar al directorio
cd TiendaMiMascota

# Instalar dependencias
npm install

# Crear archivo de configuración de entorno
# Crea .env.local con:
# VITE_API_URL=http://localhost:8080/api

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Configuración del Backend

```bash
# En .env.local (crear si no existe)
VITE_API_URL=http://localhost:8080/api

# Para producción (AWS EC2)
VITE_API_URL=https://tu-ip-ec2.com/api
```

### Ejecutar Pruebas

```bash
# Ejecutar todos los tests (con mocks de axios)
npm test

# Los tests no requieren backend corriendo
# Todos los endpoints están mockeados con vitest
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CartSummary.jsx       # Resumen del carrito
│   ├── Footer.jsx            # Pie de página
│   ├── Header.jsx            # Encabezado con navegación
│   ├── ProductCard.jsx       # Tarjeta de producto
│   ├── ProductFilter.jsx     # Filtros de productos
│   └── ui/                   # Componentes de UI
│       ├── ConfirmDialog.jsx # Diálogo de confirmación
│       └── Notification.jsx  # Notificaciones toast
├── hooks/              # Custom hooks (7 hooks)
│   ├── useAutenticacion.jsx  # ⭐ NUEVO: Integrado con API
│   ├── useCarrito.jsx        # Gestión del carrito
│   ├── useRutValidation.jsx  # ⭐ NUEVO: Validación RUT chileno
│   ├── useForm.jsx           # Manejo de formularios
│   ├── useLocalStorage.jsx   # Persistencia local
│   ├── useProductos.jsx      # ⭐ ACTUALIZADO: Consume API
│   └── useToggle.jsx         # Toggle states
├── pages/              # Páginas de la aplicación
│   ├── Registrarse.jsx      # ⭐ ACTUALIZADO: Con validación RUT
│   ├── IniciarSesion.jsx    # Login con JWT
│   ├── Checkout.jsx         # Proceso de pago
│   ├── CompraExitosa.jsx    # Confirmación exitosa
│   ├── ErrorPago.jsx        # Error en el pago
│   ├── Categorias.jsx       # Vista de categorías
│   ├── Ofertas.jsx          # Productos en oferta
│   └── ... (otras 7 páginas)
├── tests/              # ⭐ ACTUALIZADO: 30 tests pasando
│   ├── useRutValidation.test.jsx  # ⭐ NUEVO: 14 tests
│   ├── useAutenticacion.test.jsx  # ⭐ ACTUALIZADO: Con mocks axios
│   └── ... (otros 10 archivos)
├── util/               # Utilidades
│   ├── constants.js         # ⭐ ACTUALIZADO: API REST integrada
│   ├── formatters.js        # Formateadores (precios, fechas)
│   └── validators.js        # Validadores de formularios
└── .env.local          # ⭐ NUEVO: Configuración de API URL
```

## 🔌 API REST - Endpoints

### Productos
```javascript
GET    /api/productos              // Obtener todos los productos
GET    /api/productos/:id          // Obtener producto por ID
POST   /api/productos              // Crear producto (admin)
PUT    /api/productos/:id          // Actualizar producto (admin)
DELETE /api/productos/:id          // Eliminar producto (admin)
```

### Autenticación
```javascript
POST   /api/auth/login             // Iniciar sesión (retorna JWT)
POST   /api/auth/registro          // Registrar usuario
```

### Usuarios
```javascript
GET    /api/usuarios/:id           // Obtener usuario por ID
PUT    /api/usuarios/:id           // Actualizar perfil
```

## 🆕 Nuevas Funcionalidades (v2.0.0)

### 🔐 Validación de RUT Chileno
- **Hook personalizado** [`useRutValidation.jsx`](src/hooks/useRutValidation.jsx)
- **Algoritmo módulo 11** (estándar chileno)
- **Auto-formateo** a `XX.XXX.XXX-X` al perder focus
- **Validación en tiempo real** con feedback visual
- **Formatos aceptados**: `12345678-K`, `12.345.678-K`, `12 345 678-K`
- **Campo opcional** (permite vacío)
- **14 tests unitarios** cubriendo todos los casos

```javascript
// Uso del hook
const { esRutValido, formatearRut, limpiarRut } = useRutValidation();

// Validar RUT
const esValido = esRutValido('12.345.678-5'); // true

// Formatear RUT
const rutFormateado = formatearRut('12345678-5'); // "12.345.678-5"
```

### 🌐 Integración con Backend
- **Axios configurado** con baseURL e interceptores
- **JWT automático** en headers de cada petición
- **Manejo de errores 401** (token expirado → logout)
- **Timeout de 10 segundos** en peticiones
- **Estructura de datos unificada** con backend y Android

```javascript
// Estructura de Producto sincronizada
{
  id: 1,
  name: "Alimento Premium",
  description: "Descripción del producto",
  price: 25990,
  stock: 50,
  category: "Alimento",
  imageUrl: "url_de_imagen",
  highlighted: true,
  rating: 4.5,
  previousPrice: 29990
}
```

### 🧪 Testing con Mocks
- **Mocks de axios** con vitest
- **Tests independientes** del backend
- **30/30 tests pasando** (100% success)
- **Simulación de respuestas** del servidor

```javascript
// Ejemplo de mock en tests
vi.mock('../util/constants', () => ({
  login: vi.fn((email, password) => 
    Promise.resolve({ id: 1, email, nombre: 'Test' })
  ),
  obtenerProductos: vi.fn(() => 
    Promise.resolve([{ id: 1, name: 'Test Product' }])
  )
}));
```

## 🎯 Funcionalidades Principales

### 📝 Registro de Usuario con RUT
- Formulario completo con validación
- Campo **RUT chileno** (opcional) con:
  - ✅ Validación en tiempo real
  - ✅ Auto-formateo al perder focus
  - ✅ Mensaje de error si RUT inválido
  - ✅ Acepta múltiples formatos
- Integración con backend API
- Redirección automática tras registro exitoso

### 🔐 Autenticación JWT
- Login con email y contraseña
- Token JWT guardado en localStorage
- Interceptor axios para agregar token automáticamente
- Logout automático si token expira (401)
- Protección de rutas privadas

### 🛍️ Catálogo Conectado al Backend
- Productos cargados desde API REST
- Filtrado y búsqueda en tiempo real
- Estados de carga con spinners
- Manejo de errores con mensajes amigables
- Cache en localStorage (opcional)

### 💳 Checkout Inteligente
- Auto-completado de datos si usuario logueado
- Validación de campos requeridos
- Resumen de compra en tiempo real
- Simulación de procesamiento de pago
- Integración futura con pasarela real

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 19.1** - Framework de JavaScript
- **Vite 7.1** - Build tool ultra-rápido
- **React Router 7.9** - Enrutamiento SPA
- **Bootstrap 5.3.8** - Framework CSS
- **Axios 1.7.9** - Cliente HTTP para API REST ⭐ NUEVO

### Testing
- **Vitest 2.1.8** - Framework de testing
- **React Testing Library** - Testing de componentes
- **Mock de Axios** - Tests independientes del backend ⭐ NUEVO

### Backend (Conectado)
- **Spring Boot** - Framework Java
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **REST API** - Arquitectura API

## 🧪 Testing - 30 Tests Pasando

### Componentes (7 archivos)
- Header: 1 test
- Footer: 1 test
- ProductCard: 1 test
- AdminRoute: 3 tests
- AdminPedidos: 1 test
- AdminProductos: 1 test
- AdminUsuarios: 1 test

### Hooks Personalizados (3 archivos)
- ⭐ **useRutValidation**: 14 tests (validación, formateo, casos reales)
- **useAutenticacion**: 3 tests (con mocks de axios)
- **useCarrito**: 2 tests
- **useProductos**: 1 test

### Páginas (1 archivo)
- Inicio: 1 test

### ✅ Resultado Final
```
Test Files  12 passed (12)
     Tests  30 passed (30)
  Start at  [timestamp]
  Duration  ~4s
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Testing
npm test                 # Ejecutar tests (con mocks, no requiere backend)
npm run test:ui          # Interfaz visual de tests
npm run test:coverage    # Generar reporte de cobertura

# Producción
npm run build            # Compilar para producción
npm run preview          # Vista previa de la compilación

# Calidad de código
npm run lint             # Ejecutar ESLint
```

## 🔐 Usuarios de Prueba

```javascript
// Usuario Regular
{
  email: "usuario@example.com",
  password: "password123"
}

// Administrador
{
  email: "admin@mimascota.cl",
  password: "admin123"
}
```

## 🌍 Deploy y Producción

### Frontend (React + Vite)
```bash
# Build de producción
npm run build

# El directorio dist/ contiene los archivos estáticos
# Deploy a: Vercel, Netlify, GitHub Pages, AWS S3, etc.
```

### Variables de Entorno
```bash
# .env.local (desarrollo)
VITE_API_URL=http://localhost:8080/api

# .env.production (producción)
VITE_API_URL=https://api.mimascota.cl
```

### Backend (Spring Boot)
- Deploy en AWS EC2, Heroku, Railway, etc.
- Base de datos MySQL en RDS o similar
- Configurar CORS para permitir frontend

## 📊 Sincronización de Datos

### Estructura Unificada (Frontend ↔ Backend ↔ Android)

```javascript
// Producto (JSON estándar)
{
  "id": 1,
  "name": "Alimento Premium",      // Inglés (estándar)
  "description": "...",
  "price": 25990,
  "stock": 50,
  "category": "Alimento",
  "imageUrl": "url",
  "highlighted": true,
  "rating": 4.5,
  "previousPrice": 29990
}

// Usuario (JSON estándar)
{
  "id": 1,
  "email": "user@example.com",
  "nombre": "Juan Pérez",
  "run": "12.345.678-5",           // RUT chileno (opcional)
  "telefono": "+56912345678",
  "direccion": "Av. Principal 123"
}
```

### Mapeo en React
```javascript
// Los componentes mapean automáticamente
producto.name → Mostrar en UI como "Nombre"
producto.price → Formatear con formatCurrency()
producto.run → Validar con useRutValidation()
```

### Mapeo en Android (Kotlin)
```kotlin
data class Producto(
    val id: Int,
    val name: String,
    val description: String?,
    val price: Int,
    // ...
)
```

## ✅ Cumplimiento de Requisitos

### Requisitos Funcionales
✅ **5 Nuevas Vistas**: Categorías, Checkout, Compra Exitosa, Error Pago, Ofertas  
✅ **Framework Bootstrap**: Integrado completamente  
✅ **Auto-completado en Checkout**: Implementado  
✅ **Simulación de Pago**: 90% éxito, 10% fallo  
✅ **Validación de RUT**: Algoritmo módulo 11 ⭐ NUEVO  
✅ **Integración Backend**: API REST completa ⭐ NUEVO  

### Requisitos Técnicos
✅ **Testing Completo**: 30/30 tests pasando ⭐ ACTUALIZADO  
✅ **Mocks de API**: Tests independientes del backend ⭐ NUEVO  
✅ **Validación de RUT**: 14 tests unitarios ⭐ NUEVO  
✅ **Autenticación JWT**: Con interceptores ⭐ NUEVO  
✅ **Estructura Unificada**: Frontend-Backend-Android ⭐ NUEVO  

## 🎓 Contexto Académico

**Asignatura**: DSY1104 - Desarrollo Web  
**Institución**: Duoc UC  
**Evaluación**: Proyecto Full-Stack Completo  
**Tecnologías**: React + Spring Boot + MySQL  

## 📝 Próximas Mejoras

- [ ] Panel de administración completo
- [ ] Sistema de reviews y ratings
- [ ] Integración con pasarela de pago real (Webpay, MercadoPago)
- [ ] Tracking de pedidos en tiempo real
- [ ] Sistema de favoritos/wishlist
- [ ] Notificaciones push
- [ ] Chat en vivo con soporte
- [ ] Comparador de productos
- [ ] Recomendaciones basadas en IA

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autores

**ddoblejotadev**
- GitHub: [@ddoblejotadev](https://github.com/ddoblejotadev)

**yasser-duoc**
- GitHub: [@yasser-duoc](https://github.com/yasser-duoc)

## 🙏 Agradecimientos

- Comunidad de React y Vite
- Bootstrap Team
- Duoc UC - Profesores y compañeros
- Recursos educativos de código abierto

---

## 📚 Changelog

### v2.0.0 (Fecha actual)
- ✨ Integración completa con backend Spring Boot via API REST
- ✨ Validación de RUT chileno con algoritmo módulo 11
- ✨ Auto-formateo de RUT a formato estándar
- ✨ Autenticación JWT con interceptores
- ✨ Mocks de axios para testing independiente
- ✨ 30/30 tests pasando (100% success)
- ✨ Estructura de datos unificada Frontend-Backend-Android
- 🐛 Corregidos tests de validación de RUT
- 📝 README actualizado con nueva documentación

### v1.0.0
- ✨ Versión inicial con 5 nuevas vistas
- ✨ Sistema de carrito de compras
- ✨ Autenticación de usuarios
- ✨ 103 tests implementados
- ✨ Bootstrap 5.3.8 integrado

---

⭐ **¡Dale una estrella al proyecto si te ha sido útil!**

**Desarrollado con ❤️ usando React + Vite + Spring Boot**
