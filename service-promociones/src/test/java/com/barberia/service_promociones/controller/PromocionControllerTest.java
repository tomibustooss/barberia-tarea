package com.barberia.service_promociones.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.barberia.service_promociones.model.Promocion;
import com.barberia.service_promociones.service.PromocionService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(PromocionController.class)
public class PromocionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PromocionService promocionService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Promocion p1 = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionService.listarTodos()).thenReturn(Arrays.asList(p1));

        mockMvc.perform(get("/promociones"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].codigo").value("PROMO10"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Promocion p = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionService.buscarPorId(1L)).thenReturn(Optional.of(p));

        mockMvc.perform(get("/promociones/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.codigo").value("PROMO10"))
                .andExpect(jsonPath("$.descuentoPorcentaje").value(10.0));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(promocionService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/promociones/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Promocion p = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionService.guardar(any(Promocion.class))).thenReturn(p);

        mockMvc.perform(post("/promociones")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.codigo").value("PROMO10"));
    }

    @Test
    void testActualizarExistente() throws Exception {
        Promocion existente = new Promocion(1L, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        Promocion actualizada = new Promocion(1L, "PROMO15", "15% descuento", 15.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));

        when(promocionService.buscarPorId(1L)).thenReturn(Optional.of(existente));
        when(promocionService.guardar(any(Promocion.class))).thenReturn(actualizada);

        mockMvc.perform(put("/promociones/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizada)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.codigo").value("PROMO15"));
    }

    @Test
    void testActualizarNoExistente() throws Exception {
        Promocion p = new Promocion(null, "PROMO10", "10% descuento", 10.0,
                LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31));
        when(promocionService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/promociones/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(p)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(promocionService).eliminar(1L);

        mockMvc.perform(delete("/promociones/1"))
                .andExpect(status().isNoContent());

        verify(promocionService).eliminar(1L);
    }
}
