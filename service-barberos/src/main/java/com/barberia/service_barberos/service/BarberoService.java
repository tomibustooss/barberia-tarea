package com.barberia.service_barberos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.service_barberos.model.Barbero;
import com.barberia.service_barberos.model.Especialidad;
import com.barberia.service_barberos.repository.BarberoRepository;
import com.barberia.service_barberos.repository.EspecialidadRepository;

@Service
public class BarberoService {

    @Autowired
    private BarberoRepository barberoRepository;

    @Autowired
    private EspecialidadRepository especialidadRepository;

    public Barbero guardar(Barbero barbero) {
        if (barbero.getEspecialidad() != null && barbero.getEspecialidad().getId() != null) {
            Especialidad e = especialidadRepository.findById(barbero.getEspecialidad().getId())
                    .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
            barbero.setEspecialidad(e);
        }
        return barberoRepository.save(barbero);
    }

    public Barbero obtener(Long id) {
        return barberoRepository.findById(id).orElse(null);
    }

    public List<Barbero> listar() {
        return barberoRepository.findAll();
    }

    public List<Barbero> listarPorEspecialidad(Long especialidadId) {
        return barberoRepository.findByEspecialidadId(especialidadId);
    }

    public Especialidad guardarEspecialidad(Especialidad especialidad) {
        return especialidadRepository.save(especialidad);
    }

    public List<Especialidad> listarEspecialidades() {
        return especialidadRepository.findAll();
    }

    public Barbero login(String correo, String password) {
        return barberoRepository.findByCorreoAndPassword(correo, password);
    }
}
