package com.barberia.service_resenas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.barberia.service_resenas.model.Resena;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {
}
