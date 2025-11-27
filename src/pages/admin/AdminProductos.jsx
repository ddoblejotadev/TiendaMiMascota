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
  // UI: search, filters, sort and pagination
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);


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

  // Derived list: search + filter + sort
  const filtered = React.useMemo(() => {
    let out = productos.slice();
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      out = out.filter(p => (p.nombre || '').toString().toLowerCase().includes(q) || (p.descripcion || '').toString().toLowerCase().includes(q));
    }
    if (categoryFilter) {
      out = out.filter(p => (p.categoria || '').toString() === categoryFilter);
    }
    if (sortOption) {
      const [field, dir] = sortOption.split(':');
      out.sort((a, b) => {
        const va = a[field] ?? '';
        const vb = b[field] ?? '';
        if (typeof va === 'number' && typeof vb === 'number') return dir === 'asc' ? va - vb : vb - va;
        return dir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      });
    }
    return out;
  }, [productos, search, categoryFilter, sortOption]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);
  const paged = React.useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

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

      {/* Controles de búsqueda, filtros, orden y paginación */}
      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2 align-items-center">
            <div className="col-md-4">
              <input className="form-control" placeholder="Buscar por nombre o descripción" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
                <option value="">Todas las categorías</option>
                {CATEGORIAS.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Orden: predeterminado</option>
                <option value="nombre:asc">Nombre A→Z</option>
                <option value="nombre:desc">Nombre Z→A</option>
                <option value="precio:asc">Precio ↑</option>
                <option value="precio:desc">Precio ↓</option>
                <option value="stock:asc">Stock ↑</option>
                <option value="stock:desc">Stock ↓</option>
              </select>
            </div>
            <div className="col-md-2 text-end">
              <select className="form-select" value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
                <option value={6}>6 / pág</option>
                <option value={12}>12 / pág</option>
                <option value={24}>24 / pág</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {paged.map(p => (
          <div key={p.id} className="col">
            <div className={`card h-100 shadow-sm ${editId === p.id ? 'border-primary' : ''}`}>
              {p.imagen ? <img src={p.imagen} className="card-img-top" alt={p.nombre} style={{height:120, objectFit:'cover'}} /> : (
                <div className="bg-light d-flex align-items-center justify-content-center" style={{height:120}}>Sin imagen</div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-1">{p.nombre}</h5>
                <div className="mb-2"><small className="text-muted">{p.categoria}</small></div>
                {p.descripcion && <p className="card-text text-truncate" style={{maxHeight: '3.6rem'}}>{p.descripcion}</p>}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">${p.precio}</div>
                    <div><small className="text-muted">Stock: {p.stock}</small></div>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-warning" onClick={() => iniciarEdicion(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
              {p.destacado && <div className="position-absolute top-0 end-0 m-2 badge bg-success">Destacado</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <small className="text-muted">Mostrando {filtered.length === 0 ? 0 : ( (page-1)*perPage + 1)} - {Math.min(page*perPage, filtered.length)} de {filtered.length} productos</small>
        </div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(1)}>«</button></li>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(Math.max(1, page-1))}>‹</button></li>
            {Array.from({length: totalPages}).map((_, i) => {
              const pIdx = i+1;
              // show only nearby pages if many
              if (totalPages > 10 && Math.abs(pIdx - page) > 3 && pIdx !== 1 && pIdx !== totalPages) return null;
              return (
                <li key={pIdx} className={`page-item ${pIdx === page ? 'active' : ''}`}><button className="page-link" onClick={() => setPage(pIdx)}>{pIdx}</button></li>
              );
            })}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(Math.min(totalPages, page+1))}>›</button></li>
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => setPage(totalPages)}>»</button></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminProductos;