# 🐾 TiendaMiMascota - E-commerce para Mascotas

![React](https://img.shields.io/badge/React-19.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![React Router](https://img.shields.io/badge/React_Router-7.9-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet)
![Tests](https://img.shields.io/badge/Tests-103_pruebas-brightgreen)
![Status](https://img.shields.io/badge/Status-Completado-success)

## 📖 Descripción

TiendaMiMascota es una tienda en línea completa y funcional especializada en productos para mascotas. Desarrollada con **React 19**, **Vite**, **React Router** y **Bootstrap 5**, ofrece una experiencia de compra moderna, fluida y completamente probada.

> **✅ Proyecto completo según requisitos de Evaluación Parcial 2 - DSY1104 (Duoc UC)**

## ✨ Características Principales

### 🛍️ E-commerce Completo
- **Catálogo de productos** con filtros avanzados y búsqueda en tiempo real
- **Carrito de compras** funcional con persistencia en localStorage
- **Proceso de checkout** completo con formulario de envío
- **5 vistas nuevas**: Categorías, Checkout, Compra Exitosa, Error Pago, Ofertas
- **Cálculo automático** de descuentos y envío gratis (>$50.000)
- **18 productos** organizados en 6 categorías

### 👤 Gestión de Usuarios
- Sistema de **autenticación** completo (login/registro)
- **Auto-completado** de datos en checkout si el usuario está logueado
- **Panel de usuario** con historial de compras
- **Validación de formularios** en tiempo real

### 🎨 Diseño y UX
- **Bootstrap 5.3.8** integrado (CSS + JavaScript)
- **Diseño responsive** optimizado para móviles, tablets y desktop
- **Notificaciones toast** para feedback inmediato
- **Animaciones CSS** suaves y profesionales
- **Interfaz moderna** e intuitiva

### 🧪 Testing Exhaustivo
- **103 casos de prueba** implementados con Vitest
- **13 archivos de test** cubriendo componentes, hooks y páginas
- **4 tipos de pruebas**: Renderizado, Props, Estado y Eventos
- **Cobertura completa**: 11 componentes + 3 hooks + 3 páginas principales

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ddoblejotadev/TiendaMiMascota.git

# Navegar al directorio
cd TiendaMiMascota

# Instalar dependencias (incluyendo dependencias de testing)
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Ejecutar Pruebas

```bash
# Ejecutar todos los tests una vez
npm test

# Ejecutar tests en modo watch (auto-recarga)
npm run test

# Ejecutar tests con interfaz visual
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables (11 componentes)
│   ├── CartSummary.jsx       # Resumen del carrito
│   ├── Footer.jsx            # Pie de página
│   ├── Header.jsx            # Encabezado con navegación
│   ├── ProductCard.jsx       # Tarjeta de producto
│   ├── ProductFilter.jsx     # Filtros de productos
│   └── ui/                   # Componentes de UI
│       ├── ConfirmDialog.jsx # Diálogo de confirmación
│       └── Notification.jsx  # Notificaciones toast
├── hooks/              # Custom hooks (6 hooks)
│   ├── useAutenticacion.jsx  # Gestión de autenticación
│   ├── useCarrito.jsx        # Gestión del carrito
│   ├── useForm.jsx           # Manejo de formularios
│   ├── useLocalStorage.jsx   # Persistencia local
│   ├── useProductos.jsx      # Gestión de productos
│   └── useToggle.jsx         # Toggle states
├── layouts/            # Layouts de páginas
│   └── MainLayout.jsx        # Layout principal
├── pages/              # Páginas de la aplicación (14 páginas)
│   ├── Acerca.jsx           # Acerca de nosotros
│   ├── Carrito.jsx          # Carrito de compras
│   ├── Categorias.jsx       # ⭐ NUEVO: Vista de categorías
│   ├── Checkout.jsx         # ⭐ NUEVO: Proceso de pago
│   ├── CompraExitosa.jsx    # ⭐ NUEVO: Confirmación exitosa
│   ├── Contacto.jsx         # Formulario de contacto
│   ├── DetalleProducto.jsx  # Detalle del producto
│   ├── ErrorPago.jsx        # ⭐ NUEVO: Error en el pago
│   ├── Inicio.jsx           # Página de inicio
│   ├── IniciarSesion.jsx    # Login
│   ├── NoEncontrado.jsx     # Página 404
│   ├── Ofertas.jsx          # ⭐ NUEVO: Productos en oferta
│   ├── Productos.jsx        # Catálogo de productos
│   └── Registrarse.jsx      # Registro de usuario
├── services/           # Servicios y lógica de negocio
│   ├── authService.js       # Servicio de autenticación
│   ├── cartService.js       # Servicio del carrito
│   └── productService.js    # Servicio de productos
├── styles/             # Estilos CSS modulares
│   ├── global.css
│   ├── components/          # Estilos de componentes
│   └── pages/              # Estilos de páginas
├── tests/              # ⭐ NUEVO: Pruebas unitarias (13 archivos, 103 tests)
│   ├── setupTests.js            # Configuración de testing
│   ├── Header.test.jsx          # 5 tests
│   ├── Footer.test.jsx          # 4 tests
│   ├── ProductCard.test.jsx     # 8 tests
│   ├── ProductFilter.test.jsx   # 7 tests
│   ├── CartSummary.test.jsx     # 7 tests
│   ├── ConfirmDialog.test.jsx   # 7 tests
│   ├── Notification.test.jsx    # 11 tests
│   ├── useCarrito.test.jsx      # 11 tests
│   ├── useProductos.test.jsx    # 6 tests
│   ├── useAutenticacion.test.jsx # 10 tests
│   ├── Inicio.test.jsx          # 4 tests
│   ├── Productos.test.jsx       # 8 tests
│   └── Carrito.test.jsx         # 15 tests
└── util/               # Utilidades
    ├── constants.js         # Constantes de la app
    ├── formatters.js        # Formateadores (precios, fechas)
    └── validators.js        # Validadores de formularios
```

## 🎯 Funcionalidades Principales

### 🏠 Página de Inicio
- Hero section con llamadas a la acción
- Grid de categorías principales con Bootstrap
- Productos destacados
- Sección de características con iconos
- Integración completa con el sistema de productos

### 📦 Categorías (⭐ NUEVA)
- Grid responsive de categorías
- Filtrado interactivo por categoría
- Contador de productos por categoría
- Navegación con breadcrumbs
- Diseño con Bootstrap grid system

### 🛍️ Catálogo de Productos
- Visualización en grid responsive (Bootstrap)
- Filtros por categoría y búsqueda en tiempo real
- Ordenamiento por nombre y precio
- Estados de carga con spinners
- ProductCard component reutilizable
- Badges de stock y categoría

### 🔍 Detalle de Producto
- Información completa del producto
- Selector de cantidad con validación de stock
- Botón "Agregar al carrito" con feedback
- Breadcrumb navigation
- Diseño responsive con Bootstrap

### 🛒 Carrito de Compras
- Lista completa de productos agregados
- Actualizar cantidad o eliminar productos
- Cálculo automático de subtotal, envío y total
- Envío GRATIS en compras sobre $50.000
- Botón para vaciar carrito con confirmación
- Persistencia en localStorage
- Integración con Checkout

### 💳 Checkout (⭐ NUEVA)
- Formulario completo de datos de envío (Bootstrap Forms)
- **Auto-completado** de datos si el usuario está logueado (requisito PDF)
- Selector de método de pago (radio buttons)
- Resumen de compra con sticky positioning
- Validación de campos requeridos
- Simulación de procesamiento de pago (90% éxito, 10% fallo)
- Redirección a CompraExitosa o ErrorPago según resultado

### ✅ Compra Exitosa (⭐ NUEVA)
- Confirmación visual con animación de checkmark
- Número de orden único generado
- Resumen de productos comprados
- Información de envío
- Total pagado
- Botón para volver a la tienda

### ❌ Error de Pago (⭐ NUEVA)
- Mensaje de error con animación visual
- Razones del rechazo del pago
- Recomendaciones para el usuario
- Botón para reintentar el pago
- Botón para volver al carrito
- Diseño con Bootstrap alerts

### 🏷️ Ofertas (⭐ NUEVA)
- Banner destacado con gradiente
- Productos con descuento (<$15.000)
- Badges de descuento animados
- Grid responsive de productos
- Filtrado automático de productos en oferta

### 👤 Autenticación
- Registro de nuevos usuarios
- Inicio de sesión
- Validación de formularios
- Persistencia de sesión

### � Autenticación
- Sistema de registro con validación completa
- Inicio de sesión con credenciales
- Persistencia de sesión en localStorage
- Auto-completado de datos en Checkout si está logueado

### �📞 Contacto
- Formulario de contacto con validación
- Información de la empresa
- Redes sociales

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 19.1** - Framework de JavaScript para UI
- **Vite 7.1** - Build tool y dev server ultra-rápido
- **React Router 7.9** - Enrutamiento SPA
- **Bootstrap 5.3.8** - Framework CSS (CSS + JS Bundle)

### Testing
- **Vitest 2.1.8** - Framework de testing moderno
- **React Testing Library** - Testing de componentes React
- **@testing-library/jest-dom** - Matchers personalizados
- **@testing-library/user-event** - Simulación de interacciones
- **jsdom** - Implementación de DOM para Node.js

### Persistencia
- **localStorage** - Almacenamiento local del navegador

### Estilos
- **CSS3 Modular** - Estilos organizados por componente
- **Bootstrap Utilities** - Clases utilitarias de Bootstrap
- **CSS Custom Properties** - Variables CSS para temas
- **Animaciones CSS** - Transiciones y animaciones suaves

## 🧪 Testing

### Cobertura de Pruebas
El proyecto incluye **103 casos de prueba** organizados en 13 archivos:

#### Componentes (49 tests)
- Header: 5 tests
- Footer: 4 tests  
- ProductCard: 8 tests
- ProductFilter: 7 tests
- CartSummary: 7 tests
- ConfirmDialog: 7 tests
- Notification: 11 tests

#### Hooks Personalizados (27 tests)
- useCarrito: 11 tests
- useProductos: 6 tests
- useAutenticacion: 10 tests

#### Páginas (27 tests)
- Inicio: 4 tests
- Productos: 8 tests
- Carrito: 15 tests

### Tipos de Pruebas Implementadas
1. **Renderizado** (49 tests): Verificación de estructura DOM
2. **Props** (28 tests): Validación de propiedades de componentes
3. **Estado** (27 tests): Gestión de estado en hooks y componentes
4. **Eventos** (15 tests): Interacciones del usuario (clicks, inputs)

## 📦 Productos Incluidos

El proyecto incluye 18 productos de ejemplo en 6 categorías:

- 🍖 **Alimento** - Alimentos balanceados premium
- 🧸 **Juguetes** - Pelotas, cuerdas, ratones, rascadores
- 🎀 **Accesorios** - Collares, correas, arneses, comederos
- 🧼 **Higiene** - Shampoo, cepillos, kit dental
- 💊 **Salud** - Vitaminas, antipulgas, probióticos
- 🛏️ **Camas** - Camas ortopédicas, acolchadas, iglú

## 👨‍💻 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo en puerto 5173

# Testing
npm test                 # Ejecutar tests una vez
npm run test:ui          # Interfaz visual de tests (recomendado)
npm run test:coverage    # Generar reporte de cobertura

# Producción
npm run build            # Compilar para producción
npm run preview          # Vista previa de la compilación

# Calidad de código
npm run lint             # Ejecutar ESLint
```

## 🔐 Usuarios de Prueba

```
Usuario Regular:
Email: usuario@example.com
Password: password123

Administrador (para funcionalidades futuras):
Email: admin@mimascota.cl
Password: admin123
```

## 🎨 Características de Diseño

### UX/UI Moderna
- **Bootstrap 5.3.8** como base del diseño
- **Grid System** responsive (12 columnas)
- **Componentes Bootstrap**: Cards, Forms, Buttons, Badges, Alerts
- **Paleta de colores** moderna y amigable para mascotas
- **Tipografía** clara con fuentes web modernas

### Responsive Design
- **Mobile First**: Optimizado para móviles
- **Breakpoints**: xs, sm, md, lg, xl
- **Navegación adaptativa**: Menú hamburguesa en móvil
- **Grids flexibles**: Ajuste automático de columnas

### Animaciones y Transiciones
- **Animaciones CSS** personalizadas (checkmark, error-x)
- **Hover effects** en botones y cards
- **Loading spinners** de Bootstrap
- **Transiciones suaves** entre estados

### Accesibilidad
- **Aria-labels** en elementos interactivos
- **HTML semántico** (nav, main, article, section)
- **Contraste** adecuado en textos
- **Focus visible** en navegación por teclado

## 📄 Documentación

- **README.md** (este archivo): Guía completa del proyecto

## ✅ Cumplimiento de Requisitos (Evaluación Parcial 2)

### Requisitos Funcionales
✅ **5 Nuevas Vistas**: Categorías, Checkout, Compra Exitosa, Error Pago, Ofertas  
✅ **Framework Bootstrap**: Integrado (CSS + JS Bundle)  
✅ **Auto-completado en Checkout**: Implementado si usuario está logueado  
✅ **Simulación de Pago**: 90% éxito, 10% fallo  
✅ **Navegación Completa**: 14 rutas con React Router  

### Requisitos Técnicos
✅ **Testing Completo**: 103 tests (4 tipos)  
✅ **Renderizado**: 49 tests en 11 componentes  
✅ **Props**: 28 tests en 5 componentes  
✅ **Estado**: 27 tests en 3 hooks (mínimo 6 ✅)  
✅ **Eventos**: 15 tests en 5 componentes (mínimo 5 ✅)  

### Documentación
✅ **README actualizado**: Con toda la información  
✅ **Documento de Cobertura**: Análisis completo de tests  
✅ **Comentarios en código**: Explicativos y claros  

## 🎓 Contexto Académico

**Asignatura**: DSY1104 - Desarrollo Web  
**Institución**: Duoc UC  
**Evaluación**: Parcial 2  
**Objetivo**: Implementar vistas adicionales con framework CSS y testing exhaustivo

## 📝 Próximas Mejoras

- [ ] Implementar backend real
- [ ] Agregar panel de administración
- [ ] Sistema de reviews y comentarios
- [ ] Integración con pasarelas de pago
- [ ] Tracking de pedidos
- [ ] Sistema de favoritos/wishlist
- [ ] Comparador de productos
- [ ] Chat en vivo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Forkea el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**ddoblejotadev**
- GitHub: [@ddoblejotadev](https://github.com/ddoblejotadev)
- GitHub: [@yasser-duoc](https://github.com/yasser-duoc)
## 🙏 Agradecimientos

- Imágenes de productos de uso educativo
- Iconos de emojis nativos
- Comunidad de React y Vite

---

⭐ Si te ha gustado este proyecto, ¡no olvides darle una estrella!

**Desarrollado con ❤️ y React**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
