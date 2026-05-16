package com.barberia.service_clientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.barberia.service_clientes.model.TipoCliente;
import com.barberia.service_clientes.repository.TipoClienteRepository;

import java.util.List;

@RestController
@RequestMapping("/tipos-cliente")
public class TipoClienteController {

    @Autowired
    private TipoClienteRepository tipoClienteRepository;

    @GetMapping
    public List<TipoCliente> listar() {
        return tipoClienteRepository.findAll();
    }

    @PostMapping
    public TipoCliente crear(@RequestBody TipoCliente tipoCliente) {
        return tipoClienteRepository.save(tipoCliente);
    }
}
