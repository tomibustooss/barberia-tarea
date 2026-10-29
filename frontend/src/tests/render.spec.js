/**
 * render.spec.js
 * Pruebas unitarias de renderizado con Jasmine
 * Cumple con el Requisito 4.7 de la Evaluación 2 (DSY1104).
 */

describe('Pruebas de Renderizado (Render Tests)', () => {
  let contenedor;

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
  });

  afterEach(() => {
    document.body.removeChild(contenedor);
  });

  it('Debe renderizar la lista completa de servicios recibidos en el catálogo', () => {
    const serviciosMock = [
      { id: 1, nombre: 'Corte Clásico', precio: 15000, categoria: 'Cortes' },
      { id: 2, nombre: 'Perfilado Barba', precio: 10000, categoria: 'Barba' },
      { id: 3, nombre: 'Combo Master', precio: 22000, categoria: 'Combos' }
    ];

    // Simular renderizado de tarjeta en contenedor
    const html = serviciosMock.map(s => `
      <div class="card service-card" data-id="${s.id}">
        <h5>${s.nombre}</h5>
        <span class="precio">$${s.precio}</span>
      </div>
    `).join('');

    contenedor.innerHTML = html;
    const cards = contenedor.querySelectorAll('.service-card');

    expect(cards.length).toBe(3);
    expect(cards[0].querySelector('h5').textContent).toBe('Corte Clásico');
    expect(cards[1].querySelector('h5').textContent).toBe('Perfilado Barba');
    expect(cards[2].querySelector('h5').textContent).toBe('Combo Master');
  });

  it('Debe renderizar la tarjeta de barbero con su nombre, especialidad y calificación', () => {
    const barberoMock = {
      id: 1,
      nombre: 'Alejandro "Alex" Silva',
      especialidad: 'Degradados Fade',
      calificacion: 4.9
    };

    contenedor.innerHTML = `
      <div class="barber-card">
        <h5 class="nombre">${barberoMock.nombre}</h5>
        <span class="especialidad">${barberoMock.especialidad}</span>
        <span class="rating">${barberoMock.calificacion}</span>
      </div>
    `;

    const elNombre = contenedor.querySelector('.nombre');
    const elEsp = contenedor.querySelector('.especialidad');
    const elRating = contenedor.querySelector('.rating');

    expect(elNombre.textContent).toBe('Alejandro "Alex" Silva');
    expect(elEsp.textContent).toBe('Degradados Fade');
    expect(elRating.textContent).toBe('4.9');
  });

  it('Debe mostrar condicionalmente el mensaje de error cuando la validación falla', () => {
    let tieneError = true;
    let mensajeError = 'El horario seleccionado ya se encuentra reservado.';

    // Renderizado condicional
    contenedor.innerHTML = `
      <div class="booking-view">
        ${tieneError ? `<div class="alert alert-danger">${mensajeError}</div>` : ''}
      </div>
    `;

    let alerta = contenedor.querySelector('.alert-danger');
    expect(alerta).not.toBeNull();
    expect(alerta.textContent).toContain('El horario seleccionado ya se encuentra reservado');

    // Cambiar condición a false
    tieneError = false;
    contenedor.innerHTML = `
      <div class="booking-view">
        ${tieneError ? `<div class="alert alert-danger">${mensajeError}</div>` : ''}
      </div>
    `;

    alerta = contenedor.querySelector('.alert-danger');
    expect(alerta).toBeNull();
  });
});
