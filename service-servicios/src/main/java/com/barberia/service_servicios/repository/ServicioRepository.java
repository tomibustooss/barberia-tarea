package com.barberia.service_servicios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.service_servicios.model.Servicio;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}
