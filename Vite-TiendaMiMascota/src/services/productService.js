/**
 * SERVICIO DE PRODUCTOS
 * Maneja todas las operaciones relacionadas con productos
 */

// Base de datos simulada de productos
let productosDB = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    descripcion: "Alimento balanceado de alta calidad para perros adultos de todas las razas. Rico en proteínas y nutrientes esenciales.",
    precio: 25990,
    precioAnterior: 29990,
    imagen: "/images/productos/alimento-perro.jpg",
    categoria: "Alimento",
    stock: 50,
    destacado: true,
    valoracion: 4.5
  },
  {
    id: 2,
    nombre: "Juguete Mordedor Resistente",
    descripcion: "Juguete de goma resistente ideal para perros de todas las edades. Ayuda a mantener dientes limpios.",
    precio: 8990,
    imagen: "/images/productos/juguete-mordedor.jpg",
    categoria: "Juguetes",
    stock: 30,
    destacado: false,
    valoracion: 4.0
  },
  {
    id: 3,
    nombre: "Collar Ajustable Premium",
    descripcion: "Collar cómodo y ajustable para perros medianos y grandes. Material resistente y duradero.",
    precio: 12990,
    imagen: "/images/productos/collar.jpg",
    categoria: "Accesorios",
    stock: 20,
    destacado: true,
    valoracion: 4.8
  },
  {
    id: 4,
    nombre: "Shampoo Hipoalergénico para Gatos",
    descripcion: "Shampoo especial para el cuidado del pelaje de gatos. Fórmula suave e hipoalergénica.",
    precio: 7990,
    imagen: "/images/productos/shampoo-gato.jpg",
    categoria: "Higiene",
    stock: 40,
    destacado: false,
    valoracion: 4.3
  },
  {
    id: 5,
    nombre: "Cama Acolchada para Mascotas",
    descripcion: "Cama suave y cómoda para perros y gatos. Relleno de espuma de alta densidad.",
    precio: 35990,
    precioAnterior: 42990,
    imagen: "/images/productos/cama.jpg",
    categoria: "Accesorios",
    stock: 15,
    destacado: true,
    valoracion: 4.7
  },
  {
    id: 6,
    nombre: "Alimento para Gatos Adultos",
    descripcion: "Alimento completo y balanceado para gatos adultos. Con taurina y omega 3.",
    precio: 22990,
    imagen: "/images/productos/alimento-gato.jpg",
    categoria: "Alimento",
    stock: 45,
    destacado: false,
    valoracion: 4.4
  },
  {
    id: 7,
    nombre: "Rascador para Gatos",
    descripcion: "Torre rascadora multi-nivel para gatos. Incluye plataformas y juguetes colgantes.",
    precio: 45990,
    imagen: "/images/productos/rascador.jpg",
    categoria: "Juguetes",
    stock: 8,
    destacado: true,
    valoracion: 4.9
  },
  {
    id: 8,
    nombre: "Correa Retráctil 5 metros",
    descripcion: "Correa retráctil automática de 5 metros. Sistema de freno seguro y cómodo.",
    precio: 15990,
    imagen: "/images/productos/correa.jpg",
    categoria: "Accesorios",
    stock: 25,
    destacado: false,
    valoracion: 4.2
  }
];

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} - Array de productos
 */
export async function obtenerProductos() {
  // Simular delay de red
  await delay(300);
  return [...productosDB];
}

/**
 * Obtiene un producto por su ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} - Producto encontrado o null
 */
export async function obtenerProductoPorId(id) {
  await delay(200);
  return productosDB.find(p => p.id === id) || null;
}

/**
 * Obtiene productos destacados
 * @returns {Promise<Array>} - Array de productos destacados
 */
export async function obtenerProductosDestacados() {
  await delay(200);
  return productosDB.filter(p => p.destacado);
}

/**
 * Filtra productos por categoría
 * @param {string} categoria - Categoría a filtrar
 * @returns {Promise<Array>} - Productos filtrados
 */
export async function filtrarPorCategoria(categoria) {
  await delay(200);
  if (!categoria || categoria === 'Todos') {
    return [...productosDB];
  }
  return productosDB.filter(p => p.categoria === categoria);
}

/**
 * Busca productos por término
 * @param {string} termino - Término de búsqueda
 * @returns {Promise<Array>} - Productos encontrados
 */
export async function buscarProductos(termino) {
  await delay(200);
  if (!termino) return [...productosDB];
  
  const terminoLower = termino.toLowerCase();
  return productosDB.filter(p => 
    p.nombre.toLowerCase().includes(terminoLower) ||
    p.descripcion.toLowerCase().includes(terminoLower)
  );
}

/**
 * Agrega un nuevo producto (CRUD)
 * @param {Object} producto - Datos del producto
 * @returns {Promise<Object>} - Producto creado
 */
export async function agregarProducto(producto) {
  await delay(300);
  
  const nuevoProducto = {
    id: Math.max(...productosDB.map(p => p.id)) + 1,
    ...producto,
    destacado: false,
    valoracion: 0
  };
  
  productosDB.push(nuevoProducto);
  return nuevoProducto;
}

/**
 * Actualiza un producto existente (CRUD)
 * @param {number} id - ID del producto
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object|null>} - Producto actualizado o null
 */
export async function actualizarProducto(id, datosActualizados) {
  await delay(300);
  
  const index = productosDB.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  productosDB[index] = {
    ...productosDB[index],
    ...datosActualizados
  };
  
  return productosDB[index];
}

/**
 * Elimina un producto (CRUD)
 * @param {number} id - ID del producto
 * @returns {Promise<boolean>} - true si se eliminó
 */
export async function eliminarProducto(id) {
  await delay(300);
  
  const index = productosDB.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  productosDB.splice(index, 1);
  return true;
}

/**
 * Función auxiliar para simular delay de red
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}