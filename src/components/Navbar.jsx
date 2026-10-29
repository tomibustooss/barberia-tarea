import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/barberos', label: 'Barberos' },
  { to: '/sucursales', label: 'Sucursales' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/agendamiento', label: 'Agendamiento' },
  { to: '/administracion', label: 'Administración' },
  { to: '/clientes', label: 'Área cliente' }
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">Barbería Norte</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
