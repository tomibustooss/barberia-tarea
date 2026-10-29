import React from 'react';
import BranchCard from '../components/BranchCard';

export default function BranchesPage({ sucursales, onAgendarEnSucursal }) {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold small">Ubicaciones Estratégicas</span>
        <h1 className="display-5 fw-bold text-white">NUESTRAS SUCURSALES</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          Encuentra tu Barbería Norte más cercana. Todos nuestros locales cuentan con sillones premium, climatización, café de grano de cortesía y estacionamiento en las cercanías.
        </p>
      </div>

      <div className="row g-4">
        {sucursales.map(sucursal => (
          <div key={sucursal.id} className="col-lg-4 col-md-6">
            <BranchCard
              sucursal={sucursal}
              onAgendarEnSucursal={onAgendarEnSucursal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
