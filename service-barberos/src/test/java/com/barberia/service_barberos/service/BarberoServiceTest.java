package com.barberia.service_barberos.service;

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

import com.barberia.service_barberos.model.Barbero;
import com.barberia.service_barberos.model.Especialidad;
import com.barberia.service_barberos.repository.BarberoRepository;
import com.barberia.service_barberos.repository.EspecialidadRepository;

@ExtendWith(MockitoExtension.class)
public class BarberoServiceTest {

    @Mock
    private BarberoRepository barberoRepository;

    @Mock
    private EspecialidadRepository especialidadRepository;

    @InjectMocks
    private BarberoService barberoService;

    @Test
    void testListar() {
        Barbero b1 = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        Barbero b2 = new Barbero(2L, "Pedro", "98765432-1", "pedro@mail.com", "5678", "BARBERO", null);
        when(barberoRepository.findAll()).thenReturn(Arrays.asList(b1, b2));

        List<Barbero> resultado = barberoService.listar();

        assertEquals(2, resultado.size());
        assertEquals("Carlos", resultado.get(0).getNombre());
        verify(barberoRepository).findAll();
    }

    @Test
    void testObtenerExistente() {
        Barbero b = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoRepository.findById(1L)).thenReturn(Optional.of(b));

        Barbero resultado = barberoService.obtener(1L);

        assertNotNull(resultado);
        assertEquals("Carlos", resultado.getNombre());
        verify(barberoRepository).findById(1L);
    }

    @Test
    void testObtenerNoExistente() {
        when(barberoRepository.findById(99L)).thenReturn(Optional.empty());

        Barbero resultado = barberoService.obtener(99L);

        assertNull(resultado);
        verify(barberoRepository).findById(99L);
    }

    @Test
    void testGuardarSinEspecialidad() {
        Barbero b = new Barbero(null, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        Barbero guardado = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoRepository.save(b)).thenReturn(guardado);

        Barbero resultado = barberoService.guardar(b);

        assertNotNull(resultado.getId());
        assertEquals("Carlos", resultado.getNombre());
        verify(barberoRepository).save(b);
    }

    @Test
    void testGuardarConEspecialidadExistente() {
        Especialidad esp = new Especialidad(1L, "Corte clasico");
        Barbero b = new Barbero(null, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", esp);
        Barbero guardado = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", esp);

        when(especialidadRepository.findById(1L)).thenReturn(Optional.of(esp));
        when(barberoRepository.save(b)).thenReturn(guardado);

        Barbero resultado = barberoService.guardar(b);

        assertNotNull(resultado.getId());
        assertEquals("Corte clasico", resultado.getEspecialidad().getNombre());
        verify(especialidadRepository).findById(1L);
        verify(barberoRepository).save(b);
    }

    @Test
    void testGuardarConEspecialidadNoExistente() {
        Especialidad esp = new Especialidad(99L, "No existe");
        Barbero b = new Barbero(null, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", esp);

        when(especialidadRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> barberoService.guardar(b));
        verify(especialidadRepository).findById(99L);
    }

    @Test
    void testListarPorEspecialidad() {
        Especialidad esp = new Especialidad(1L, "Corte clasico");
        Barbero b1 = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", esp);
        when(barberoRepository.findByEspecialidadId(1L)).thenReturn(Arrays.asList(b1));

        List<Barbero> resultado = barberoService.listarPorEspecialidad(1L);

        assertEquals(1, resultado.size());
        verify(barberoRepository).findByEspecialidadId(1L);
    }

    @Test
    void testGuardarEspecialidad() {
        Especialidad esp = new Especialidad(null, "Corte moderno");
        Especialidad guardada = new Especialidad(1L, "Corte moderno");
        when(especialidadRepository.save(esp)).thenReturn(guardada);

        Especialidad resultado = barberoService.guardarEspecialidad(esp);

        assertNotNull(resultado.getId());
        assertEquals("Corte moderno", resultado.getNombre());
        verify(especialidadRepository).save(esp);
    }

    @Test
    void testListarEspecialidades() {
        Especialidad e1 = new Especialidad(1L, "Corte clasico");
        Especialidad e2 = new Especialidad(2L, "Barba");
        when(especialidadRepository.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<Especialidad> resultado = barberoService.listarEspecialidades();

        assertEquals(2, resultado.size());
        verify(especialidadRepository).findAll();
    }

    @Test
    void testLoginExitoso() {
        Barbero b = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoRepository.findByCorreoAndPassword("carlos@mail.com", "1234")).thenReturn(b);

        Barbero resultado = barberoService.login("carlos@mail.com", "1234");

        assertNotNull(resultado);
        assertEquals("Carlos", resultado.getNombre());
        verify(barberoRepository).findByCorreoAndPassword("carlos@mail.com", "1234");
    }

    @Test
    void testLoginFallido() {
        when(barberoRepository.findByCorreoAndPassword("noexiste@mail.com", "wrong")).thenReturn(null);

        Barbero resultado = barberoService.login("noexiste@mail.com", "wrong");

        assertNull(resultado);
        verify(barberoRepository).findByCorreoAndPassword("noexiste@mail.com", "wrong");
    }
}
