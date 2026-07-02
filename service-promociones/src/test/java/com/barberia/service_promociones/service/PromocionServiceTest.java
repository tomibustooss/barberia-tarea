package com.barberia.service_promociones.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.barberia.service_promociones.model.Promocion;
import com.barberia.service_promociones.repository.PromocionRepository;

@ExtendWith(MockitoExtension.class)
public class PromocionServiceTest {

    @Mock
    private PromocionRepository promocionRepository;

    @InjectMocks
    private PromocionService promocionService;

    @Test
    void testListarTodos() {
        Promocion p1 = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        Promocion p2 = new Promocion(2L, "PROMO20", "20% descuento", 20.0,
                LocalDate.of(2026, 6, 1), LocalDate.of(2026, 6, 30));
        when(promocionRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Promocion> resultado = promocionService.listarTodos();

        assertEquals(2, resultado.size());
        assertEquals("PROMO10", resultado.get(0).getCodigo());
        verify(promocionRepository).findAll();
    }

    @Test
    void testBuscarPorIdExistente() {
        Promocion p = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionRepository.findById(1L)).thenReturn(Optional.of(p));

        Optional<Promocion> resultado = promocionService.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("PROMO10", resultado.get().getCodigo());
        verify(promocionRepository).findById(1L);
    }

    @Test
    void testBuscarPorIdNoExistente() {
        when(promocionRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Promocion> resultado = promocionService.buscarPorId(99L);

        assertFalse(resultado.isPresent());
        verify(promocionRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Promocion p = new Promocion(null, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        Promocion guardada = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionRepository.save(p)).thenReturn(guardada);

        Promocion resultado = promocionService.guardar(p);

        assertNotNull(resultado.getId());
        assertEquals("PROMO10", resultado.getCodigo());
        verify(promocionRepository).save(p);
    }

    @Test
    void testEliminar() {
        doNothing().when(promocionRepository).deleteById(1L);

        promocionService.eliminar(1L);

        verify(promocionRepository).deleteById(1L);
    }
}
