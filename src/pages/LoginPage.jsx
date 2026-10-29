import React, { useState } from 'react';

function LoginPage() {
  const [credentials, setCredentials] = useState({ correo: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credentials.correo || !credentials.password) {
      setMessage('Debe ingresar correo y contraseña.');
      return;
    }

    setMessage(`Sesión simulada para ${credentials.correo}. Acceso válido para demo.`);
  };

  return (
    <div className="container py-5">
      <div className="mx-auto card border-0 shadow-sm p-4 login-card">
        <h1 className="h3 mb-3">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo</label>
            <input id="correo" className="form-control" type="email" name="correo" value={credentials.correo} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input id="password" className="form-control" type="password" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <button className="btn btn-dark" type="submit">Ingresar</button>
        </form>
        {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
