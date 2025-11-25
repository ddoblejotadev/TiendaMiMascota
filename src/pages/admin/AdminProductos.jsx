import React, { useEffect, useState } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../../services/productService';
import { notify } from '../../components/ui/notificationHelper';
import { confirmDialog } from '../../components/ui/confirmDialogHelper';
import { CATEGORIAS } from '../../util/constants';

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[1] || 'Alimento');
  const [stock, setStock] = useState('0');
  const [destacado, setDestacado] = useState(false);
  const [editId, setEditId] = useState(null);
  const [cargando, setCargando] = useState(false);


  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const lista = await obtenerProductos();
        setProductos(lista);
      } catch (err) {
          console.debug(err);
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
      const nuevoProducto = {
        nombre,
        descripcion,
        precio: Number(precio || 0),
        imagen,
        categoria,
        stock: Number(stock || 0),
        destacado: !!destacado
      };

      const creado = await agregarProducto(nuevoProducto);
      notify('Producto creado', 'success');
      setProductos(prev => [creado, ...prev]);
      setNombre(''); setPrecio(''); setImagen(''); setDescripcion(''); setStock('0'); setDestacado(false);
    } catch (err) {
      console.debug(err);
      notify('Error al crear producto', 'error');
    }
  };

  const iniciarEdicion = (p) => {
    setEditId(p.id);
    setNombre(p.nombre);
    setPrecio(String(p.precio));
    setImagen(p.imagen || '');
    setDescripcion(p.descripcion || '');
    setCategoria(p.categoria || (CATEGORIAS[1] || 'Alimento'));
    setStock(String(p.stock || 0));
    setDestacado(Boolean(p.destacado));
  };

  const guardarEdicion = async () => {
    try {
      const datos = {
        nombre,
        descripcion,
        precio: Number(precio || 0),
        imagen,
        categoria,
        stock: Number(stock || 0),
        destacado: !!destacado
      };

      const actualizado = await actualizarProducto(editId, datos);
      setProductos(prev => prev.map(p => p.id === actualizado.id ? actualizado : p));
      setEditId(null);
      setNombre(''); setPrecio(''); setImagen(''); setDescripcion(''); setStock('0'); setDestacado(false);
      notify('Producto actualizado', 'success');
    } catch (err) {
      console.debug(err);
      notify('Error al actualizar producto', 'error');
    }
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setNombre(''); setPrecio('');
    setImagen(''); setDescripcion(''); setStock('0'); setDestacado(false);
  };

  const eliminar = async (id) => {
    const confirmar = await confirmDialog({ title: 'Eliminar producto', message: '¿Estás seguro de eliminar este producto?' });
    if (!confirmar) return;
    try {
      await eliminarProducto(id);
      setProductos(prev => prev.filter(p => p.id !== id));
      notify('Producto eliminado', 'success');
    } catch (err) {
      console.debug(err);
      notify('Error al eliminar producto', 'error');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Productos</h1>
      {cargando && <div className="alert alert-secondary">Cargando productos...</div>}

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="number" step="0.01" className="form-control" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className="col-md-2">
            <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {CATEGORIAS.filter(c => c !== 'Todos').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="destacadoChk" checked={destacado} onChange={(e) => setDestacado(e.target.checked)} />
              <label className="form-check-label" htmlFor="destacadoChk">Destacado</label>
            </div>
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-md-8">
            <input className="form-control" placeholder="Image URL (opcional)" value={imagen} onChange={(e) => setImagen(e.target.value)} />
          </div>
          <div className="col-md-8 mt-2">
            <textarea className="form-control" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={2} />
          </div>
          <div className="col-md-4 d-flex align-items-center gap-2 mt-2">
            {editId ? (
              <>
                <button className="btn btn-success" onClick={guardarEdicion}>Guardar</button>
                <button className="btn btn-secondary" onClick={cancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={agregar}>Agregar</button>
            )}
          </div>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <div>{p.nombre}</div>
                {p.descripcion && <small className="text-muted">{p.descripcion}</small>}
              </td>
              <td>{p.categoria}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>{p.destacado ? 'Sí' : 'No'}</td>
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