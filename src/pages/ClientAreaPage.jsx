import React, { useEffect, useState } from 'react';
import { getAppointments, getBarbers } from '../services/barberiaApi';

function ClientAreaPage() {
  const [appointments, setAppointments] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarberId, setSelectedBarberId] = useState('');

  useEffect(() => {
    async function load() {
      const [appointmentList, barberList] = await Promise.all([
        getAppointments(1),
        getBarbers()
      ]);
      setAppointments(appointmentList);
      setBarbers(barberList);
    }

    load();
  }, []);

  const filteredAppointments = selectedBarberId
    ? appointments.filter((appointment) => Number(appointment.barberoId) === Number(selectedBarberId))
    : appointments;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Cliente</span>
        <h1 className="mb-0">Mi área personal</h1>
      </div>
      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-md-center flex-column flex-md-row gap-3">
          <h2 className="h4 mb-0">Citas registradas</h2>
          <div>
            <label className="form-label mb-1" htmlFor="barber-filter">Filtrar por barbero</label>
            <select
              className="form-select"
              id="barber-filter"
              value={selectedBarberId}
              onChange={(event) => setSelectedBarberId(event.target.value)}
            >
              <option value="">Todos los barberos</option>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>{barber.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        {appointments.length === 0 ? (
          <p className="text-muted mb-0">Todavía no tienes citas agendadas.</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-muted mt-3 mb-0">No tienes citas agendadas con este barbero.</p>
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
                {filteredAppointments.map((appointment) => (
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
