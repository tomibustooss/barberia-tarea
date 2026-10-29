import React, { useState } from 'react';

export default function AdminDashboardPage({
  servicios,
  barberos,
  sucursales,
  citas,
  promociones,
  inventario,
  empleados,
  onCrearServicio,
  onActualizarServicio,
  onEliminarServicio,
  onCrearBarbero,
  onEliminarBarbero,
  onCrearSucursal,
  onEliminarSucursal,
  onCambiarEstadoCita,
  onCrearPromocion,
  onEliminarPromocion,
  onRestablecerDatos
}) {
  const [tabActivo, setTabActivo] = useState('resumen');

  // Modales y formularios
  const [modalAbierto, setModalAbierto] = useState(null); // 'nuevo-servicio', 'editar-servicio', 'nuevo-barbero', 'nueva-sucursal', 'nueva-promo'
  const [servicioEnEdicion, setServicioEnEdicion] = useState(null);

  // Estados temporales de formularios
  const [formServicio, setFormServicio] = useState({ nombre: '', categoria: 'Cortes', duracionMinutos: 30, precio: 15000, descripcion: '', imagen: '' });
  const [formBarbero, setFormBarbero] = useState({ nombre: '', especialidad: '', correo: '', telefono: '', calificacion: 5.0, experiencia: '5 años', bio: '' });
  const [formSucursal, setFormSucursal] = useState({ nombre: '', direccion: '', telefono: '', horario: '10:00 a 20:00' });
  const [formPromo, setFormPromo] = useState({ codigo: '', descripcion: '', descuentoPorcentaje: 15, fechaInicio: '2026-01-01', fechaFin: '2026-12-31' });

  // Mensaje de éxito
  const [alerta, setAlerta] = useState('');

  const mostrarAlerta = (msg) => {
    setAlerta(msg);
    setTimeout(() => setAlerta(''), 3500);
  };

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor || 0);
  };

  // Cálculos para el resumen
  const ingresosProyectados = citas.filter(c => c.estado !== 'CANCELADA').reduce((sum, c) => sum + (c.totalFinal || c.costo || 0), 0);
  const citasPendientes = citas.filter(c => c.estado === 'PENDIENTE').length;
  const citasConfirmadas = citas.filter(c => c.estado === 'CONFIRMADA').length;

  // Handlers
  const handleGuardarServicio = (e) => {
    e.preventDefault();
    if (!formServicio.nombre.trim()) return;

    if (modalAbierto === 'editar-servicio' && servicioEnEdicion) {
      onActualizarServicio(servicioEnEdicion.id, {
        ...formServicio,
        duracionMinutos: Number(formServicio.duracionMinutos),
        precio: Number(formServicio.precio)
      });
      mostrarAlerta('Servicio actualizado correctamente.');
    } else {
      onCrearServicio({
        ...formServicio,
        duracionMinutos: Number(formServicio.duracionMinutos),
        precio: Number(formServicio.precio)
      });
      mostrarAlerta('Nuevo servicio agregado al catálogo.');
    }

    setModalAbierto(null);
    setServicioEnEdicion(null);
    setFormServicio({ nombre: '', categoria: 'Cortes', duracionMinutos: 30, precio: 15000, descripcion: '', imagen: '' });
  };

  const abrirEditarServicio = (serv) => {
    setServicioEnEdicion(serv);
    setFormServicio({
      nombre: serv.nombre,
      categoria: serv.categoria || 'Cortes',
      duracionMinutos: serv.duracionMinutos,
      precio: serv.precio,
      descripcion: serv.descripcion || '',
      imagen: serv.imagen || ''
    });
    setModalAbierto('editar-servicio');
  };

  const handleGuardarBarbero = (e) => {
    e.preventDefault();
    if (!formBarbero.nombre.trim()) return;
    onCrearBarbero({
      ...formBarbero,
      calificacion: Number(formBarbero.calificacion)
    });
    setModalAbierto(null);
    setFormBarbero({ nombre: '', especialidad: '', correo: '', telefono: '', calificacion: 5.0, experiencia: '5 años', bio: '' });
    mostrarAlerta('Nuevo barbero incorporado al equipo.');
  };

  const handleGuardarSucursal = (e) => {
    e.preventDefault();
    if (!formSucursal.nombre.trim()) return;
    onCrearSucursal(formSucursal);
    setModalAbierto(null);
    setFormSucursal({ nombre: '', direccion: '', telefono: '', horario: '10:00 a 20:00' });
    mostrarAlerta('Nueva sucursal registrada con éxito.');
  };

  const handleGuardarPromo = (e) => {
    e.preventDefault();
    if (!formPromo.codigo.trim()) return;
    onCrearPromocion({
      ...formPromo,
      codigo: formPromo.codigo.toUpperCase(),
      descuentoPorcentaje: Number(formPromo.descuentoPorcentaje)
    });
    setModalAbierto(null);
    setFormPromo({ codigo: '', descripcion: '', descuentoPorcentaje: 15, fechaInicio: '2026-01-01', fechaFin: '2026-12-31' });
    mostrarAlerta('Nueva promoción publicada.');
  };

  return (
    <div className="container-fluid py-4 px-lg-5 text-light">
      {/* Barra superior de administración */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary flex-wrap gap-3">
        <div>
          <span className="badge bg-warning text-dark text-uppercase fw-bold px-2 py-1 small">
            <i className="bi bi-shield-lock-fill me-1"></i> Módulo Administrativo
          </span>
          <h2 className="fw-bold text-white m-0">Panel de Control General</h2>
          <small className="text-secondary">Gestión CRUD de Servicios, Profesionales, Sucursales, Citas e Inventario</small>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              if (window.confirm('¿Deseas restablecer todos los datos a sus valores predeterminados de fábrica?')) {
                onRestablecerDatos();
                mostrarAlerta('Datos restablecidos a los valores iniciales.');
              }
            }}
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i> Restablecer Datos Iniciales
          </button>
        </div>
      </div>

      {alerta && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          {alerta}
          <button type="button" className="btn-close" onClick={() => setAlerta('')}></button>
        </div>
      )}

      {/* Navegación por pestañas administrativas */}
      <ul className="nav nav-pills nav-fill bg-dark p-2 rounded border border-secondary mb-4">
        {[
          { id: 'resumen', label: 'Resumen & Métricas', icon: 'bi-speedometer2' },
          { id: 'servicios', label: `Servicios (${servicios.length})`, icon: 'bi-scissors' },
          { id: 'barberos', label: `Barberos (${barberos.length})`, icon: 'bi-person-badge' },
          { id: 'citas', label: `Citas (${citas.length})`, icon: 'bi-calendar3' },
          { id: 'sucursales', label: `Sucursales (${sucursales.length})`, icon: 'bi-geo-alt' },
          { id: 'promociones', label: `Promociones (${promociones.length})`, icon: 'bi-tags' },
          { id: 'inventario', label: `Inventario (${inventario.length})`, icon: 'bi-box-seam' },
          { id: 'empleados', label: `Empleados (${empleados.length})`, icon: 'bi-people' }
        ].map(t => (
          <li key={t.id} className="nav-item">
            <button
              className={`nav-link btn btn-link text-decoration-none ${tabActivo === t.id ? 'active bg-warning text-dark fw-bold' : 'text-light'}`}
              onClick={() => setTabActivo(t.id)}
            >
              <i className={`bi ${t.icon} me-1`}></i>
              {t.label}
            </button>
          </li>
        ))}
      </ul>

      {/* ============================================================== */}
      {/* TAB 1: RESUMEN Y MÉTRICAS */}
      {/* ============================================================== */}
      {tabActivo === 'resumen' && (
        <div>
          <div className="row g-4 mb-4">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary small">Citas Agendadas:</span>
                    <h3 className="fw-bold text-white m-0">{citas.length}</h3>
                    <small className="text-success">{citasConfirmadas} confirmadas, {citasPendientes} pendientes</small>
                  </div>
                  <i className="bi bi-calendar-check fs-1 text-warning"></i>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary small">Ingresos Estimados:</span>
                    <h3 className="fw-bold text-success m-0">{formatearPrecio(ingresosProyectados)}</h3>
                    <small className="text-secondary">Por servicios agendados</small>
                  </div>
                  <i className="bi bi-cash-stack fs-1 text-success"></i>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary small">Servicios en Catálogo:</span>
                    <h3 className="fw-bold text-white m-0">{servicios.length}</h3>
                    <small className="text-secondary">En 4 categorías activas</small>
                  </div>
                  <i className="bi bi-scissors fs-1 text-info"></i>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-secondary small">Barberos & Sucursales:</span>
                    <h3 className="fw-bold text-white m-0">{barberos.length} / {sucursales.length}</h3>
                    <small className="text-secondary">Equipo operativo total</small>
                  </div>
                  <i className="bi bi-people fs-1 text-warning"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de últimas citas */}
          <div className="card bg-dark border-secondary p-4 shadow-sm">
            <h5 className="fw-bold text-white mb-3">
              <i className="bi bi-clock-history text-warning me-2"></i>
              Últimas Citas Registradas en el Sistema
            </h5>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle">
                <thead>
                  <tr className="border-secondary text-secondary small">
                    <th>CÓDIGO</th>
                    <th>SERVICIO</th>
                    <th>CLIENTE</th>
                    <th>BARBERO</th>
                    <th>FECHA & HORA</th>
                    <th>VALOR</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.slice(0, 5).map(c => (
                    <tr key={c.id}>
                      <td className="font-monospace text-warning fw-bold">{c.codigoReserva || `CIT-${c.id}`}</td>
                      <td className="fw-bold text-white">{c.servicioNombre}</td>
                      <td>{c.clienteNombre}</td>
                      <td>{c.barberoNombre}</td>
                      <td className="text-info">{c.fecha} ({c.hora})</td>
                      <td className="text-success fw-bold">{formatearPrecio(c.totalFinal || c.costo)}</td>
                      <td>
                        <span className={`badge ${c.estado === 'CONFIRMADA' ? 'bg-success' : (c.estado === 'CANCELADA' ? 'bg-danger' : 'bg-warning text-dark')}`}>
                          {c.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: GESTIÓN DE SERVICIOS (CRUD) */}
      {/* ============================================================== */}
      {tabActivo === 'servicios' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-white m-0">Catálogo de Servicios</h4>
            <button
              className="btn btn-warning btn-sm fw-bold text-dark"
              onClick={() => {
                setServicioEnEdicion(null);
                setFormServicio({ nombre: '', categoria: 'Cortes', duracionMinutos: 30, precio: 15000, descripcion: '', imagen: '' });
                setModalAbierto('nuevo-servicio');
              }}
            >
              <i className="bi bi-plus-circle me-1"></i> Nuevo Servicio
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>ID</th>
                  <th>NOMBRE DEL SERVICIO</th>
                  <th>CATEGORÍA</th>
                  <th>DURACIÓN</th>
                  <th>PRECIO</th>
                  <th className="text-end">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map(s => (
                  <tr key={s.id}>
                    <td>#{s.id}</td>
                    <td className="fw-bold text-white">{s.nombre}</td>
                    <td><span className="badge bg-secondary">{s.categoria || 'General'}</span></td>
                    <td>{s.duracionMinutos} min</td>
                    <td className="text-success fw-bold">{formatearPrecio(s.precio)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-info btn-sm me-2"
                        onClick={() => abrirEditarServicio(s)}
                      >
                        <i className="bi bi-pencil me-1"></i> Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar el servicio "${s.nombre}"?`)) {
                            onEliminarServicio(s.id);
                            mostrarAlerta(`Servicio "${s.nombre}" eliminado.`);
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: GESTIÓN DE BARBEROS (CRUD) */}
      {/* ============================================================== */}
      {tabActivo === 'barberos' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-white m-0">Equipo de Barberos</h4>
            <button
              className="btn btn-warning btn-sm fw-bold text-dark"
              onClick={() => setModalAbierto('nuevo-barbero')}
            >
              <i className="bi bi-person-plus me-1"></i> Nuevo Barbero
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>FOTO</th>
                  <th>NOMBRE</th>
                  <th>ESPECIALIDAD</th>
                  <th>CORREO</th>
                  <th>TELÉFONO</th>
                  <th>VALORACIÓN</th>
                  <th className="text-end">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {barberos.map(b => (
                  <tr key={b.id}>
                    <td>
                      <img
                        src={b.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={b.nombre}
                        className="rounded-circle border border-warning"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td className="fw-bold text-white">{b.nombre}</td>
                    <td className="text-warning">{b.especialidad}</td>
                    <td className="small text-secondary">{b.correo}</td>
                    <td className="small text-secondary">{b.telefono}</td>
                    <td>
                      <span className="badge bg-secondary">
                        <i className="bi bi-star-fill text-warning me-1"></i> {b.calificacion || 4.9}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar al barbero "${b.nombre}"?`)) {
                            onEliminarBarbero(b.id);
                            mostrarAlerta(`Barbero "${b.nombre}" retirado.`);
                          }
                        }}
                      >
                        <i className="bi bi-trash me-1"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: GESTIÓN DE CITAS */}
      {/* ============================================================== */}
      {tabActivo === 'citas' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <h4 className="fw-bold text-white mb-3">Control y Seguimiento de Citas</h4>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>CÓDIGO</th>
                  <th>SERVICIO</th>
                  <th>CLIENTE</th>
                  <th>BARBERO</th>
                  <th>FECHA & HORA</th>
                  <th>TOTAL</th>
                  <th>ESTADO ACTUAL</th>
                  <th className="text-end">CAMBIAR ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {citas.map(c => (
                  <tr key={c.id}>
                    <td className="font-monospace text-warning fw-bold">{c.codigoReserva || `CIT-${c.id}`}</td>
                    <td className="text-white fw-bold">{c.servicioNombre}</td>
                    <td>{c.clienteNombre} <small className="d-block text-secondary">{c.clienteTelefono}</small></td>
                    <td>{c.barberoNombre}</td>
                    <td className="text-info">{c.fecha} ({c.hora})</td>
                    <td className="text-success fw-bold">{formatearPrecio(c.totalFinal || c.costo)}</td>
                    <td>
                      <span className={`badge ${c.estado === 'CONFIRMADA' ? 'bg-success' : (c.estado === 'CANCELADA' ? 'bg-danger' : (c.estado === 'COMPLETADA' ? 'bg-primary' : 'bg-warning text-dark'))}`}>
                        {c.estado}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-success"
                          title="Marcar como Confirmada"
                          onClick={() => onCambiarEstadoCita(c.id, 'CONFIRMADA')}
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          title="Marcar como Completada"
                          onClick={() => onCambiarEstadoCita(c.id, 'COMPLETADA')}
                        >
                          <i className="bi bi-check2-all"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          title="Cancelar Cita"
                          onClick={() => onCambiarEstadoCita(c.id, 'CANCELADA')}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: SUCURSALES */}
      {/* ============================================================== */}
      {tabActivo === 'sucursales' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-white m-0">Sucursales y Locales Físicos</h4>
            <button
              className="btn btn-warning btn-sm fw-bold text-dark"
              onClick={() => setModalAbierto('nueva-sucursal')}
            >
              <i className="bi bi-plus-circle me-1"></i> Nueva Sucursal
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>DIRECCIÓN</th>
                  <th>TELÉFONO</th>
                  <th>HORARIO</th>
                  <th className="text-end">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {sucursales.map(suc => (
                  <tr key={suc.id}>
                    <td>#{suc.id}</td>
                    <td className="fw-bold text-white">{suc.nombre}</td>
                    <td>{suc.direccion}</td>
                    <td>{suc.telefono}</td>
                    <td className="small text-secondary">{suc.horario || '10:00 a 20:00'}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la sucursal "${suc.nombre}"?`)) {
                            onEliminarSucursal(suc.id);
                            mostrarAlerta(`Sucursal "${suc.nombre}" eliminada.`);
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: PROMOCIONES */}
      {/* ============================================================== */}
      {tabActivo === 'promociones' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-white m-0">Códigos y Cupones Promocionales</h4>
            <button
              className="btn btn-warning btn-sm fw-bold text-dark"
              onClick={() => setModalAbierto('nueva-promo')}
            >
              <i className="bi bi-tag me-1"></i> Nueva Promoción
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>CÓDIGO</th>
                  <th>DESCRIPCIÓN</th>
                  <th>DESCUENTO</th>
                  <th>VIGENCIA</th>
                  <th className="text-end">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {promociones.map(p => (
                  <tr key={p.id}>
                    <td className="font-monospace text-warning fw-bold fs-6">{p.codigo}</td>
                    <td>{p.descripcion}</td>
                    <td><span className="badge bg-success fs-6">{p.descuentoPorcentaje}%</span></td>
                    <td className="small text-secondary">{p.fechaInicio} al {p.fechaFin}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la promoción "${p.codigo}"?`)) {
                            onEliminarPromocion(p.id);
                            mostrarAlerta(`Promoción "${p.codigo}" eliminada.`);
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 7: INVENTARIO */}
      {/* ============================================================== */}
      {tabActivo === 'inventario' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <h4 className="fw-bold text-white mb-3">Control de Insumos y Stock</h4>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>ID</th>
                  <th>PRODUCTO / INSUMO</th>
                  <th>STOCK ACTUAL</th>
                  <th>STOCK MÍNIMO</th>
                  <th>PRECIO UNITARIO</th>
                  <th>ESTADO DE STOCK</th>
                </tr>
              </thead>
              <tbody>
                {inventario.map(item => {
                  const bajoStock = item.stockActual <= item.stockMinimo;
                  return (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td className="fw-bold text-white">{item.productoNombre}</td>
                      <td className="fs-6 fw-bold">{item.stockActual} unidades</td>
                      <td className="text-secondary">{item.stockMinimo} unidades</td>
                      <td>{formatearPrecio(item.precioUnitario)}</td>
                      <td>
                        {bajoStock ? (
                          <span className="badge bg-danger">
                            <i className="bi bi-exclamation-triangle me-1"></i> Reabastecer Urgente
                          </span>
                        ) : (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle me-1"></i> Stock Óptimo
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 8: EMPLEADOS */}
      {/* ============================================================== */}
      {tabActivo === 'empleados' && (
        <div className="card bg-dark border-secondary p-4 shadow-sm">
          <h4 className="fw-bold text-white mb-3">Nómina de Empleados</h4>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="border-secondary text-secondary small">
                  <th>RUN</th>
                  <th>NOMBRE COMPLETO</th>
                  <th>CARGO</th>
                  <th>SUELDO BASE</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map(emp => (
                  <tr key={emp.id}>
                    <td className="font-monospace text-secondary">{emp.run}</td>
                    <td className="fw-bold text-white">{emp.nombres} {emp.apellidos}</td>
                    <td><span className="badge bg-secondary">{emp.cargo}</span></td>
                    <td className="text-success fw-bold">{formatearPrecio(emp.sueldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: NUEVO / EDITAR SERVICIO */}
      {/* ============================================================== */}
      {(modalAbierto === 'nuevo-servicio' || modalAbierto === 'editar-servicio') && (
        <div className="modal show d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-warning text-light">
              <form onSubmit={handleGuardarServicio}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-warning fw-bold">
                    {modalAbierto === 'editar-servicio' ? 'Editar Servicio' : 'Nuevo Servicio'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalAbierto(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Nombre del Servicio *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formServicio.nombre}
                      onChange={(e) => setFormServicio({ ...formServicio, nombre: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small text-secondary">Categoría</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={formServicio.categoria}
                        onChange={(e) => setFormServicio({ ...formServicio, categoria: e.target.value })}
                      >
                        <option value="Cortes">Cortes</option>
                        <option value="Barba">Barba</option>
                        <option value="Combos">Combos</option>
                        <option value="Tratamientos">Tratamientos</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-secondary">Duración (min)</label>
                      <input
                        type="number"
                        className="form-control bg-dark text-light border-secondary"
                        value={formServicio.duracionMinutos}
                        onChange={(e) => setFormServicio({ ...formServicio, duracionMinutos: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Precio (CLP) *</label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formServicio.precio}
                      onChange={(e) => setFormServicio({ ...formServicio, precio: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Descripción</label>
                    <textarea
                      className="form-control bg-dark text-light border-secondary"
                      rows="3"
                      value={formServicio.descripcion}
                      onChange={(e) => setFormServicio({ ...formServicio, descripcion: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalAbierto(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold">Guardar Servicio</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: NUEVO BARBERO */}
      {/* ============================================================== */}
      {modalAbierto === 'nuevo-barbero' && (
        <div className="modal show d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-warning text-light">
              <form onSubmit={handleGuardarBarbero}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-warning fw-bold">Incorporar Nuevo Barbero</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalAbierto(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formBarbero.nombre}
                      onChange={(e) => setFormBarbero({ ...formBarbero, nombre: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Especialidad Principal</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Ej: Fade & Diseños Urbanos"
                      value={formBarbero.especialidad}
                      onChange={(e) => setFormBarbero({ ...formBarbero, especialidad: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small text-secondary">Correo</label>
                      <input
                        type="email"
                        className="form-control bg-dark text-light border-secondary"
                        value={formBarbero.correo}
                        onChange={(e) => setFormBarbero({ ...formBarbero, correo: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-secondary">Teléfono</label>
                      <input
                        type="tel"
                        className="form-control bg-dark text-light border-secondary"
                        value={formBarbero.telefono}
                        onChange={(e) => setFormBarbero({ ...formBarbero, telefono: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalAbierto(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold">Agregar Barbero</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: NUEVA SUCURSAL */}
      {/* ============================================================== */}
      {modalAbierto === 'nueva-sucursal' && (
        <div className="modal show d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-warning text-light">
              <form onSubmit={handleGuardarSucursal}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-warning fw-bold">Registrar Nueva Sucursal</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalAbierto(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Nombre de la Sucursal *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      placeholder="Ej: Sucursal Las Condes"
                      value={formSucursal.nombre}
                      onChange={(e) => setFormSucursal({ ...formSucursal, nombre: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Dirección Completa *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formSucursal.direccion}
                      onChange={(e) => setFormSucursal({ ...formSucursal, direccion: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Teléfono de Contacto</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      value={formSucursal.telefono}
                      onChange={(e) => setFormSucursal({ ...formSucursal, telefono: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalAbierto(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold">Registrar Sucursal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: NUEVA PROMOCIÓN */}
      {/* ============================================================== */}
      {modalAbierto === 'nueva-promo' && (
        <div className="modal show d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-warning text-light">
              <form onSubmit={handleGuardarPromo}>
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-warning fw-bold">Crear Código Promocional</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalAbierto(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Código del Cupón *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary text-uppercase"
                      required
                      placeholder="Ej: VERANO-2026"
                      value={formPromo.codigo}
                      onChange={(e) => setFormPromo({ ...formPromo, codigo: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Descuento (%) *</label>
                    <input
                      type="number"
                      className="form-control bg-dark text-light border-secondary"
                      min="1"
                      max="100"
                      required
                      value={formPromo.descuentoPorcentaje}
                      onChange={(e) => setFormPromo({ ...formPromo, descuentoPorcentaje: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-secondary">Descripción de la Promoción</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      value={formPromo.descripcion}
                      onChange={(e) => setFormPromo({ ...formPromo, descripcion: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalAbierto(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold">Crear Promoción</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
