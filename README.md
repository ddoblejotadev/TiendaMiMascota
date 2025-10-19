# 🐾 TiendaMiMascota - React + Vite

[![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646cff.svg)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-blue.svg)](https://getbootstrap.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6e9f18.svg)](https://vitest.dev/)
[![React Router](https://img.shields.io/badge/React%20Router-7.9.4-f44250.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Tienda online moderna para productos de mascotas**, migrada completamente a **React + Vite**. Sistema completo de e-commerce con autenticación, gestión de roles, carrito de compras, paneles de administración y más de 100 pruebas unitarias.

> 🚀 **Versión Vite:** Migración exitosa del proyecto original de vanilla JS a React con Vite, mejorando rendimiento, mantenibilidad y escalabilidad.

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

### Frontend - Stack Moderno
- **React 19.1.1** - Librería de UI con componentes reutilizables
- **Vite 7.1.12** - Bundler ultra-rápido con HMR instantáneo
- **React Router 7.9.4** - Enrutamiento declarativo y moderno
- **Bootstrap 5.3.8** - Framework CSS responsive
- **JavaScript ES6+** - Sintaxis moderna y características avanzadas

### Testing & Calidad
- **Vitest 3.2.4** - Framework de testing de próxima generación
- **React Testing Library** - Herramientas para testear componentes React
- **ESLint 9.36.0** - Linter para código limpio y consistente
- **103 pruebas unitarias** - Cobertura completa de funcionalidades

### Estado & Context
- **React Context API** - Gestión de estado global (carrito, autenticación)
- **Custom Hooks** - Lógica reutilizable en múltiples componentes
- **localStorage API** - Persistencia de datos en cliente

### Desarrollo
- **Node.js** - Entorno de ejecución JavaScript
- **npm** - Gestor de dependencias
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto

## 📊 Comparación: Antes (Vanilla JS) vs Después (React + Vite)

| Aspecto | Antes | Después | Mejora |
|---------|-------|---------|---------|
| **Bundler** | No (archivos sueltos) | Vite | ✅ HMR instantáneo |
| **Componentes** | Funciones HTML dispersas | Componentes React | ✅ Reutilizables |
| **Gestión de Estado** | Variables globales | Hooks + Context | ✅ Más limpio |
| **Rendering** | DOM manual | Virtual DOM | ✅ Más eficiente |
| **Testing** | Difícil | Fácil con Vitest | ✅ 103 tests |
| **Rendimiento** | Lento en dev | Vite (480ms dev) | ✅ 10x más rápido |
| **Escalabilidad** | Limitada | Excelente | ✅ Código mantenible |

## 📁 Estructura del Proyecto (Vite + React)

```
Vite-TiendaMiMascota/
├── 📄 package.json                  # Dependencias y scripts
├── 📄 vite.config.js                # Configuración de Vite
├── 📄 eslint.config.js              # Configuración de ESLint
├── 📁 public/                       # Archivos estáticos públicos
├── 📁 src/                          # Código fuente
│   ├── 📄 main.jsx                  # Punto de entrada
│   ├── 📄 App.jsx                   # Componente raíz
│   ├── 📁 components/               # Componentes reutilizables
│   │   ├── Header.jsx               # Navegación principal
│   │   ├── Footer.jsx               # Pie de página
│   │   ├── ProductCard.jsx          # Tarjeta de producto
│   │   ├── CartSummary.jsx          # Resumen del carrito
│   │   ├── ProductFilter.jsx        # Filtros de productos
│   │   ├── AdminRoute.jsx           # Ruta protegida admin
│   │   └── ui/
│   │       ├── Notification.jsx     # Notificaciones
│   │       └── ConfirmDialog.jsx    # Diálogos de confirmación
│   ├── � pages/                    # Páginas (vistas)
│   │   ├── Inicio.jsx               # Página de inicio
│   │   ├── Productos.jsx            # Catálogo de productos
│   │   ├── Carrito.jsx              # Carrito de compras
│   │   ├── Checkout.jsx             # Proceso de compra
│   │   ├── DetalleProducto.jsx      # Detalle individual
│   │   ├── IniciarSesion.jsx        # Login
│   │   ├── Registrarse.jsx          # Registro
│   │   ├── Contacto.jsx             # Formulario contacto
│   │   ├── Blog.jsx                 # Artículos del blog
│   │   ├── admin/
│   │   │   ├── AdminProductos.jsx   # CRUD de productos
│   │   │   ├── AdminUsuarios.jsx    # CRUD de usuarios
│   │   │   └── AdminPedidos.jsx     # Gestión de órdenes
│   │   └── ...más páginas
│   ├── 📁 hooks/                    # Custom hooks
│   │   ├── useProductos.jsx         # Hook para productos
│   │   ├── useCarrito.jsx           # Hook para carrito
│   │   ├── useAutenticacion.jsx     # Hook para auth
│   │   ├── useForm.jsx              # Hook para formularios
│   │   ├── useLocalStorage.jsx      # Hook para localStorage
│   │   └── ...más hooks
│   ├── � context/                  # React Context
│   │   ├── CartContext.jsx          # Contexto del carrito
│   │   └── AuthContext.jsx          # Contexto de autenticación
│   ├── 📁 services/                 # Servicios de datos
│   │   ├── productService.js        # Lógica de productos
│   │   ├── authService.js           # Lógica de autenticación
│   │   ├── cartService.js           # Lógica del carrito
│   │   ├── adminProductService.js   # Admin: productos
│   │   └── adminUserService.js      # Admin: usuarios
│   ├── 📁 layouts/                  # Layouts reutilizables
│   │   ├── MainLayout.jsx           # Layout principal
│   │   └── AdminLayout.jsx          # Layout administración
│   ├── � util/                     # Utilidades
│   │   ├── constants.js             # Constantes
│   │   ├── validators.js            # Validaciones
│   │   └── formatters.js            # Formateadores
│   ├── 📁 tests/                    # Pruebas unitarias (103 tests)
│   │   ├── Inicio.test.jsx
│   │   ├── Productos.test.jsx
│   │   ├── ProductCard.test.jsx
│   │   ├── AdminProductos.test.jsx
│   │   ├── AdminUsuarios.test.jsx
│   │   ├── useProductos.test.jsx
│   │   ├── useCarrito.test.jsx
│   │   └── ...más tests
│   ├── 📄 App.css                   # Estilos globales
│   └── 📄 index.css                 # Estilos base
└── � node_modules/                 # Dependencias instaladas
```

## 🚀 Instalación y Setup

### Prerrequisitos
- **Node.js** 16+ (verificar con `node --version`)
- **npm** 7+ (verificar con `npm --version`)
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ddoblejotadev/TiendaMiMascota.git
   cd TiendaMiMascota/Vite-TiendaMiMascota
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre: `http://localhost:5173`

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia Vite con HMR

# Testing
npm run test            # Ejecuta todas las pruebas
npm run test:ui         # Interfaz visual de pruebas
npm run test:coverage   # Cobertura de código

# Linting
npm run lint            # Verifica código con ESLint

# Build Producción
npm run build           # Genera build optimizado
npm run preview         # Vista previa del build
```

## 📖 Uso y Guías

### Para Usuarios Normales
1. **Navegar catálogo** - Ver todos los productos disponibles
2. **Filtrar por categoría** - Encontrar productos específicos
3. **Ver detalles** - Información completa de cada producto
4. **Agregar carrito** - Seleccionar cantidad y agregar
5. **Registrarse** - Crear cuenta con email validado
6. **Realizar compra** - Checkout y confirmación

### Para Administradores
1. **Iniciar sesión** - admin@duoc.cl / admin123
2. **Panel Admin** - Acceso a todas las funcionalidades
3. **Gestionar productos** - CRUD completo con validaciones
4. **Gestionar usuarios** - Crear, editar, eliminar usuarios
5. **Ver estadísticas** - Dashboard con métricas clave
6. **Cambiar roles** - Asignar permisos a usuarios

### Para Vendedores
1. **Iniciar sesión** - vendedor@duoc.cl / pass1234
2. **Ver productos** - Catálogo completo (solo lectura)
3. **Ver órdenes** - Historial de compras de clientes
4. **Ver estadísticas** - Gráficos de ventas básicos

## 👥 Usuarios de Prueba

### 🛡️ Administrador (Acceso Total)
```
Email:      admin@duoc.cl
Contraseña: admin123
Permisos:   CRUD de todo, estadísticas, gestión completa
```

### 🏪 Vendedor (Solo Lectura)
```
Email:      vendedor@duoc.cl
Contraseña: pass1234
Permisos:   Ver productos, ver órdenes, estadísticas básicas
```

### 👤 Cliente (Comprador)
```
Email:      cliente@gmail.com
Contraseña: pass1234
Permisos:   Compras, carrito, perfil
```

*Nota: Puedes registrar más usuarios desde el formulario de registro.*

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

## 🎓 Migración: Vanilla JS → React + Vite

### Objetivos de la Migración

Este proyecto fue migrado de Vanilla JavaScript a React + Vite como parte del curso de Evaluación Formativa Full Stack. Los principales objetivos fueron:

- ✅ **Modernizar el stack tecnológico** - De vanilla JS a React 19
- ✅ **Mejorar experiencia de desarrollo** - Con Vite y HMR instantáneo
- ✅ **Aumentar mantenibilidad** - Componentes reutilizables y hooks
- ✅ **Agregar cobertura de tests** - 103 pruebas unitarias con Vitest
- ✅ **Implementar mejores prácticas** - Context API, custom hooks, service layer

### Logros Principales

| Aspecto | Resultado |
|---------|-----------|
| **Componentes React** | 20+ componentes funcionales |
| **Custom Hooks** | 7+ hooks reutilizables |
| **Pruebas Unitarias** | 103 tests con cobertura |
| **Páginas** | 18 páginas + subrutas |
| **Tiempo de Dev** | De 15s a 480ms con Vite |
| **Tamaño Bundle** | Optimizado con tree-shaking |
| **Rendimiento** | Virtual DOM + React.lazy |

### Características Implementadas

#### 🎨 Componentes Reutilizables
- `ProductCard` - Tarjeta de producto con badges inteligentes
- `Header` - Navegación con búsqueda integrada
- `Footer` - Pie de página completo
- `CartSummary` - Resumen dinámico del carrito
- `AdminRoute` - Rutas protegidas para admin
- `Notification` - Sistema de notificaciones
- `ConfirmDialog` - Diálogos de confirmación

#### 🪝 Custom Hooks
- `useProductos()` - Gestión de productos con filtrado
- `useCarrito()` - Lógica del carrito de compras
- `useAutenticacion()` - Autenticación y roles
- `useForm()` - Manejo de formularios controlados
- `useLocalStorage()` - Persistencia en localStorage
- `useToggle()` - Estados booleanos comunes

#### 🧪 Pruebas Unitarias (Vitest)
```javascript
// Ejemplo: Testing de hook
import { renderHook, waitFor } from '@testing-library/react';
import { useProductos } from './useProductos';

test('carga productos al montar', async () => {
  const { result } = renderHook(() => useProductos());
  
  await waitFor(() => {
    expect(result.current.cargando).toBe(false);
    expect(result.current.productos.length).toBeGreaterThan(0);
  });
});
```

#### 🏗️ Arquitectura Moderna
```
Services Layer (productService, authService)
        ↓
Hooks Layer (useProductos, useCarrito)
        ↓
Context Layer (CartContext, AuthContext)
        ↓
Component Layer (Pages + Components)
```

### Comparación de Rendimiento

**Antes (Vanilla JS):**
- Desarrollo: ~15 segundos para cambios
- Build: No optimizado
- Testing: Manual, sin automatización
- Estado: Variables globales dispersas

**Después (React + Vite):**
- Desarrollo: ~480ms (HMR instantáneo) ⚡
- Build: Optimizado con tree-shaking
- Testing: 103 tests automáticos ✅
- Estado: Context API + Hooks centralizados

### Tecnologías Aprendidas

- **React 19.1.1** - Componentes funcionales, Hooks, Context API
- **Vite 7.1.12** - Bundler moderno con dev server ultra-rápido
- **React Router 7.9.4** - Enrutamiento SPA declarativo
- **Vitest 3.2.4** - Testing framework de próxima generación
- **React Testing Library** - Testing enfocado en UX
- **ESLint** - Linting automático y consistencia de código

### Patrón: Página Productos (Caso de Estudio)

La página de Productos es un excelente ejemplo de la arquitectura React moderna:

```
Productos.jsx (componente página)
    ├── usa: useProductos() hook
    ├── usa: ProductCard componente
    └── mapea: list rendering
        └── ProductCard.jsx
            ├── props: { producto }
            ├── usa: useCarrito() hook
            └── usa: React Router Link
```

**Flujo de datos:**
1. `Productos.jsx` consume `useProductos()` hook
2. Hook gestiona: cargando, productos, busqueda, filtros
3. ProductCard recibe producto como prop
4. ProductCard usa `useCarrito()` para agregar al carrito

**Testing:**
- `useProductos.test.jsx` - Verifica lógica del hook
- `ProductCard.test.jsx` - Verifica renderizado del componente

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

## 📧 Contacto y Soporte

¿Preguntas o sugerencias? Ponte en contacto:

- 📧 **Email:** ddoblejotadev@gmail.com
- 🐙 **GitHub:** [@ddoblejotadev](https://github.com/ddoblejotadev)
- 💼 **LinkedIn:** [Tu perfil](https://linkedin.com)

## 📝 Notas Importantes

- Este proyecto utiliza **localStorage** para persistencia (no base de datos backend)
- Las credenciales son para propósitos educativos/demo
- El proyecto está optimizado para navegadores modernos (Chrome, Firefox, Safari, Edge)
- Se recomienda usar Node.js 16+ para mejor compatibilidad

## 🎓 Créditos Educativos

Proyecto desarrollado como parte de la evaluación formativa del curso **Desarrollo Fullstack** del Instituto DUOC UC.

**Evaluación:** Migración de proyecto Vanilla JS a React + Vite  
**Stack:** React 19 + Vite 7 + Vitest + React Testing Library  
**Pruebas:** 103 tests unitarios  
**Versión:** 2.0 (React + Vite migrado)

---


*Actualizado: Octubre 2025*

</div>
