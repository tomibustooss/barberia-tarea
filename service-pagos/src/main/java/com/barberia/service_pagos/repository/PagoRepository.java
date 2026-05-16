package com.barberia.service_pagos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.barberia.service_pagos.model.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByCitaId(Long citaId);

    List<Pago> findByEstado(String estado);
}
