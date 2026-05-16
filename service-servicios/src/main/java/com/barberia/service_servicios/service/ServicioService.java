package com.barberia.service_servicios.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.service_servicios.model.Servicio;
import com.barberia.service_servicios.repository.ServicioRepository;

@Service
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    public Servicio guardar(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio obtener(Long id) {
        return servicioRepository.findById(id).orElse(null);
    }

    public List<Servicio> listar() {
        return servicioRepository.findAll();
    }

    public Servicio actualizar(Long id, Servicio datos) {
        Servicio actual = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        actual.setNombre(datos.getNombre());
        actual.setDuracionMinutos(datos.getDuracionMinutos());
        actual.setPrecio(datos.getPrecio());
        return servicioRepository.save(actual);
    }

    public void eliminar(Long id) {
        servicioRepository.deleteById(id);
    }
}
