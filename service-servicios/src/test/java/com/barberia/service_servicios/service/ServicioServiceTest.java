package com.barberia.service_servicios.service;

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

import com.barberia.service_servicios.model.Servicio;
import com.barberia.service_servicios.repository.ServicioRepository;

@ExtendWith(MockitoExtension.class)
public class ServicioServiceTest {

    @Mock
    private ServicioRepository servicioRepository;

    @InjectMocks
    private ServicioService servicioService;

    @Test
    void testListar() {
        Servicio s1 = new Servicio(1L, "Corte", 30, 10000.0);
        Servicio s2 = new Servicio(2L, "Barba", 20, 8000.0);
        when(servicioRepository.findAll()).thenReturn(Arrays.asList(s1, s2));

        List<Servicio> resultado = servicioService.listar();

        assertEquals(2, resultado.size());
        assertEquals("Corte", resultado.get(0).getNombre());
        verify(servicioRepository).findAll();
    }

    @Test
    void testObtenerExistente() {
        Servicio s = new Servicio(1L, "Corte", 30, 10000.0);
        when(servicioRepository.findById(1L)).thenReturn(Optional.of(s));

        Servicio resultado = servicioService.obtener(1L);

        assertNotNull(resultado);
        assertEquals("Corte", resultado.getNombre());
        verify(servicioRepository).findById(1L);
    }

    @Test
    void testObtenerNoExistente() {
        when(servicioRepository.findById(99L)).thenReturn(Optional.empty());

        Servicio resultado = servicioService.obtener(99L);

        assertNull(resultado);
        verify(servicioRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Servicio s = new Servicio(null, "Corte", 30, 10000.0);
        Servicio guardado = new Servicio(1L, "Corte", 30, 10000.0);
        when(servicioRepository.save(s)).thenReturn(guardado);

        Servicio resultado = servicioService.guardar(s);

        assertNotNull(resultado.getId());
        assertEquals("Corte", resultado.getNombre());
        verify(servicioRepository).save(s);
    }

    @Test
    void testActualizarExistente() {
        Servicio actual = new Servicio(1L, "Corte", 30, 10000.0);
        Servicio datos = new Servicio(null, "Corte Premium", 45, 15000.0);
        Servicio actualizado = new Servicio(1L, "Corte Premium", 45, 15000.0);

        when(servicioRepository.findById(1L)).thenReturn(Optional.of(actual));
        when(servicioRepository.save(actual)).thenReturn(actualizado);

        Servicio resultado = servicioService.actualizar(1L, datos);

        assertEquals("Corte Premium", resultado.getNombre());
        assertEquals(45, resultado.getDuracionMinutos());
        assertEquals(15000.0, resultado.getPrecio());
        verify(servicioRepository).findById(1L);
        verify(servicioRepository).save(actual);
    }

    @Test
    void testActualizarNoExistente() {
        Servicio datos = new Servicio(null, "Corte Premium", 45, 15000.0);
        when(servicioRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> servicioService.actualizar(99L, datos));
        verify(servicioRepository).findById(99L);
    }

    @Test
    void testEliminar() {
        doNothing().when(servicioRepository).deleteById(1L);

        servicioService.eliminar(1L);

        verify(servicioRepository).deleteById(1L);
    }
}
