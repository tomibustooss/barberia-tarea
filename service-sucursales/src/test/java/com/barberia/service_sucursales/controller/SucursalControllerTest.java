package com.barberia.service_sucursales.controller;

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

import com.barberia.service_sucursales.model.Sucursal;
import com.barberia.service_sucursales.service.SucursalService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(SucursalController.class)
public class SucursalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private SucursalService sucursalService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Sucursal s1 = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        Sucursal s2 = new Sucursal(2L, "Sucursal Norte", "Calle Norte 200", "987654321");
        when(sucursalService.listarTodos()).thenReturn(Arrays.asList(s1, s2));

        mockMvc.perform(get("/sucursales"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Sucursal Centro"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Sucursal s = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        when(sucursalService.buscarPorId(1L)).thenReturn(Optional.of(s));

        mockMvc.perform(get("/sucursales/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Sucursal Centro"))
                .andExpect(jsonPath("$.direccion").value("Av. Principal 100"));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(sucursalService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/sucursales/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Sucursal s = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        when(sucursalService.guardar(any(Sucursal.class))).thenReturn(s);

        mockMvc.perform(post("/sucursales")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(s)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Sucursal Centro"));
    }

    @Test
    void testActualizarExistente() throws Exception {
        Sucursal existente = new Sucursal(1L, "Sucursal Centro", "Av. Principal 100", "912345678");
        Sucursal actualizada = new Sucursal(1L, "Sucursal Centro Actualizada", "Av. Principal 200", "912345678");

        when(sucursalService.buscarPorId(1L)).thenReturn(Optional.of(existente));
        when(sucursalService.guardar(any(Sucursal.class))).thenReturn(actualizada);

        mockMvc.perform(put("/sucursales/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizada)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Sucursal Centro Actualizada"));
    }

    @Test
    void testActualizarNoExistente() throws Exception {
        Sucursal s = new Sucursal(null, "Sucursal Centro", "Av. Principal 100", "912345678");
        when(sucursalService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/sucursales/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(s)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(sucursalService).eliminar(1L);

        mockMvc.perform(delete("/sucursales/1"))
                .andExpect(status().isNoContent());

        verify(sucursalService).eliminar(1L);
    }
}
