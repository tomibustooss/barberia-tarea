package com.example.service_agendamiento.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.service_agendamiento.model.Cita;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    List<Cita> findByClienteId(Long clienteId);

    List<Cita> findByBarberoId(Long barberoId);

    List<Cita> findByFecha(LocalDate fecha);
}
