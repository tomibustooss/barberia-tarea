import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ServiceCard from '../components/ServiceCard.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import { mockServices } from '../data/mockData.js';

describe('ServiceCard', () => {
  it('renderiza la información del servicio y ejecuta el callback de selección', () => {
    const onSelect = jasmine.createSpy('onSelect');

    render(<ServiceCard service={mockServices[0]} onSelect={onSelect} />);

    expect(screen.getByText('Corte clásico')).toBeTruthy();
    expect(screen.getByText('Cabello')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Agendar' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Agendar' }));
    expect(onSelect).toHaveBeenCalledWith(mockServices[0]);
  });
});

describe('LoginPage', () => {
  it('actualiza el estado del formulario al escribir datos', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText('Correo');
    const passwordInput = screen.getByLabelText('Contraseña');

    fireEvent.change(emailInput, { target: { value: 'cliente@barberia.cl' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('cliente@barberia.cl');
    expect(passwordInput.value).toBe('123456');
  });
});
