import React, { useEffect, useState } from 'react';
import BarberCard from '../components/BarberCard';
import { getBarbers } from '../services/barberiaApi';

function BarbersPage() {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    async function load() {
      setBarbers(await getBarbers());
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Equipo profesional</span>
        <h1 className="mb-0">Conoce a nuestros barberos</h1>
      </div>
      <div className="row g-4">
        {barbers.map((barber) => (
          <div className="col-md-6 col-xl-4" key={barber.id}>
            <BarberCard barber={barber} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarbersPage;
