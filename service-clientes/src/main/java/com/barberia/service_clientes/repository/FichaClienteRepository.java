package com.barberia.service_clientes.repository;

import com.barberia.service_clientes.model.FichaCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaClienteRepository extends JpaRepository<FichaCliente, Long> {
}
