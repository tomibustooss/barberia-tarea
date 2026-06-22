package com.barberia.service_resenas.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.barberia.service_resenas.model.Resena;
import com.barberia.service_resenas.repository.ResenaRepository;

@Service
public class ResenaService {

    @Autowired
    private ResenaRepository resenaRepository;

    public List<Resena> listarTodos() {
        return resenaRepository.findAll();
    }

    public Optional<Resena> buscarPorId(Long id) {
        return resenaRepository.findById(id);
    }

    public Resena guardar(Resena resena) {
        return resenaRepository.save(resena);
    }

    public void eliminar(Long id) {
        resenaRepository.deleteById(id);
    }
}
