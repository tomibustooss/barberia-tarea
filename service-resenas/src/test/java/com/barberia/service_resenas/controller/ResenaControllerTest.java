package com.barberia.service_resenas.controller;

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

import com.barberia.service_resenas.model.Resena;
import com.barberia.service_resenas.service.ResenaService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ResenaController.class)
public class ResenaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ResenaService resenaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Resena r1 = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        Resena r2 = new Resena(2L, 2L, 2L, 4, "Buen servicio");
        when(resenaService.listarTodos()).thenReturn(Arrays.asList(r1, r2));

        mockMvc.perform(get("/resenas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].comentario").value("Excelente servicio"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Resena r = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        when(resenaService.buscarPorId(1L)).thenReturn(Optional.of(r));

        mockMvc.perform(get("/resenas/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.calificacion").value(5))
                .andExpect(jsonPath("$.comentario").value("Excelente servicio"));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(resenaService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/resenas/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Resena r = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        when(resenaService.guardar(any(Resena.class))).thenReturn(r);

        mockMvc.perform(post("/resenas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(r)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comentario").value("Excelente servicio"));
    }

    @Test
    void testActualizarExistente() throws Exception {
        Resena existente = new Resena(1L, 1L, 1L, 5, "Excelente servicio");
        Resena actualizada = new Resena(1L, 1L, 1L, 4, "Buen servicio");

        when(resenaService.buscarPorId(1L)).thenReturn(Optional.of(existente));
        when(resenaService.guardar(any(Resena.class))).thenReturn(actualizada);

        mockMvc.perform(put("/resenas/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizada)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.comentario").value("Buen servicio"));
    }

    @Test
    void testActualizarNoExistente() throws Exception {
        Resena r = new Resena(null, 1L, 1L, 5, "Excelente servicio");
        when(resenaService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/resenas/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(r)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(resenaService).eliminar(1L);

        mockMvc.perform(delete("/resenas/1"))
                .andExpect(status().isNoContent());

        verify(resenaService).eliminar(1L);
    }
}
