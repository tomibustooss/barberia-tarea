package com.barberia.service_inventario.service;

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

import com.barberia.service_inventario.model.Inventario;
import com.barberia.service_inventario.repository.InventarioRepository;

@ExtendWith(MockitoExtension.class)
public class InventarioServiceTest {

    @Mock
    private InventarioRepository inventarioRepository;

    @InjectMocks
    private InventarioService inventarioService;

    @Test
    void testListarTodos() {
        Inventario i1 = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        Inventario i2 = new Inventario(2L, "Cera", 30, 5, 3000.0);
        when(inventarioRepository.findAll()).thenReturn(Arrays.asList(i1, i2));

        List<Inventario> resultado = inventarioService.listarTodos();

        assertEquals(2, resultado.size());
        assertEquals("Shampoo", resultado.get(0).getProductoNombre());
        verify(inventarioRepository).findAll();
    }

    @Test
    void testBuscarPorIdExistente() {
        Inventario i = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        when(inventarioRepository.findById(1L)).thenReturn(Optional.of(i));

        Optional<Inventario> resultado = inventarioService.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Shampoo", resultado.get().getProductoNombre());
        verify(inventarioRepository).findById(1L);
    }

    @Test
    void testBuscarPorIdNoExistente() {
        when(inventarioRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Inventario> resultado = inventarioService.buscarPorId(99L);

        assertFalse(resultado.isPresent());
        verify(inventarioRepository).findById(99L);
    }

    @Test
    void testGuardar() {
        Inventario i = new Inventario(null, "Shampoo", 50, 10, 5000.0);
        Inventario guardado = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        when(inventarioRepository.save(i)).thenReturn(guardado);

        Inventario resultado = inventarioService.guardar(i);

        assertNotNull(resultado.getId());
        assertEquals("Shampoo", resultado.getProductoNombre());
        verify(inventarioRepository).save(i);
    }

    @Test
    void testEliminar() {
        doNothing().when(inventarioRepository).deleteById(1L);

        inventarioService.eliminar(1L);

        verify(inventarioRepository).deleteById(1L);
    }
}
