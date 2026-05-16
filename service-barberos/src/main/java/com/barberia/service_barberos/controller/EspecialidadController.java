package com.barberia.service_barberos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barberia.service_barberos.model.Especialidad;
import com.barberia.service_barberos.service.BarberoService;

@RestController
@RequestMapping("/api/v1/especialidades")
public class EspecialidadController {

    @Autowired
    private BarberoService barberoService;

    @PostMapping
    public Especialidad crear(@RequestBody Especialidad especialidad) {
        return barberoService.guardarEspecialidad(especialidad);
    }

    @GetMapping
    public List<Especialidad> listar() {
        return barberoService.listarEspecialidades();
    }
}
