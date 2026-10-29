import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-3 align-items-center">
        <div>
          <strong>Barbería Norte</strong>
          <div className="small text-secondary">Gestión y agendamiento de servicios</div>
        </div>
        <div className="small text-secondary">© 2026 Todos los derechos reservados</div>
      </div>
    </footer>
  );
}

export default Footer;
