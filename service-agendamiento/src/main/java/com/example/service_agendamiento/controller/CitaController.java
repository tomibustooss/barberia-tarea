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
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<?> crear(@RequestBody Cita cita,
            @RequestHeader(value = "rol", required = false) String rol,
            @RequestHeader(value = "usuarioId", required = false) Long usuarioId) {
        if (!"CLIENTE".equals(rol)) {
            return ResponseEntity.status(403).body("Solo los clientes pueden crear reservas");
        }
        cita.setClienteId(usuarioId);
        return ResponseEntity.ok(agendamientoService.guardarCita(cita));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> verDetalle(@PathVariable Long id,
            @RequestHeader(value = "rol", required = false) String rol,
            @RequestHeader(value = "usuarioId", required = false) Long usuarioId) {
        Cita c = agendamientoService.obtenerCitaCompleta(id);
        if (c == null) {
            return ResponseEntity.notFound().build();
        }
        if ("CLIENTE".equals(rol) && !c.getClienteId().equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        if ("BARBERO".equals(rol) && !c.getBarberoId().equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(c);
    }

    @GetMapping
    public List<Cita> listar() {
        return agendamientoService.listarTodas();
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Cita>> listarPorCliente(@PathVariable Long clienteId,
            @RequestHeader(value = "rol", required = false) String rol,
            @RequestHeader(value = "usuarioId", required = false) Long usuarioId) {
        if ("CLIENTE".equals(rol) && !clienteId.equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(agendamientoService.listarPorCliente(clienteId));
    }

    @GetMapping("/barbero/{barberoId}")
    public ResponseEntity<List<Cita>> listarPorBarbero(@PathVariable Long barberoId,
            @RequestHeader(value = "rol", required = false) String rol,
            @RequestHeader(value = "usuarioId", required = false) Long usuarioId) {
        if ("BARBERO".equals(rol) && !barberoId.equals(usuarioId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(agendamientoService.listarPorBarbero(barberoId));
    }

    @GetMapping("/fecha/{fecha}")
    public List<Cita> listarPorFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return agendamientoService.listarPorFecha(fecha);
    }

    @PostMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id, @RequestBody java.util.Map<String, String> body,
            @RequestHeader(value = "rol", required = false) String rol,
            @RequestHeader(value = "usuarioId", required = false) Long usuarioId) {
        Cita c = agendamientoService.obtenerCitaCompleta(id);
        if (c == null) {
            return ResponseEntity.notFound().build();
        }
        String nuevoEstado = body.get("estado");
        if ("CLIENTE".equals(rol)) {
            if (!c.getClienteId().equals(usuarioId)) {
                return ResponseEntity.status(403).body("No autorizado");
            }
            if (!"CANCELADA".equals(nuevoEstado)) {
                return ResponseEntity.status(403).body("Los clientes solo pueden cancelar reservas");
            }
        } else if ("BARBERO".equals(rol)) {
            if (!c.getBarberoId().equals(usuarioId)) {
                return ResponseEntity.status(403).body("No autorizado");
            }
        }
        c.setEstado(nuevoEstado);
        agendamientoService.guardarCita(c);
        return ResponseEntity.ok(c);
    }
}
