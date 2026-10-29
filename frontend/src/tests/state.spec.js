/**
 * state.spec.js
 * Pruebas unitarias de manejo de estado (State) con Jasmine
 * Cumple con el Requisito 4.7 de la Evaluación 2 (DSY1104).
 */

describe('Pruebas de Estado (State Tests)', () => {
  it('Debe actualizar el estado al ingresar información en un campo de texto', () => {
    let estadoFormulario = {
      nombres: '',
      correo: ''
    };

    const actualizarCampo = (campo, valor) => {
      estadoFormulario = {
        ...estadoFormulario,
        [campo]: valor
      };
    };

    // Simular escritura en nombres
    actualizarCampo('nombres', 'Carlos');
    expect(estadoFormulario.nombres).toBe('Carlos');

    // Simular escritura en correo
    actualizarCampo('correo', 'carlos@gmail.com');
    expect(estadoFormulario.correo).toBe('carlos@gmail.com');
  });

  it('Debe avanzar y retroceder el número de paso en el flujo de agendamiento', () => {
    let pasoActual = 1;

    const avanzar = () => { if (pasoActual < 5) pasoActual += 1; };
    const retroceder = () => { if (pasoActual > 1) pasoActual -= 1; };

    expect(pasoActual).toBe(1);

    avanzar(); // Paso 2: Sucursal y barbero
    expect(pasoActual).toBe(2);

    avanzar(); // Paso 3: Fecha y hora
    expect(pasoActual).toBe(3);

    retroceder(); // Vuelve a Paso 2
    expect(pasoActual).toBe(2);
  });

  it('Debe actualizar el porcentaje de descuento y recalcular el total al aplicar cupón', () => {
    let estadoReserva = {
      precioBase: 20000,
      descuentoPorcentaje: 0,
      totalFinal: 20000
    };

    const aplicarCupon = (porcentaje) => {
      const descuento = Math.round(estadoReserva.precioBase * (porcentaje / 100));
      estadoReserva = {
        ...estadoReserva,
        descuentoPorcentaje: porcentaje,
        totalFinal: estadoReserva.precioBase - descuento
      };
    };

    // Aplicar cupón de 20%
    aplicarCupon(20);
    expect(estadoReserva.descuentoPorcentaje).toBe(20);
    expect(estadoReserva.totalFinal).toBe(16000);

    // Aplicar cupón de 10%
    aplicarCupon(10);
    expect(estadoReserva.descuentoPorcentaje).toBe(10);
    expect(estadoReserva.totalFinal).toBe(18000);
  });
});
