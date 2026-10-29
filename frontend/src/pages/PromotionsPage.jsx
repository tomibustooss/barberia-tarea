import React, { useState } from 'react';

export default function PromotionsPage({ promociones, onUsarPromocion }) {
  const [copiado, setCopiado] = useState(null);

  const copiarAlPortapapeles = (codigo) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(codigo);
    setTimeout(() => setCopiado(null), 2500);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold small">Beneficios Exclusivos</span>
        <h1 className="display-5 fw-bold text-white">PROMOCIONES Y DESCUENTOS</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          Aprovecha nuestras ofertas especiales vigentes. Copia el código promocional e ingrésalo al momento de confirmar tu cita para obtener el descuento automático.
        </p>
      </div>

      <div className="row g-4">
        {promociones.map(promo => (
          <div key={promo.id} className="col-lg-4 col-md-6">
            <div className="card h-100 bg-dark text-light border-warning border-2 shadow-sm position-relative overflow-hidden">
              <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center py-3">
                <span className="fw-bold fs-5 text-uppercase">
                  <i className="bi bi-tag-fill me-2"></i>
                  {promo.descuentoPorcentaje}% Descuento
                </span>
                <span className="badge bg-dark text-warning">Online</span>
              </div>

              <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title text-white fw-bold mb-3">{promo.descripcion}</h5>
                
                <p className="small text-secondary mb-4 flex-grow-1">
                  Válido desde el <strong className="text-light">{promo.fechaInicio}</strong> hasta el <strong className="text-light">{promo.fechaFin}</strong>. Aplica para clientes registrados o nuevos usuarios al agendar.
                </p>

                {/* Cupón */}
                <div className="p-3 bg-black border border-secondary rounded text-center mb-3">
                  <span className="text-secondary small d-block mb-1">CÓDIGO DE CUPÓN:</span>
                  <span className="fs-4 fw-bold text-warning font-monospace tracking-wide">
                    {promo.codigo}
                  </span>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm"
                    onClick={() => copiarAlPortapapeles(promo.codigo)}
                  >
                    <i className="bi bi-clipboard me-1"></i>
                    {copiado === promo.codigo ? '¡Código Copiado!' : 'Copiar Código'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-warning btn-sm text-dark fw-bold"
                    onClick={() => onUsarPromocion(promo.codigo)}
                  >
                    <i className="bi bi-calendar-check me-1"></i> Aplicar al Agendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
