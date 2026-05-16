package com.barberia.service_clientes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.barberia.service_clientes.model.Cliente;
import com.barberia.service_clientes.repository.ClienteRepository;

import jakarta.transaction.Transactional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    @Transactional
    public Cliente guardar(Cliente cliente) {
        // Si el cliente viene con una ficha, hacemos que la ficha
        // conozca a su cliente para que JPA guarde bien la relacion 1 a 1.
        if (cliente.getFichaCliente() != null) {
            cliente.getFichaCliente().setCliente(cliente);
        }
        return clienteRepository.save(cliente);
    }

    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }
}
