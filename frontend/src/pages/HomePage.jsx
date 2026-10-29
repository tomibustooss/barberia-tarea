import React from 'react';
import ServiceCard from '../components/ServiceCard';
import BarberCard from '../components/BarberCard';

export default function HomePage({
  servicios,
  barberos,
  promociones,
  onNavegar,
  onSeleccionarServicio,
  onSeleccionarBarbero
}) {
  const serviciosDestacados = servicios.slice(0, 3);
  const promoVigente = promociones && promociones.length > 0 ? promociones[0] : null;

  return (
    <div>
      {/* 1. HERO BANNER */}
      <section className="py-5 text-center bg-dark text-white position-relative border-bottom border-warning"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.92)), url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container py-5">
          <span className="badge bg-warning text-dark text-uppercase px-3 py-2 fw-bold mb-3 shadow-sm">
            <i className="bi bi-award-fill me-1"></i> Tradición & Estilo Masculino
          </span>
          <h1 className="display-4 fw-bold text-white mb-3">
            EL ARTE DEL CORTE Y LA BARBA CLÁSICA
          </h1>
          <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '750px' }}>
            En <strong>Barbería Norte</strong> combinamos técnicas artesanales de barbería tradicional europea con las tendencias urbanas más exigentes. Reserva tu cita online en segundos y vive una experiencia inigualable.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-warning btn-lg fw-bold px-4 py-2 text-dark shadow"
              onClick={() => onNavegar('agendamiento')}
            >
              <i className="bi bi-calendar-check me-2"></i> Reservar Cita Ahora
            </button>
            <button
              className="btn btn-outline-light btn-lg px-4 py-2"
              onClick={() => onNavegar('servicios')}
            >
              <i className="bi bi-scissors me-2"></i> Ver Servicios & Precios
            </button>
          </div>
        </div>
      </section>

      {/* 2. BARRA DE BENEFICIOS / CARACTERÍSTICAS */}
      <section className="bg-black py-4 border-bottom border-secondary text-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <i className="bi bi-shield-check fs-2 text-warning mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">Barberos Certificados</h6>
              <p className="small text-secondary m-0">Años de oficio y precisión</p>
            </div>
            <div className="col-md-3 col-6">
              <i className="bi bi-droplet-half fs-2 text-warning mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">Productos Premium</h6>
              <p className="small text-secondary m-0">Pomadas y aceites importados</p>
            </div>
            <div className="col-md-3 col-6">
              <i className="bi bi-fire fs-2 text-warning mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">Ritual de Toalla Caliente</h6>
              <p className="small text-secondary m-0">Relajación y apertura de poros</p>
            </div>
            <div className="col-md-3 col-6">
              <i className="bi bi-clock-history fs-2 text-warning mb-2 d-block"></i>
              <h6 className="fw-bold mb-1">Reserva 100% Online</h6>
              <p className="small text-secondary m-0">Sin filas ni tiempos muertos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICIOS DESTACADOS */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
            <div>
              <span className="text-warning text-uppercase fw-bold small">Nuestra Carta</span>
              <h2 className="fw-bold text-white m-0">Servicios Más Solicitados</h2>
            </div>
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() => onNavegar('servicios')}
            >
              Ver Catálogo Completo ({servicios.length}) <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <div className="row g-4">
            {serviciosDestacados.map(servicio => (
              <div key={servicio.id} className="col-lg-4 col-md-6">
                <ServiceCard
                  servicio={servicio}
                  onVerDetalle={(s) => onSeleccionarServicio(s)}
                  onAgendar={(s) => {
                    onSeleccionarServicio(s);
                    onNavegar('agendamiento');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BANNER PROMOCIONAL ACTIVO */}
      {promoVigente && (
        <section className="py-4 bg-warning text-dark border-top border-bottom border-dark">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8 text-center text-md-start mb-3 mb-md-0">
                <span className="badge bg-dark text-warning text-uppercase fw-bold mb-2">
                  <i className="bi bi-tag-fill me-1"></i> Promoción Exclusiva Online
                </span>
                <h4 className="fw-bold mb-1">{promoVigente.descripcion}</h4>
                <p className="m-0 text-dark">
                  Usa el cupón <strong className="bg-dark text-white px-2 py-1 rounded font-monospace">{promoVigente.codigo}</strong> durante el agendamiento y ahorra un <strong>{promoVigente.descuentoPorcentaje}%</strong>.
                </p>
              </div>
              <div className="col-md-4 text-center text-md-end">
                <button
                  className="btn btn-dark text-warning fw-bold px-4 py-2 shadow"
                  onClick={() => onNavegar('agendamiento')}
                >
                  <i className="bi bi-check2-circle me-1"></i> Aprovechar Cupón
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. VIDEO CORPORATIVO (Preservado del index.html original) */}
      <section className="py-5 bg-black text-white border-bottom border-secondary">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <span className="text-warning text-uppercase fw-bold small">Conócenos</span>
              <h2 className="fw-bold mb-3">La Experiencia en Barbería Norte</h2>
              <p className="text-secondary">
                Más que un simple corte, te ofrecemos un momento de desconexión y asesoría personalizada de imagen. Cada servicio incluye lavado con productos especiales, diseño a navaja desinfectada y peinado final.
              </p>
              <ul className="list-unstyled text-secondary small">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Sillones ergonómicos reclinables de cuero</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Café de grano y bebidas de cortesía</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Ambiente climatizado y música seleccionada</li>
              </ul>
              <button
                className="btn btn-outline-warning mt-2"
                onClick={() => onNavegar('sucursales')}
              >
                <i className="bi bi-geo-alt me-1"></i> Visitar Nuestras Sucursales
              </button>
            </div>
            <div className="col-lg-7">
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-lg border border-secondary">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/_iQIHOt1KXk?rel=0"
                  title="Video corporativo de Barbería Norte"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NUESTRO EQUIPO DE BARBEROS */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold small">Maestros de la Tijera y la Navaja</span>
            <h2 className="fw-bold text-white">Nuestro Equipo de Profesionales</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Cada barbero cuenta con especialidades únicas para ofrecerte exactamente el estilo que buscas.
            </p>
          </div>

          <div className="row g-4">
            {barberos.map(barbero => (
              <div key={barbero.id} className="col-lg-4 col-md-6">
                <BarberCard
                  barbero={barbero}
                  onSeleccionarParaAgendar={(b) => {
                    onSeleccionarBarbero(b);
                    onNavegar('agendamiento');
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OPINIONES / RESEÑAS */}
      <section className="py-5 bg-black text-white">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-warning text-uppercase fw-bold small">Testimonios Reales</span>
            <h3 className="fw-bold">Lo Que Dicen Nuestros Clientes</h3>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card bg-dark text-light border-secondary p-3 h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="small text-secondary mb-3">
                  "El servicio de Combo Master con Alex fue fenomenal. El ritual de toalla caliente te deja como nuevo. 100% recomendado."
                </p>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning text-dark me-2">JP</span>
                  <div>
                    <h6 className="m-0 fw-bold small">Juan Pablo Rojas</h6>
                    <span className="text-muted small">Sucursal Providencia</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-light border-secondary p-3 h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="small text-secondary mb-3">
                  "Puntualidad impecable. Llegué a mi hora y me estaban esperando. El degradado fade quedó perfecto y el local es muy cómodo."
                </p>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning text-dark me-2">MA</span>
                  <div>
                    <h6 className="m-0 fw-bold small">Matías Aránguiz</h6>
                    <span className="text-muted small">Sucursal Norte</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-dark text-light border-secondary p-3 h-100">
                <div className="text-warning mb-2">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="small text-secondary mb-3">
                  "Excelente atención de Carlos con la barba y el afeitado clásico. Además pude agendar fácilmente desde la página web."
                </p>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning text-dark me-2">FT</span>
                  <div>
                    <h6 className="m-0 fw-bold small">Felipe Toro</h6>
                    <span className="text-muted small">Sucursal Centro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
