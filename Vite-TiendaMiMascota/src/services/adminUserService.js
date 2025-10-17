const USR_KEY = 'usuarios_v1';

function listar() {
  const raw = localStorage.getItem(USR_KEY);
  return raw ? JSON.parse(raw) : [];
}

function guardar(lista) {
  localStorage.setItem(USR_KEY, JSON.stringify(lista));
}

function actualizarRole(id, role) {
  const lista = listar().map(u => u.id === id ? { ...u, role } : u);
  guardar(lista);
}

function eliminar(id) {
  const lista = listar().filter(u => u.id !== id);
  guardar(lista);
}

export default { listar, actualizarRole, eliminar };
