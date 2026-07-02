package com.barberia.service_inventario.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.barberia.service_inventario.model.Inventario;
import com.barberia.service_inventario.service.InventarioService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(InventarioController.class)
public class InventarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private InventarioService inventarioService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Inventario i1 = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        Inventario i2 = new Inventario(2L, "Cera", 30, 5, 3000.0);
        when(inventarioService.listarTodos()).thenReturn(Arrays.asList(i1, i2));

        mockMvc.perform(get("/inventario"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].productoNombre").value("Shampoo"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Inventario i = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        when(inventarioService.buscarPorId(1L)).thenReturn(Optional.of(i));

        mockMvc.perform(get("/inventario/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productoNombre").value("Shampoo"))
                .andExpect(jsonPath("$.stockActual").value(50));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(inventarioService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/inventario/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Inventario i = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        when(inventarioService.guardar(any(Inventario.class))).thenReturn(i);

        mockMvc.perform(post("/inventario")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(i)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productoNombre").value("Shampoo"));
    }

    @Test
    void testActualizarExistente() throws Exception {
        Inventario existente = new Inventario(1L, "Shampoo", 50, 10, 5000.0);
        Inventario actualizado = new Inventario(1L, "Shampoo Premium", 60, 15, 7000.0);

        when(inventarioService.buscarPorId(1L)).thenReturn(Optional.of(existente));
        when(inventarioService.guardar(any(Inventario.class))).thenReturn(actualizado);

        mockMvc.perform(put("/inventario/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productoNombre").value("Shampoo Premium"));
    }

    @Test
    void testActualizarNoExistente() throws Exception {
        Inventario i = new Inventario(null, "Shampoo", 50, 10, 5000.0);
        when(inventarioService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/inventario/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(i)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(inventarioService).eliminar(1L);

        mockMvc.perform(delete("/inventario/1"))
                .andExpect(status().isNoContent());

        verify(inventarioService).eliminar(1L);
    }
}
