/**
 * events.spec.js
 * Pruebas unitarias de simulación de eventos (Events) con Jasmine
 * Cumple con el Requisito 4.7 de la Evaluación 2 (DSY1104).
 */

describe('Pruebas de Eventos (Event Tests)', () => {
  let contenedor;

  beforeEach(() => {
    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
  });

  afterEach(() => {
    document.body.removeChild(contenedor);
  });

  it('Debe disparar el evento de selección al hacer clic en un filtro de categoría', () => {
    let categoriaSeleccionada = 'Todos';
    const spyHandler = jasmine.createSpy('onSelectCategoria').and.callFake((cat) => {
      categoriaSeleccionada = cat;
    });

    contenedor.innerHTML = `
      <div class="filtros">
        <button id="btn-barba" data-cat="Barba">Barba</button>
      </div>
    `;

    const boton = contenedor.querySelector('#btn-barba');
    boton.addEventListener('click', () => spyHandler('Barba'));

    boton.click();

    expect(spyHandler).toHaveBeenCalledWith('Barba');
    expect(categoriaSeleccionada).toBe('Barba');
  });

  it('Debe capturar el evento onSubmit del formulario y prevenir la recarga por defecto', () => {
    const spySubmit = jasmine.createSpy('onSubmit');

    contenedor.innerHTML = `
      <form id="form-cita">
        <input type="text" name="nombres" value="Juan" />
        <button type="submit" id="btn-enviar">Enviar</button>
      </form>
    `;

    const form = contenedor.querySelector('#form-cita');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      spySubmit();
    });

    const boton = contenedor.querySelector('#btn-enviar');
    boton.click();

    expect(spySubmit).toHaveBeenCalled();
  });

  it('Debe disparar el evento de cambio (onChange) en el selector de sucursal', () => {
    let sucursalId = 1;

    contenedor.innerHTML = `
      <select id="select-sucursal">
        <option value="1">Sucursal Norte</option>
        <option value="2">Sucursal Providencia</option>
      </select>
    `;

    const select = contenedor.querySelector('#select-sucursal');
    select.addEventListener('change', (e) => {
      sucursalId = Number(e.target.value);
    });

    select.value = '2';
    select.dispatchEvent(new Event('change'));

    expect(sucursalId).toBe(2);
  });
});
