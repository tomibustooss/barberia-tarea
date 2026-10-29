import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createAppointment, getBarbers, getBranches, getServices } from '../services/barberiaApi';

const initialForm = {
  servicioId: '',
  barberoId: '',
  sucursalId: '',
  fecha: '',
  hora: '',
  nombre: '',
  correo: '',
  telefono: ''
};

function BookingPage() {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const [serviceList, barberList, branchList] = await Promise.all([
        getServices(),
        getBarbers(),
        getBranches()
      ]);
      setServices(serviceList);
      setBarbers(barberList);
      setBranches(branchList);
    }

    loadData();
  }, []);

  const selectedService = useMemo(
    () => services.find((service) => Number(service.id) === Number(form.servicioId)) || null,
    [services, form.servicioId]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.servicioId || !form.barberoId || !form.sucursalId || !form.fecha || !form.hora || !form.nombre || !form.correo || !form.telefono) {
      setError('Debes completar todos los campos para realizar la reserva.');
      setResult('');
      return;
    }

    const servicioSeleccionado = services.find((service) => Number(service.id) === Number(form.servicioId));
    const barberoSeleccionado = barbers.find((barber) => Number(barber.id) === Number(form.barberoId));
    const sucursalSeleccionada = branches.find((branch) => Number(branch.id) === Number(form.sucursalId));

    const payload = {
      servicioId: Number(form.servicioId),
      barberoId: Number(form.barberoId),
      sucursalId: Number(form.sucursalId),
      fecha: form.fecha,
      hora: form.hora,
      clienteId: 1,
      clienteNombre: form.nombre,
      clienteCorreo: form.correo,
      clienteTelefono: form.telefono,
      servicioNombre: servicioSeleccionado?.nombre || 'Servicio',
      barberoNombre: barberoSeleccionado?.nombre || 'Barbero',
      sucursalNombre: sucursalSeleccionada?.nombre || 'Sucursal',
      estado: 'PENDIENTE'
    };

    const response = await createAppointment(payload);

    if (response && response.error) {
      setError(response.error);
      setResult('');
      return;
    }

    if (response && response.id) {
      setResult(`¡Reserva confirmada! Quedaste agendado para ${form.fecha} a las ${form.hora} con ${barberoSeleccionado?.nombre || 'nuestro barbero'} en ${sucursalSeleccionada?.nombre || 'la sucursal'}.`);
      setError('');
      setForm(initialForm);
    } else {
      setError('No se pudo completar la reserva en este momento. Intenta nuevamente más tarde.');
      setResult('');
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Agendamiento</span>
        <h1 className="mb-0">Reserva tu cita</h1>
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-lg-7">
          <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Servicio</label>
                <select className="form-select" name="servicioId" value={form.servicioId} onChange={handleChange}>
                  <option value="">Seleccione un servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Barbero</label>
                <select className="form-select" name="barberoId" value={form.barberoId} onChange={handleChange}>
                  <option value="">Seleccione un barbero</option>
                  {barbers.map((barber) => (
                    <option key={barber.id} value={barber.id}>{barber.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Sucursal</label>
                <select className="form-select" name="sucursalId" value={form.sucursalId} onChange={handleChange}>
                  <option value="">Seleccione una sucursal</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha</label>
                <input className="form-control" type="date" name="fecha" value={form.fecha} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Hora</label>
                <input className="form-control" type="time" name="hora" value={form.hora} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Diego Torres" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Correo</label>
                <input className="form-control" type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com" />
              </div>

              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input className="form-control" type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+56 9 1234 5678" />
              </div>
            </div>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <button className="btn btn-warning" type="submit">Confirmar reserva</button>
              <button className="btn btn-outline-dark" type="button" onClick={() => setForm(initialForm)}>Reiniciar</button>
            </div>
          </form>
        </div>

        <aside className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 summary-card">
            <h2 className="h4">Resumen</h2>
            {selectedService ? (
              <>
                <p className="mb-1"><strong>Servicio:</strong> {selectedService.nombre}</p>
                <p className="mb-1"><strong>Precio:</strong> ${selectedService.precio.toLocaleString('es-CL')}</p>
                <p className="mb-1"><strong>Duración:</strong> {selectedService.duracionMinutos} min</p>
              </>
            ) : (
              <p className="text-muted">Selecciona un servicio para ver detalles.</p>
            )}

            <hr />
            <p className="mb-1"><strong>Cliente:</strong> {form.nombre || 'Sin nombre'}</p>
            <p className="mb-1"><strong>Fecha:</strong> {form.fecha || '---'}</p>
            <p className="mb-0"><strong>Hora:</strong> {form.hora || '---'}</p>
          </div>

          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
          {result && (
            <>
              <div className="alert alert-success mt-3 mb-0">{result}</div>
              <Link to="/clientes" className="btn btn-dark mt-3 w-100">Ver mi agendamiento</Link>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default BookingPage;
