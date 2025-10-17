const STORAGE_KEY = 'admin_productos_v1';

function listar() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function guardar(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function crear({ nombre, precio = 0 }) {
  const productos = listar();
  const nuevo = { id: Date.now(), nombre, precio };
  productos.push(nuevo);
  guardar(productos);
  return nuevo;
}

function eliminar(id) {
  const productos = listar().filter(p => p.id !== id);
  guardar(productos);
}

function actualizar(id, datos) {
  const productos = listar().map(p => p.id === id ? { ...p, ...datos } : p);
  guardar(productos);
}

export default { listar, crear, eliminar, actualizar };

