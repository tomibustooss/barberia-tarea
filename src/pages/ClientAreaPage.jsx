import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/barberiaApi';

function ClientAreaPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function load() {
      setAppointments(await getAppointments(1));
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Cliente</span>
        <h1 className="mb-0">Mi área personal</h1>
      </div>
      <div className="card border-0 shadow-sm p-4">
        <h2 className="h4">Citas registradas</h2>
        {appointments.length === 0 ? (
          <p className="text-muted mb-0">Todavía no tienes citas agendadas.</p>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Servicio</th>
                  <th>Barbero</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.servicioNombre || appointment.servicioId}</td>
                    <td>{appointment.barberoNombre || appointment.barberoId}</td>
                    <td>{appointment.fecha}</td>
                    <td>{appointment.hora}</td>
                    <td>
                      <span className="badge text-bg-warning">{appointment.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientAreaPage;
