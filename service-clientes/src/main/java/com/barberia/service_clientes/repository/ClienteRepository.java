package com.barberia.service_clientes.repository;

import com.barberia.service_clientes.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByCorreoAndPassword(String correo, String password);
}
