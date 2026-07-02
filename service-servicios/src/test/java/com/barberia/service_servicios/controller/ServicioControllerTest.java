package com.barberia.service_servicios.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.barberia.service_servicios.model.Servicio;
import com.barberia.service_servicios.service.ServicioService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ServicioController.class)
public class ServicioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ServicioService servicioService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Servicio s1 = new Servicio(1L, "Corte", 30, 10000.0);
        Servicio s2 = new Servicio(2L, "Barba", 20, 8000.0);
        when(servicioService.listar()).thenReturn(Arrays.asList(s1, s2));

        mockMvc.perform(get("/api/v1/servicios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Corte"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Servicio s = new Servicio(1L, "Corte", 30, 10000.0);
        when(servicioService.obtener(1L)).thenReturn(s);

        mockMvc.perform(get("/api/v1/servicios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Corte"))
                .andExpect(jsonPath("$.duracionMinutos").value(30));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(servicioService.obtener(99L)).thenReturn(null);

        mockMvc.perform(get("/api/v1/servicios/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Servicio s = new Servicio(1L, "Corte", 30, 10000.0);
        when(servicioService.guardar(any(Servicio.class))).thenReturn(s);

        mockMvc.perform(post("/api/v1/servicios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(s)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Corte"));
    }

    @Test
    void testActualizar() throws Exception {
        Servicio actualizado = new Servicio(1L, "Corte Premium", 45, 15000.0);
        when(servicioService.actualizar(eq(1L), any(Servicio.class))).thenReturn(actualizado);

        mockMvc.perform(put("/api/v1/servicios/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Corte Premium"));
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(servicioService).eliminar(1L);

        mockMvc.perform(delete("/api/v1/servicios/1"))
                .andExpect(status().isNoContent());

        verify(servicioService).eliminar(1L);
    }
}
