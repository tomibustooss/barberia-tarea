import React, { useEffect, useState } from 'react';
import { getPromotions } from '../services/barberiaApi';

function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    async function load() {
      setPromotions(await getPromotions());
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Ofertas</span>
        <h1 className="mb-0">Promociones activas</h1>
      </div>
      <div className="row g-4">
        {promotions.map((promo) => (
          <div className="col-md-6 col-xl-4" key={promo.id}>
            <div className="card border-0 shadow-sm h-100 promo-card">
              <div className="card-body">
                <span className="promo-card__badge">{promo.descuento}</span>
                <h3 className="h4 mt-3">{promo.titulo}</h3>
                <p>{promo.descripcion}</p>
                <small className="text-secondary">{promo.vigencia}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromotionsPage;
