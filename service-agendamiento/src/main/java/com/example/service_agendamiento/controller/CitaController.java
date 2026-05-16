package com.example.service_agendamiento.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service_agendamiento.model.Cita;
import com.example.service_agendamiento.services.AgendamientoService;

@RestController
@RequestMapping("/api/v1/citas")
public class CitaController {

    @Autowired
    private AgendamientoService agendamientoService;

    @PostMapping
    public Cita crear(@RequestBody Cita cita) {
        return agendamientoService.guardarCita(cita);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> verDetalle(@PathVariable Long id) {
        Cita c = agendamientoService.obtenerCitaCompleta(id);
        if (c == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(c);
    }

    @GetMapping
    public List<Cita> listar() {
        return agendamientoService.listarTodas();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Cita> listarPorCliente(@PathVariable Long clienteId) {
        return agendamientoService.listarPorCliente(clienteId);
    }

    @GetMapping("/barbero/{barberoId}")
    public List<Cita> listarPorBarbero(@PathVariable Long barberoId) {
        return agendamientoService.listarPorBarbero(barberoId);
    }

    @GetMapping("/fecha/{fecha}")
    public List<Cita> listarPorFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return agendamientoService.listarPorFecha(fecha);
    }
}
