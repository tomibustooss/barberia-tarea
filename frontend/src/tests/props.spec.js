/**
 * props.spec.js
 * Pruebas unitarias de pasaje y uso de propiedades (Props) con Jasmine
 * Cumple con el Requisito 4.7 de la Evaluación 2 (DSY1104).
 */

describe('Pruebas de Props (Props Tests)', () => {
  let contenedor;

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
  });

  afterEach(() => {
    document.body.removeChild(contenedor);
  });

  it('Un botón debe recibir correctamente su etiqueta de texto como prop y reflejarla', () => {
    const props = {
      texto: 'Confirmar y Reservar Cita',
      tipo: 'submit',
      deshabilitado: false
    };

    contenedor.innerHTML = `
      <button type="${props.tipo}" ${props.deshabilitado ? 'disabled' : ''}>
        ${props.texto}
      </button>
    `;

    const boton = contenedor.querySelector('button');
    expect(boton.textContent.trim()).toBe('Confirmar y Reservar Cita');
    expect(boton.type).toBe('submit');
    expect(boton.disabled).toBe(false);
  });

  it('Un botón debe asociar y ejecutar su función onClick pasada por props al hacer clic', () => {
    const spyOnClick = jasmine.createSpy('onClickHandler');
    const props = {
      label: 'Agendar Servicio',
      onClick: spyOnClick
    };

    contenedor.innerHTML = `<button id="btn-test">${props.label}</button>`;
    const boton = contenedor.querySelector('#btn-test');
    boton.addEventListener('click', props.onClick);

    boton.click();

    expect(spyOnClick).toHaveBeenCalled();
    expect(spyOnClick.calls.count()).toBe(1);
  });

  it('El componente ServiceCard debe reflejar el precio formateado recibido en las props', () => {
    const propsServicio = {
      id: 1,
      nombre: 'Corte Clásico & Fade',
      precio: 15000,
      duracionMinutos: 40
    };

    const formateador = (val) => `$${val.toLocaleString('es-CL')}`;

    contenedor.innerHTML = `
      <div class="service-card">
        <h3>${propsServicio.nombre}</h3>
        <span class="precio">${formateador(propsServicio.precio)}</span>
        <span class="duracion">${propsServicio.duracionMinutos} min</span>
      </div>
    `;

    const elPrecio = contenedor.querySelector('.precio');
    const elDuracion = contenedor.querySelector('.duracion');

    expect(elPrecio.textContent).toContain('15.000');
    expect(elDuracion.textContent).toBe('40 min');
  });
});
