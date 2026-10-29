import React from 'react';

export default function Navbar({
  vistaActual,
  onNavegar,
  usuario,
  onCerrarSesion,
  onAbrirLogin,
  backendConectado
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-warning">
      <div className="container">
        {/* Logotipo / Marca */}
        <button
          className="navbar-brand btn btn-link text-decoration-none fw-bold fs-3 text-warning d-flex align-items-center"
          onClick={() => onNavegar('inicio')}
        >
          <i className="bi bi-scissors me-2"></i>
          BARBERÍA NORTE
        </button>

        {/* Botón hamburguesa responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'inicio' ? 'active text-warning fw-bold' : 'text-light'}`}
                onClick={() => onNavegar('inicio')}
              >
                <i className="bi bi-house-door me-1"></i> Inicio
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'servicios' || vistaActual === 'detalle-servicio' ? 'active text-warning fw-bold' : 'text-light'}`}
                onClick={() => onNavegar('servicios')}
              >
                <i className="bi bi-card-checklist me-1"></i> Servicios
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'barberos' ? 'active text-warning fw-bold' : 'text-light'}`}
                onClick={() => onNavegar('barberos')}
              >
                <i className="bi bi-person-badge me-1"></i> Barberos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'sucursales' ? 'active text-warning fw-bold' : 'text-light'}`}
                onClick={() => onNavegar('sucursales')}
              >
                <i className="bi bi-geo-alt me-1"></i> Sucursales
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'promociones' ? 'active text-warning fw-bold' : 'text-light'}`}
                onClick={() => onNavegar('promociones')}
              >
                <i className="bi bi-tag me-1"></i> Promociones
              </button>
            </li>
            {usuario && usuario.rol === 'CLIENTE' && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'mis-citas' ? 'active text-warning fw-bold' : 'text-light'}`}
                  onClick={() => onNavegar('mis-citas')}
                >
                  <i className="bi bi-calendar-check me-1"></i> Mis Citas
                </button>
              </li>
            )}
            {usuario && (usuario.rol === 'ADMIN' || usuario.rol === 'BARBERO') && (
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-decoration-none ${vistaActual === 'admin' ? 'active text-warning fw-bold' : 'text-warning'}`}
                  onClick={() => onNavegar('admin')}
                >
                  <i className="bi bi-speedometer2 me-1"></i> Panel Admin
                </button>
              </li>
            )}
          </ul>

          {/* Estado de conexión e Inicio de Sesión */}
          <div className="d-flex align-items-center gap-2">
            {/* Indicador de persistencia / backend */}
            <span
              className={`badge rounded-pill ${backendConectado ? 'bg-success' : 'bg-secondary'}`}
              title={backendConectado ? 'Conectado al Gateway Spring Boot (8081)' : 'Modo persistencia local (dbSimulada)'}
            >
              <i className={`bi bi-circle-fill me-1 ${backendConectado ? 'text-white' : 'text-warning'}`}></i>
              {backendConectado ? 'Backend Activo' : 'Modo Simulado'}
            </span>

            {/* Usuario autenticado o botón login */}
            {usuario ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-warning btn-sm dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {usuario.nombres || usuario.nombre || usuario.correo}
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li>
                    <span className="dropdown-item-text text-muted small">
                      Rol: <strong className="text-warning">{usuario.rol}</strong>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {usuario.rol === 'CLIENTE' && (
                    <li>
                      <button className="dropdown-item" onClick={() => onNavegar('mis-citas')}>
                        <i className="bi bi-calendar-event me-2"></i> Historial de Citas
                      </button>
                    </li>
                  )}
                  {(usuario.rol === 'ADMIN' || usuario.rol === 'BARBERO') && (
                    <li>
                      <button className="dropdown-item" onClick={() => onNavegar('admin')}>
                        <i className="bi bi-gear me-2"></i> Administración
                      </button>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item text-danger" onClick={onCerrarSesion}>
                      <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={onAbrirLogin}
              >
                <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión
              </button>
            )}

            {/* Botón Acción Principal: Agendar */}
            <button
              className="btn btn-warning btn-sm fw-bold px-3 text-dark shadow-sm"
              onClick={() => onNavegar('agendamiento')}
            >
              <i className="bi bi-calendar-plus me-1"></i> Agendar Hora
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
