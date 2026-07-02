package com.barberia.service_barberos.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.barberia.service_barberos.model.Barbero;
import com.barberia.service_barberos.service.BarberoService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(BarberoController.class)
public class BarberoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BarberoService barberoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListarTodos() throws Exception {
        Barbero b1 = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        Barbero b2 = new Barbero(2L, "Pedro", "98765432-1", "pedro@mail.com", "5678", "BARBERO", null);
        when(barberoService.listar()).thenReturn(Arrays.asList(b1, b2));

        mockMvc.perform(get("/api/v1/barberos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Carlos"));
    }

    @Test
    void testListarPorEspecialidad() throws Exception {
        Barbero b1 = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoService.listarPorEspecialidad(1L)).thenReturn(Arrays.asList(b1));

        mockMvc.perform(get("/api/v1/barberos").param("especialidadId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));

        verify(barberoService).listarPorEspecialidad(1L);
    }

    @Test
    void testObtenerExistente() throws Exception {
        Barbero b = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoService.obtener(1L)).thenReturn(b);

        mockMvc.perform(get("/api/v1/barberos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Carlos"))
                .andExpect(jsonPath("$.correo").value("carlos@mail.com"));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(barberoService.obtener(99L)).thenReturn(null);

        mockMvc.perform(get("/api/v1/barberos/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Barbero b = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoService.guardar(any(Barbero.class))).thenReturn(b);

        mockMvc.perform(post("/api/v1/barberos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(b)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Carlos"));
    }

    @Test
    void testLoginExitoso() throws Exception {
        Barbero b = new Barbero(1L, "Carlos", "12345678-9", "carlos@mail.com", "1234", "BARBERO", null);
        when(barberoService.login("carlos@mail.com", "1234")).thenReturn(b);

        String json = "{\"correo\":\"carlos@mail.com\",\"password\":\"1234\"}";

        mockMvc.perform(post("/api/v1/barberos/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Carlos"));
    }

    @Test
    void testLoginFallido() throws Exception {
        when(barberoService.login("noexiste@mail.com", "wrong")).thenReturn(null);

        String json = "{\"correo\":\"noexiste@mail.com\",\"password\":\"wrong\"}";

        mockMvc.perform(post("/api/v1/barberos/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isUnauthorized());
    }
}
