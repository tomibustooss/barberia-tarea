package com.barberia.service_sucursales.service;

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

import com.barberia.service_sucursales.model.Sucursal;
import com.barberia.service_sucursales.repository.SucursalRepository;

@ExtendWith(MockitoExtension.class)
public class SucursalServiceTest {

    @Mock
    private SucursalRepository sucursalRepository;

    @InjectMocks
    private SucursalService sucursalService;

    @Test
    void testListarTodos() {
        Sucursal s1 = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        Sucursal s2 = new Sucursal(2L, "Sucursal Norte", "Calle Norte 200", "987654321");
        when(sucursalRepository.findAll()).thenReturn(Arrays.asList(s1, s2));

        List<Sucursal> resultado = sucursalService.listarTodos();

        assertEquals(2, resultado.size());
        assertEquals("Sucursal Centro", resultado.get(0).getNombre());
        verify(sucursalRepository).findAll();
    }

    @Test
    void testBuscarPorIdExistente() {
        Sucursal s = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        when(sucursalRepository.findById(1L)).thenReturn(Optional.of(s));

        Optional<Sucursal> resultado = sucursalService.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Sucursal Centro", resultado.get().getNombre());
        verify(sucursalRepository).findById(1L);
    }

    @Test
    void testBuscarPorIdNoExistente() {
        when(sucursalRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Sucursal> resultado = sucursalService.buscarPorId(99L);

        assertFalse(resultado.isPresent());
        verify(sucursalRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Sucursal s = new Sucursal(null, "Sucursal Centro", "Av. Principal 100", "912345678");
        Sucursal guardada = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        when(sucursalRepository.save(s)).thenReturn(guardada);

        Sucursal resultado = sucursalService.guardar(s);

        assertNotNull(resultado.getId());
        assertEquals("Sucursal Centro", resultado.getNombre());
        verify(sucursalRepository).save(s);
    }

    @Test
    void testEliminar() {
        doNothing().when(sucursalRepository).deleteById(1L);

        sucursalService.eliminar(1L);

        verify(sucursalRepository).deleteById(1L);
    }
}
