import React, { useEffect, useState } from 'react';
import productService from '../../services/adminProductService';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    setProductos(productService.listar());
  }, []);

  const agregar = () => {
    if (!nombre) return;
    const nuevo = productService.crear({ nombre, precio: Number(precio) });
    setProductos(productService.listar());
    setNombre(''); setPrecio('');
  };

  const iniciarEdicion = (p) => {
    setEditId(p.id);
    setNombre(p.nombre);
    setPrecio(String(p.precio));
  };

  const guardarEdicion = () => {
    productService.actualizar(editId, { nombre, precio: Number(precio) });
    setProductos(productService.listar());
    setEditId(null);
    setNombre(''); setPrecio('');
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setNombre(''); setPrecio('');
  };

  const eliminar = (id) => {
    productService.eliminar(id);
    setProductos(productService.listar());
  };

  return (
    <div className="container">
      <h1 className="mb-4">Productos</h1>

      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
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