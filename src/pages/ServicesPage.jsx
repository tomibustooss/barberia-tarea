import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { getServices } from '../services/barberiaApi';

function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      const result = await getServices();
      setServices(result);
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <span className="section-tag">Catálogo</span>
          <h1 className="mb-0">Servicios de barbería</h1>
        </div>
        <Link to="/agendamiento" className="btn btn-warning">Agendar ahora</Link>
      </div>

      <div className="row g-4">
        {services.map((service) => (
          <div className="col-md-6 col-xl-3" key={service.id}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesPage;
