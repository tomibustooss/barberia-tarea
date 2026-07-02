package com.barberia.service_empleados.controller;

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

import com.barberia.service_empleados.model.Empleado;
import com.barberia.service_empleados.service.EmpleadoService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(EmpleadoController.class)
public class EmpleadoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private EmpleadoService empleadoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testListar() throws Exception {
        Empleado e1 = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        Empleado e2 = new Empleado(2L, "98765432-1", "Maria", "Lopez", "Recepcionista", 400000.0);
        when(empleadoService.listarTodos()).thenReturn(Arrays.asList(e1, e2));

        mockMvc.perform(get("/empleados"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombres").value("Juan"));
    }

    @Test
    void testObtenerExistente() throws Exception {
        Empleado e = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        when(empleadoService.buscarPorId(1L)).thenReturn(Optional.of(e));

        mockMvc.perform(get("/empleados/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombres").value("Juan"))
                .andExpect(jsonPath("$.cargo").value("Administrador"));
    }

    @Test
    void testObtenerNoExistente() throws Exception {
        when(empleadoService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/empleados/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCrear() throws Exception {
        Empleado e = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        when(empleadoService.guardar(any(Empleado.class))).thenReturn(e);

        mockMvc.perform(post("/empleados")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(e)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombres").value("Juan"));
    }

    @Test
    void testActualizarExistente() throws Exception {
        Empleado existente = new Empleado(1L, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        Empleado actualizado = new Empleado(1L, "12345678-9", "Juan Carlos", "Perez", "Gerente", 600000.0);

        when(empleadoService.buscarPorId(1L)).thenReturn(Optional.of(existente));
        when(empleadoService.guardar(any(Empleado.class))).thenReturn(actualizado);

        mockMvc.perform(put("/empleados/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(actualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombres").value("Juan Carlos"));
    }

    @Test
    void testActualizarNoExistente() throws Exception {
        Empleado e = new Empleado(null, "12345678-9", "Juan", "Perez", "Administrador", 500000.0);
        when(empleadoService.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/empleados/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(e)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testEliminar() throws Exception {
        doNothing().when(empleadoService).eliminar(1L);

        mockMvc.perform(delete("/empleados/1"))
                .andExpect(status().isNoContent());

        verify(empleadoService).eliminar(1L);
    }
}
