import React, { useEffect, useState } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../../services/productService';
import { notify } from '../../components/ui/notificationHelper';
import { confirmDialog } from '../../components/ui/confirmDialogHelper';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [editId, setEditId] = useState(null);
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const lista = await obtenerProductos();
        setProductos(lista);
      } catch (err) {
        notify('Error al cargar productos', 'error');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const agregar = async () => {
    if (!nombre) {
      notify('El nombre es requerido', 'warning');
      return;
    }
    try {
      const creado = await agregarProducto({ nombre, precio: Number(precio || 0), imagen });
      notify('Producto creado', 'success');
      setProductos(prev => [creado, ...prev]);
      setNombre(''); setPrecio(''); setImagen('');
    } catch (err) {
      notify('Error al crear producto', 'error');
    }
  };

  const iniciarEdicion = (p) => {
    setEditId(p.id);
    setNombre(p.nombre);
    setPrecio(String(p.precio));
  };

  const guardarEdicion = async () => {
    try {
      const actualizado = await actualizarProducto(editId, { nombre, precio: Number(precio || 0), imagen });
      setProductos(prev => prev.map(p => p.id === actualizado.id ? actualizado : p));
      setEditId(null);
      setNombre(''); setPrecio(''); setImagen('');
      notify('Producto actualizado', 'success');
    } catch (err) {
      notify('Error al actualizar producto', 'error');
    }
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setNombre(''); setPrecio('');
  };

  const eliminar = async (id) => {
    const confirmar = await confirmDialog({ title: 'Eliminar producto', message: '¿Estás seguro de eliminar este producto?' });
    if (!confirmar) return;
    try {
      await eliminarProducto(id);
      setProductos(prev => prev.filter(p => p.id !== id));
      notify('Producto eliminado', 'success');
    } catch (err) {
      notify('Error al eliminar producto', 'error');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Productos</h1>
      {cargando && <div className="alert alert-secondary">Cargando productos...</div>}

      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <input className="form-control" placeholder="Image URL (opcional)" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        {editId ? (
          <>
            <button className="btn btn-success" onClick={guardarEdicion}>Guardar</button>
            <button className="btn btn-secondary" onClick={cancelarEdicion}>Cancelar</button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={agregar}>Agregar</button>
        )}
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => iniciarEdicion(p)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductos;