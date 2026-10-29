import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import BarberCard from '../components/BarberCard';
import { getBarbers, getServices } from '../services/barberiaApi';

function HomePage() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    async function load() {
      const [serviceList, barberList] = await Promise.all([getServices(), getBarbers()]);
      setServices(serviceList.slice(0, 3));
      setBarbers(barberList.slice(0, 3));
    }

    load();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge text-bg-light text-dark fw-semibold mb-3">Barbería & estilo</span>
              <h1 className="display-4 fw-bold mb-3">Tu mejor look empieza con un corte pensado para ti.</h1>
              <p className="lead text-light-emphasis mb-4">
                Servicios premium, barberos expertos y una experiencia de agendamiento moderna para cada cliente.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/agendamiento" className="btn btn-warning btn-lg">Reservar cita</Link>
                <Link to="/servicios" className="btn btn-outline-dark btn-lg">Ver servicios</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual shadow-lg">
                <img src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80" alt="Barbero trabajando" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="stat-box">
              <div className="stat-box__number">4.9</div>
              <div className="stat-box__label">Calificación promedio</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-box">
              <div className="stat-box__number">1.2k</div>
              <div className="stat-box__label">Clientes atendidos</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-box">
              <div className="stat-box__number">3</div>
              <div className="stat-box__label">Sucursales activas</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="section-heading d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="section-tag">Servicios destacados</span>
            <h2 className="mb-0">Atención con estilo</h2>
          </div>
          <Link to="/servicios" className="btn btn-link text-dark fw-semibold">Ver todo</Link>
        </div>
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-6 col-xl-4" key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>

      <section className="container py-4">
        <div className="section-heading d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="section-tag">Equipo</span>
            <h2 className="mb-0">Nuestros barberos</h2>
          </div>
          <Link to="/barberos" className="btn btn-link text-dark fw-semibold">Conocer más</Link>
        </div>
        <div className="row g-4">
          {barbers.map((barber) => (
            <div className="col-md-6 col-xl-4" key={barber.id}>
              <BarberCard barber={barber} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
