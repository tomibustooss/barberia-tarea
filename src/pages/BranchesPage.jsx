import React, { useEffect, useState } from 'react';
import { getBranches } from '../services/barberiaApi';

function BranchesPage() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function load() {
      setBranches(await getBranches());
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="section-tag">Sucursales</span>
        <h1 className="mb-0">Encuentra tu punto más cercano</h1>
      </div>
      <div className="row g-4">
        {branches.map((branch) => (
          <div className="col-md-6 col-xl-4" key={branch.id}>
            <article className="card h-100 border-0 shadow-sm p-3">
              <div className="card-body">
                <h3 className="h4">{branch.nombre}</h3>
                <p className="text-muted mb-2">{branch.direccion}</p>
                <p className="mb-1"><strong>Horario:</strong> {branch.horario}</p>
                <p className="mb-0"><strong>Teléfono:</strong> {branch.telefono}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BranchesPage;
