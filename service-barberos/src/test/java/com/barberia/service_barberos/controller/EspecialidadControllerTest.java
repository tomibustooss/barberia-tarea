package com.barberia.service_barberos.controller;

import static org.mockito.ArgumentMatchers.any;
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

import com.barberia.service_barberos.model.Especialidad;
import com.barberia.service_barberos.service.BarberoService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(EspecialidadController.class)
public class EspecialidadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BarberoService barberoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Especialidad e1 = new Especialidad(1L, "Corte clasico");
        Especialidad e2 = new Especialidad(2L, "Barba");
        when(barberoService.listarEspecialidades()).thenReturn(Arrays.asList(e1, e2));

        mockMvc.perform(get("/api/v1/especialidades"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombre").value("Corte clasico"));
    }

    @Test
    void testCrear() throws Exception {
        Especialidad e = new Especialidad(1L, "Corte moderno");
        when(barberoService.guardarEspecialidad(any(Especialidad.class))).thenReturn(e);

        mockMvc.perform(post("/api/v1/especialidades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(e)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Corte moderno"));
    }
}
