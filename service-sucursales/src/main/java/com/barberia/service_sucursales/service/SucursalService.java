package com.barberia.service_sucursales.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.barberia.service_sucursales.model.Sucursal;
import com.barberia.service_sucursales.repository.SucursalRepository;

@Service
public class SucursalService {

    @Autowired
    private SucursalRepository sucursalRepository;

    public List<Sucursal> listarTodos() {
        return sucursalRepository.findAll();
    }

    public Optional<Sucursal> buscarPorId(Long id) {
        return sucursalRepository.findById(id);
    }

    public Sucursal guardar(Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    public void eliminar(Long id) {
        sucursalRepository.deleteById(id);
    }
}
