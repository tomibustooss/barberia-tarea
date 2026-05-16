package com.barberia.service_barberos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.service_barberos.model.Barbero;
import com.barberia.service_barberos.service.BarberoService;

@RestController
@RequestMapping("/api/v1/barberos")
public class BarberoController {

    @Autowired
    private BarberoService barberoService;

    @PostMapping
    public Barbero crear(@RequestBody Barbero barbero) {
        return barberoService.guardar(barbero);
    }

    @GetMapping
    public List<Barbero> listar(@RequestParam(value = "especialidadId", required = false) Long especialidadId) {
        if (especialidadId != null) {
            return barberoService.listarPorEspecialidad(especialidadId);
        }
        return barberoService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbero> obtener(@PathVariable Long id) {
        Barbero b = barberoService.obtener(id);
        if (b == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(b);
    }
}
