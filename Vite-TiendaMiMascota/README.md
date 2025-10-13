# 🐾 TiendaMiMascota - E-commerce para Mascotas

![React](https://img.shields.io/badge/React-19.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![React Router](https://img.shields.io/badge/React_Router-7.9-red)
![Status](https://img.shields.io/badge/Status-Completado-success)

## 📖 Descripción

TiendaMiMascota es una tienda en línea completa y funcional especializada en productos para mascotas. Desarrollada con **React 19**, **Vite** y **React Router**, ofrece una experiencia de compra moderna y fluida.

## ✨ Características

- 🛍️ **Catálogo completo** de productos con filtros y búsqueda
- 🛒 **Carrito de compras** funcional con persistencia en localStorage
- 👤 **Sistema de autenticación** (login/registro)
- 💳 **Cálculo automático** de descuentos y envío gratis
- 📱 **Diseño responsive** para móviles, tablets y desktop
- 🔔 **Notificaciones toast** para feedback al usuario
- ✅ **Validación de formularios** en tiempo real
- 🎨 **Interfaz moderna** con animaciones y transiciones
- 🔍 **Búsqueda y filtrado** avanzado de productos
- ⭐ **Sistema de rating** de productos
- 📦 **18 productos** de ejemplo en 6 categorías

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ instalado
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ddoblejotadev/TiendaMiMascota.git

# Navegar al directorio
cd TiendaMiMascota/Vite-TiendaMiMascota

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CartSummary.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── ProductFilter.jsx
│   └── ui/
│       ├── ConfirmDialog.jsx
│       └── Notification.jsx
├── hooks/              # Custom hooks
│   ├── useAuth.jsx
│   ├── useCart.jsx
│   ├── useForm.jsx
│   ├── useLocalStorage.jsx
│   ├── useProducts.jsx
│   └── useToggle.jsx
├── layouts/            # Layouts de páginas
│   └── MainLayout.jsx
├── pages/              # Páginas de la aplicación
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   └── Register.jsx
├── services/           # Servicios y lógica de negocio
│   ├── authService.js
│   ├── cartService.js
│   └── productService.js
├── styles/             # Estilos globales
│   └── global.css
└── util/               # Utilidades
    ├── constants.js
    ├── formatters.js
    └── validators.js
```

## 🎯 Funcionalidades Principales

### 🏠 Página de Inicio
- Hero section con llamadas a la acción
- Grid de categorías principales
- Sección de características destacadas

### 🛍️ Catálogo de Productos
- Visualización en grid responsive
- Filtros por categoría y precio
- Búsqueda en tiempo real
- Ordenamiento (nombre, precio)
- Estados de carga y error

### 🔍 Detalle de Producto
- Galería de imágenes
- Información completa del producto
- Selector de cantidad
- Agregar al carrito o comprar ahora
- Productos relacionados

### 🛒 Carrito de Compras
- Gestión completa de productos
- Actualizar cantidades
- Eliminar items
- Resumen con subtotal, envío y descuentos
- Persistencia en localStorage

### 👤 Autenticación
- Registro de nuevos usuarios
- Inicio de sesión
- Validación de formularios
- Persistencia de sesión

### 📞 Contacto
- Formulario de contacto funcional
- Información de la empresa
- Redes sociales

## 🎨 Tecnologías Utilizadas

- **React 19.1** - Framework de JavaScript
- **Vite 7.1** - Build tool y dev server
- **React Router 7.9** - Enrutamiento
- **CSS3** - Estilos (sin librerías externas)
- **localStorage** - Persistencia de datos

## 📦 Productos Incluidos

El proyecto incluye 18 productos de ejemplo en 6 categorías:

- 🍖 **Comida** - Alimentos y snacks
- 🧸 **Juguetes** - Pelotas, cuerdas, ratones
- 🎀 **Accesorios** - Collares, correas, arneses
- 🧼 **Higiene** - Shampoo, cepillos, kit dental
- 💊 **Salud** - Vitaminas, antipulgas, probióticos
- 🛏️ **Camas** - Camas ortopédicas, acolchadas, iglú

## 👨‍💻 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview

# Ejecutar linter
npm run lint
```

## 🔐 Usuarios de Prueba

```
Usuario Regular:
Email: juan@example.com
Password: 123456

Administrador:
Email: admin@mimascota.cl
Password: admin123
```

## 🎨 Características de Diseño

- **Paleta de colores** moderna y amigable
- **Tipografía** clara y legible
- **Animaciones** sutiles y profesionales
- **Responsive** para todos los dispositivos
- **Accesibilidad** con aria-labels y HTML semántico
- **Modo oscuro** para badges y footer

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
