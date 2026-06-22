package com.barberia.service_promociones.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.barberia.service_promociones.model.Promocion;

@Repository
public interface PromocionRepository extends JpaRepository<Promocion, Long> {
}
