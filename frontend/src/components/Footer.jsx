import React from 'react';

export default function Footer({ onNavegar }) {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 border-top border-secondary mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Columna 1: Marca y descripción */}
          <div className="col-lg-4 col-md-6">
            <h5 className="text-warning fw-bold mb-3">
              <i className="bi bi-scissors me-2"></i>
              BARBERÍA NORTE
            </h5>
            <p className="text-secondary small">
              Especialistas en el cuidado masculino, cortes de vanguardia, degradados milimétricos y el clásico ritual de toalla caliente y navaja. Elevamos el estándar del estilo clásico.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#instagram" className="text-warning"><i className="bi bi-instagram"></i></a>
              <a href="#facebook" className="text-warning"><i className="bi bi-facebook"></i></a>
              <a href="#whatsapp" className="text-warning"><i className="bi bi-whatsapp"></i></a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-uppercase fw-bold text-white mb-3">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => onNavegar('inicio')}>
                  Inicio
                </button>
              </li>
              <li className="mb-2">
                <button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => onNavegar('servicios')}>
                  Servicios y Precios
                </button>
              </li>
              <li className="mb-2">
                <button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => onNavegar('barberos')}>
                  Nuestro Equipo
                </button>
              </li>
              <li className="mb-2">
                <button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => onNavegar('promociones')}>
                  Promociones
                </button>
              </li>
              <li className="mb-2">
                <button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => onNavegar('agendamiento')}>
                  Reservar Cita
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold text-white mb-3">Horario de Atención</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-1"><strong className="text-light">Lunes a Viernes:</strong> 09:30 - 20:30</li>
              <li className="mb-1"><strong className="text-light">Sábados:</strong> 10:00 - 20:00</li>
              <li className="mb-1"><strong className="text-light">Domingos:</strong> Cerrado</li>
              <li className="mt-2 text-warning"><i className="bi bi-clock me-1"></i> Reserva previa recomendada</li>
            </ul>
          </div>

          {/* Columna 4: Contacto y Académico */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold text-white mb-3">Contacto Directo</h6>
            <p className="small text-secondary mb-1">
              <i className="bi bi-geo-alt text-warning me-2"></i> Huechuraba, Providencia y Santiago Centro
            </p>
            <p className="small text-secondary mb-1">
              <i className="bi bi-telephone text-warning me-2"></i> +56 2 2840 9100
            </p>
            <p className="small text-secondary mb-3">
              <i className="bi bi-envelope text-warning me-2"></i> contacto@barberianorte.cl
            </p>
            <span className="badge bg-secondary p-2 small">
              Evaluación 2 - DSY1104 React + Microservicios
            </span>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start small text-secondary">
            &copy; {new Date().getFullYear()} Barbería Norte. Todos los derechos reservados.
          </div>
          <div className="col-md-6 text-center text-md-end small text-secondary">
            Desarrollado para Ingeniería en Informática - DUOC UC
          </div>
        </div>
      </div>
    </footer>
  );
}
