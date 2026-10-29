import React, { useState } from 'react';

export default function LoginPage({
  onLoginExitoso,
  onRegistrarCliente,
  onCerrar
}) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  // Formulario registro
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('+56 9 ');
  const [run, setRun] = useState('');

  const [error, setError] = useState('');

  // Acceso rápido para evaluación académica
  const iniciarDemo = (tipo) => {
    if (tipo === 'CLIENTE') {
      onLoginExitoso({
        id: 1,
        nombres: 'Juan',
        apellidos: 'Pérez González',
        correo: 'juan.perez@duocuc.cl',
        telefono: '+56 9 9123 4567',
        run: '18.456.789-0',
        rol: 'CLIENTE'
      });
    } else if (tipo === 'BARBERO') {
      onLoginExitoso({
        id: 1,
        nombres: 'Alejandro',
        apellidos: 'Silva',
        correo: 'alex.silva@barberianorte.cl',
        rol: 'BARBERO',
        especialidad: 'Degradados Fade'
      });
    } else if (tipo === 'ADMIN') {
      onLoginExitoso({
        id: 99,
        nombres: 'Héctor',
        apellidos: 'Castillo',
        correo: 'admin@barberianorte.cl',
        rol: 'ADMIN'
      });
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (esRegistro) {
      if (!nombres.trim() || !correo.trim() || !password.trim()) {
        setError('Por favor completa todos los campos requeridos.');
        return;
      }
      const nuevoCliente = {
        nombres,
        apellidos,
        correo,
        telefono,
        run,
        password,
        rol: 'CLIENTE'
      };
      onRegistrarCliente(nuevoCliente);
      onLoginExitoso(nuevoCliente);
    } else {
      if (!correo.trim() || !password.trim()) {
        setError('Ingresa tu correo y contraseña.');
        return;
      }

      // Si es correo de barbero conocido
      if (correo.includes('alex') || correo.includes('carlos') || correo.includes('barbero')) {
        onLoginExitoso({
          id: 1,
          nombres: 'Barbero',
          correo,
          rol: 'BARBERO'
        });
      } else if (correo.includes('admin')) {
        onLoginExitoso({
          id: 99,
          nombres: 'Administrador',
          correo,
          rol: 'ADMIN'
        });
      } else {
        onLoginExitoso({
          id: 1,
          nombres: correo.split('@')[0],
          correo,
          rol: 'CLIENTE'
        });
      }
    }
  };

  return (
    <div className="modal show d-block bg-black bg-opacity-75" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light border-warning border-2 shadow-lg">
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-warning fw-bold">
              <i className="bi bi-person-circle me-2"></i>
              {esRegistro ? 'Crear Cuenta de Cliente' : 'Iniciar Sesión en Barbería Norte'}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Cerrar"
              onClick={onCerrar}
            ></button>
          </div>

          <div className="modal-body p-4">
            {/* ACCESOS DEMO RÁPIDOS PARA EVALUACIÓN */}
            {!esRegistro && (
              <div className="p-3 bg-black rounded border border-secondary mb-4">
                <span className="text-warning small text-uppercase fw-bold d-block mb-2">
                  <i className="bi bi-lightning-charge-fill me-1"></i> Accesos Rápidos para Evaluación:
                </span>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm flex-fill"
                    onClick={() => iniciarDemo('CLIENTE')}
                  >
                    <i className="bi bi-person me-1"></i> Cliente Demo
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info btn-sm flex-fill"
                    onClick={() => iniciarDemo('BARBERO')}
                  >
                    <i className="bi bi-scissors me-1"></i> Barbero Demo
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm flex-fill"
                    onClick={() => iniciarDemo('ADMIN')}
                  >
                    <i className="bi bi-shield-lock me-1"></i> Admin Demo
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger py-2 small" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={manejarSubmit}>
              {esRegistro && (
                <>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small text-secondary">Nombres *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        required
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-secondary">Apellidos</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small text-secondary">Teléfono</label>
                      <input
                        type="tel"
                        className="form-control bg-dark text-light border-secondary"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-secondary">RUT</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="12.345.678-9"
                        value={run}
                        onChange={(e) => setRun(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label small text-secondary">Correo Electrónico *</label>
                <input
                  type="email"
                  className="form-control bg-dark text-light border-secondary"
                  required
                  placeholder="ejemplo@correo.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-secondary">Contraseña *</label>
                <input
                  type="password"
                  className="form-control bg-dark text-light border-secondary"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-warning text-dark fw-bold py-2">
                  {esRegistro ? 'Registrarme e Ingresar' : 'Iniciar Sesión'}
                </button>
              </div>
            </form>
          </div>

          <div className="modal-footer border-secondary justify-content-center">
            {esRegistro ? (
              <span className="small text-secondary">
                ¿Ya tienes una cuenta?{' '}
                <button
                  type="button"
                  className="btn btn-link text-warning p-0 text-decoration-none small"
                  onClick={() => setEsRegistro(false)}
                >
                  Inicia sesión aquí
                </button>
              </span>
            ) : (
              <span className="small text-secondary">
                ¿Primera vez en Barbería Norte?{' '}
                <button
                  type="button"
                  className="btn btn-link text-warning p-0 text-decoration-none small"
                  onClick={() => setEsRegistro(true)}
                >
                  Regístrate como nuevo cliente
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
