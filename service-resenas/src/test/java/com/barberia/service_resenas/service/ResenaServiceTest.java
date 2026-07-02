package com.barberia.service_resenas.service;

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

import com.barberia.service_resenas.model.Resena;
import com.barberia.service_resenas.repository.ResenaRepository;

@ExtendWith(MockitoExtension.class)
public class ResenaServiceTest {

    @Mock
    private ResenaRepository resenaRepository;

    @InjectMocks
    private ResenaService resenaService;

    @Test
    void testListarTodos() {
        Resena r1 = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        Resena r2 = new Resena(2L, 2L, 2L, 4, "Buen servicio");
        when(resenaRepository.findAll()).thenReturn(Arrays.asList(r1, r2));

        List<Resena> resultado = resenaService.listarTodos();

        assertEquals(2, resultado.size());
        assertEquals("Excelente servicio", resultado.get(0).getComentario());
        verify(resenaRepository).findAll();
    }

    @Test
    void testBuscarPorIdExistente() {
        Resena r = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        when(resenaRepository.findById(1L)).thenReturn(Optional.of(r));

        Optional<Resena> resultado = resenaService.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals(5, resultado.get().getCalificacion());
        verify(resenaRepository).findById(1L);
    }

    @Test
    void testBuscarPorIdNoExistente() {
        when(resenaRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Resena> resultado = resenaService.buscarPorId(99L);

        assertFalse(resultado.isPresent());
        verify(resenaRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Resena r = new Resena(null, 1L, 1L, 5, "Excelente servicio");
        Resena guardada = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        when(resenaRepository.save(r)).thenReturn(guardada);

        Resena resultado = resenaService.guardar(r);

        assertNotNull(resultado.getId());
        assertEquals("Excelente servicio", resultado.getComentario());
        verify(resenaRepository).save(r);
    }

    @Test
    void testEliminar() {
        doNothing().when(resenaRepository).deleteById(1L);

        resenaService.eliminar(1L);

        verify(resenaRepository).deleteById(1L);
    }
}
