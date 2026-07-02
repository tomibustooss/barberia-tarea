package com.barberia.service_empleados.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.barberia.service_empleados.model.Empleado;
import com.barberia.service_empleados.repository.EmpleadoRepository;

@ExtendWith(MockitoExtension.class)
public class EmpleadoServiceTest {

    @Mock
    private EmpleadoRepository empleadoRepository;

    @InjectMocks
    private EmpleadoService empleadoService;

    @Test
    void testListarTodos() {
        Empleado e1 = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        Empleado e2 = new Empleado(2L, "98765432-1", "Maria", "Lopez", "Recepcionista", 400000.0);
        when(empleadoRepository.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<Empleado> resultado = empleadoService.listarTodos();

        assertEquals(2, resultado.size());
        assertEquals("Juan", resultado.get(0).getNombres());
        verify(empleadoRepository).findAll();
    }

    @Test
    void testBuscarPorIdExistente() {
        Empleado e = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        when(empleadoRepository.findById(1L)).thenReturn(Optional.of(e));

        Optional<Empleado> resultado = empleadoService.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Juan", resultado.get().getNombres());
        verify(empleadoRepository).findById(1L);
    }

    @Test
    void testBuscarPorIdNoExistente() {
        when(empleadoRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Empleado> resultado = empleadoService.buscarPorId(99L);

        assertFalse(resultado.isPresent());
        verify(empleadoRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Empleado e = new Empleado(null, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        Empleado guardado = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        when(empleadoRepository.save(e)).thenReturn(guardado);

        Empleado resultado = empleadoService.guardar(e);

        assertNotNull(resultado.getId());
        assertEquals("Juan", resultado.getNombres());
        verify(empleadoRepository).save(e);
    }

    @Test
    void testEliminar() {
        doNothing().when(empleadoRepository).deleteById(1L);

        empleadoService.eliminar(1L);

        verify(empleadoRepository).deleteById(1L);
    }
}
