# 🐾 TiendaMiMascota - E-commerce Full-Stack para Mascotas

![React](https://img.shields.io/badge/React-19.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![React Router](https://img.shields.io/badge/React_Router-7.9-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-blueviolet)
![Axios](https://img.shields.io/badge/Axios-1.7-green)
![Tests](https://img.shields.io/badge/Tests-30/30_passing-brightgreen)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)

## 📖 Descripción

## Índice

- [Descripción](#📖-descripción)
- [Características Principales](#✨-características-principales)
- [Arquitectura Full-Stack](#🌐-arquitectura-full-stack)
- [E-commerce Completo](#🛍️-e-commerce-completo)
- [Gestión de Usuarios](#👤-gestión-de-usuarios)
- [Diseño y UX](#🎨-diseño-y-ux)
- [Inicio rápido](#inicio-rápido)
- [Scripts útiles](#scripts-útiles)
- [Notas sobre Admin → Pedidos](#notas-sobre-admin-→-pedidos)
- [Pruebas](#pruebas)
- [Estructura del Proyecto](#📁-estructura-del-proyecto-resumen)
- [API REST - Endpoints](#🔌-api-rest---endpoints-resumen)
- [Testing (detalles)](#🧪-testing-detalles)
- [Contribuir](#contribuir)
- [Contacto](#contacto)
- [Licencia](#📄-licencia)
- [Autores](#👤-autores)
- [Changelog](#📚-changelog)

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

# 🐾 TiendaMiMascota

Frontend React + Vite para una tienda online de productos para mascotas.

Últimas actualizaciones (noviembre 2025):
- Admin Pedidos: filtro con debounce, normalización de items (mejor extracción de nombre/imagen/precio), y polling en background que hace merge (no reemplazo) para evitar que la vista de detalle se cierre.
- Vista de detalle de pedido: diseño en dos columnas (datos de envío + lista de items con miniaturas).

Este README resume cómo levantar el proyecto, ejecutar tests y probar las mejoras del panel administrador.

## Requisitos
- Node.js 16+ y `npm`.
- Backend (opcional) en `http://localhost:8080/api` si quieres probar integración real.

## Inicio rápido (Windows - cmd.exe)

1) Clona el repo y entra a la carpeta:

```cmd
git clone https://github.com/ddoblejotadev/TiendaMiMascota.git
cd TiendaMiMascota
```

2) Instala dependencias:

```cmd
npm install
```

3) Crea `.env.local` en la raíz (opcional):

```
VITE_API_URL=http://localhost:8080/api
```

4) Inicia en modo desarrollo:

```cmd
npm run dev
```

La app por defecto queda en `http://localhost:5173`.

## Scripts útiles

```cmd
npm run dev        # servidor de desarrollo
npm run build      # compilar para producción
npm run preview    # preview de la build
npm test           # ejecutar tests (vitest)
npm run lint       # ejecutar ESLint
```

## Notas sobre Admin → Pedidos

- Ruta admin pedidos: `/admin/pedidos` (desde el panel administrador).
- Filtro de usuario con debounce para evitar llamadas innecesarias al backend.
- Polling de órdenes cada 30s realiza un *merge* de los datos entrantes con los ya cargados: esto evita remounts que cierran el detalle expandido.
- Si ves items con `No img`, puede ser que el backend no esté devolviendo URL de imagen en las claves esperadas; puedes enviar un ejemplo del payload y lo adapto.

Para probar manualmente:
1. Abre `http://localhost:5173/admin/pedidos`.
2. Haz click en `Ver` en un pedido para expandir su detalle.
3. Espera ~30s o pulsa `Refrescar` y verifica que el detalle permanezca abierto.

## Pruebas

```cmd
npm test
```

Los tests usan mocks para aislar el frontend del backend.

## Contribuir

1. Fork
2. Crear rama `feature/xxxx`
3. Commit y push
4. Abrir PR

## Contacto

Si quieres que adapte la normalización de items o que implemente enriquecimiento automático (consultando `productService.obtenerProductoPorId` para rellenar nombre/imagen/precio faltantes), pásame un ejemplo del payload de `pedido` (puedes ocultar datos sensibles) y lo ajusto.

---

Actualicé el README para incluir instrucciones claras de uso en Windows y notas sobre las mejoras recientes en el panel administrador.

**Si quieres más detalles (sección de arquitectura, endpoints o changelog completo), dime y lo añado.**

## 📁 Estructura del Proyecto (resumen)

```
src/
├── components/          # Componentes reutilizables
│   ├── CartSummary.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── ProductFilter.jsx
│   └── ui/               # ConfirmDialog, Notification, etc.
├── hooks/               # Custom hooks (useAutenticacion, useCarrito, useRutValidation...)
├── pages/               # Páginas (Inicio, Productos, Carrito, Checkout, Admin/)
├── services/            # Lógica de llamadas API (productService, adminOrderService...)
├── context/             # Contextos (CartContext, AuthContext)
├── util/                # Utilidades (constants, formatters, validators)
└── tests/               # Tests unitarios y de integración (vitest + RTL)
```

## 🔌 API REST - Endpoints (resumen)

### Productos
```
GET    /api/productos
GET    /api/productos/:id
POST   /api/productos
PUT    /api/productos/:id
DELETE /api/productos/:id
```

### Autenticación
```
POST   /api/auth/login
POST   /api/auth/registro
```

### Usuarios
```
GET    /api/usuarios/:id
PUT    /api/usuarios/:id
```

### Pedidos (Admin)
```
GET    /api/ordenes?page=&size=&q=
PUT    /api/ordenes/:id   # actualizar estado/datos de la orden
```

Nota: el frontend intenta ser tolerante a distintas rutas (`/ordenes`, `/pedidos`, `/orders`) y distintos shapes en la respuesta (array directo, `content`, `data`).

## 🧪 Testing (detalles)

- Tests con `vitest` y `@testing-library/react`.
- Mocks de axios para independencia del backend.
- Carpetas y archivos de tests en `src/tests/`.

Ejecutar tests:
```cmd
npm test
```

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

## 📚 Changelog

### v2.0.0 (noviembre 2025)
- Integración completa con backend Spring Boot (API REST)
- Validación de RUT chileno con algoritmo módulo 11
- Auto-formateo de RUT
- Autenticación JWT con interceptores
- Polling en Admin Pedidos + merge para evitar perder el detalle abierto
- Normalización mejorada de items en Admin Pedidos
- Debounce en filtro de pedidos
- Tests con mocks de axios

### v1.0.0
- Versión inicial con 5 nuevas vistas y carrito funcional

---


