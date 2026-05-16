package com.barberia.service_pagos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.service_pagos.model.Pago;
import com.barberia.service_pagos.service.PagoService;

@RestController
@RequestMapping("/api/v1/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @PostMapping
    public Pago registrar(@RequestBody Pago pago) {
        return pagoService.registrar(pago);
    }

    @GetMapping
    public List<Pago> listar(@RequestParam(value = "estado", required = false) String estado) {
        if (estado != null && !estado.isBlank()) {
            return pagoService.listarPorEstado(estado);
        }
        return pagoService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtener(@PathVariable Long id) {
        Pago p = pagoService.obtener(id);
        if (p == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(p);
    }

    @GetMapping("/cita/{citaId}")
    public List<Pago> listarPorCita(@PathVariable Long citaId) {
        return pagoService.listarPorCita(citaId);
    }

    @PatchMapping("/{id}/estado")
    public Pago cambiarEstado(@PathVariable Long id, @RequestParam String estado) {
        return pagoService.cambiarEstado(id, estado);
    }
}
