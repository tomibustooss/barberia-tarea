import React, { useEffect, useState } from 'react';
import { getAdminRecords } from '../services/barberiaApi';

function AdminPage() {
  const [records, setRecords] = useState({
    servicios: [],
    barberos: [],
    sucursales: [],
    citas: [],
    promociones: [],
    inventario: [],
    pagos: []
  });

  useEffect(() => {
    async function load() {
      setRecords(await getAdminRecords());
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Panel administrativo</span>
        <h1 className="mb-0">Gestión de barbería</h1>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="h4">Servicios</h2>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th></tr>
                </thead>
                <tbody>
                  {records.servicios.map((service) => (
                    <tr key={service.id}><td>{service.id}</td><td>{service.nombre}</td><td>${service.precio.toLocaleString('es-CL')}</td><td>{service.categoria}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="h4">Barberos</h2>
            <ul className="list-group list-group-flush">
              {records.barberos.map((barber) => (
                <li key={barber.id} className="list-group-item d-flex justify-content-between">
                  <span>{barber.nombre}</span>
                  <span>{barber.especialidad}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="h4">Citas</h2>
            <ul className="list-group list-group-flush">
              {records.citas.map((cita) => (
                <li key={cita.id} className="list-group-item d-flex justify-content-between">
                  <span>{cita.fecha} - {cita.hora}</span>
                  <span className="badge text-bg-warning">{cita.estado}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="h4">Inventario</h2>
            <ul className="list-group list-group-flush">
              {records.inventario.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{item.producto}</span>
                  <span>{item.stock} unidades</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="h4">Pagos</h2>
            <ul className="list-group list-group-flush">
              {records.pagos.map((pago) => (
                <li key={pago.id} className="list-group-item d-flex justify-content-between">
                  <span>{pago.concepto}</span>
                  <span>${pago.monto.toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
