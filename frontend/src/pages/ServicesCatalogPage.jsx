import React, { useState, useMemo } from 'react';
import ServiceCard from '../components/ServiceCard';

export default function ServicesCatalogPage({
  servicios,
  onVerDetalle,
  onAgendar
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('defecto'); // 'precio-asc', 'precio-desc', 'duracion'

  const categorias = ['Todos', 'Cortes', 'Barba', 'Combos', 'Tratamientos'];

  // Filtrado y ordenamiento interactivo
  const serviciosFiltrados = useMemo(() => {
    return servicios
      .filter(s => {
        const coincideCategoria = categoriaSeleccionada === 'Todos' || s.categoria === categoriaSeleccionada;
        const coincideTexto = s.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          (s.descripcion && s.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
        return coincideCategoria && coincideTexto;
      })
      .sort((a, b) => {
        if (orden === 'precio-asc') return a.precio - b.precio;
        if (orden === 'precio-desc') return b.precio - a.precio;
        if (orden === 'duracion') return a.duracionMinutos - b.duracionMinutos;
        return 0;
      });
  }, [servicios, categoriaSeleccionada, busqueda, orden]);

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold small">Catálogo Oficial</span>
        <h1 className="display-5 fw-bold text-white">NUESTROS SERVICIOS</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          Elige el servicio que necesitas. Todos nuestros trabajos son ejecutados con herramientas esterilizadas, cosmética masculina de alta gama y atención de primera.
        </p>
      </div>

      {/* Barra de Filtros y Búsqueda Interactiva */}
      <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
        <div className="row g-3 align-items-center">
          {/* Selector de Categorías (Pills) */}
          <div className="col-lg-6 col-md-12">
            <div className="d-flex flex-wrap gap-2">
              {categorias.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm ${categoriaSeleccionada === cat ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat === 'Todos' && <i className="bi bi-grid-fill me-1"></i>}
                  {cat === 'Cortes' && <i className="bi bi-scissors me-1"></i>}
                  {cat === 'Barba' && <i className="bi bi-brush me-1"></i>}
                  {cat === 'Combos' && <i className="bi bi-stars me-1"></i>}
                  {cat === 'Tratamientos' && <i className="bi bi-droplet me-1"></i>}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Campo de búsqueda */}
          <div className="col-lg-4 col-md-8">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-secondary border-secondary text-light">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Buscar por corte, barba o tratamiento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button
                  className="btn btn-outline-secondary text-light"
                  type="button"
                  onClick={() => setBusqueda('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Ordenar */}
          <div className="col-lg-2 col-md-4">
            <select
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="defecto">Ordenar por...</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="duracion">Duración: Menor a Mayor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="d-flex justify-content-between align-items-center mb-3 text-secondary small">
        <span>Mostrando {serviciosFiltrados.length} servicio(s) disponible(s)</span>
        {(categoriaSeleccionada !== 'Todos' || busqueda) && (
          <button
            className="btn btn-link btn-sm text-warning text-decoration-none p-0"
            onClick={() => {
              setCategoriaSeleccionada('Todos');
              setBusqueda('');
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grilla de Servicios */}
      {serviciosFiltrados.length > 0 ? (
        <div className="row g-4">
          {serviciosFiltrados.map(servicio => (
            <div key={servicio.id} className="col-lg-4 col-md-6">
              <ServiceCard
                servicio={servicio}
                onVerDetalle={onVerDetalle}
                onAgendar={onAgendar}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-dark border border-secondary rounded">
          <i className="bi bi-search text-warning fs-1 mb-3 d-block"></i>
          <h4 className="text-white">No se encontraron servicios</h4>
          <p className="text-secondary">
            No hay servicios que coincidan con los criterios de búsqueda seleccionados.
          </p>
          <button
            className="btn btn-outline-warning btn-sm mt-2"
            onClick={() => {
              setCategoriaSeleccionada('Todos');
              setBusqueda('');
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
}
