package com.barberia.service_pagos.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.barberia.service_pagos.model.Pago;
import com.barberia.service_pagos.repository.PagoRepository;

@Service
public class PagoService {

    private static final String FALLBACK_CITA = "Informacion de cita no disponible actualmente";

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${barberia.service-agendamiento.url:http://localhost:8083}")
    private String agendamientoUrl;

    public Pago registrar(Pago pago) {
        if (pago.getCitaId() == null) {
            throw new RuntimeException("citaId es obligatorio");
        }
        if (fetchCita(pago.getCitaId()) == null) {
            throw new RuntimeException("Cita no encontrada: " + pago.getCitaId());
        }
        if (pago.getEstado() == null || pago.getEstado().isBlank()) {
            pago.setEstado("PENDIENTE");
        }
        if (pago.getFecha() == null) {
            pago.setFecha(LocalDateTime.now());
        }
        Pago guardado = pagoRepository.save(pago);
        return enriquecer(guardado);
    }

    public Pago obtener(Long id) {
        Pago p = pagoRepository.findById(id).orElse(null);
        if (p == null) {
            return null;
        }
        return enriquecer(p);
    }

    public List<Pago> listar() {
        return pagoRepository.findAll().stream().map(this::enriquecer).toList();
    }

    public List<Pago> listarPorCita(Long citaId) {
        return pagoRepository.findByCitaId(citaId).stream().map(this::enriquecer).toList();
    }

    public List<Pago> listarPorEstado(String estado) {
        return pagoRepository.findByEstado(estado).stream().map(this::enriquecer).toList();
    }

    public Pago cambiarEstado(Long id, String estado) {
        Pago p = pagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));
        p.setEstado(estado);
        return enriquecer(pagoRepository.save(p));
    }

    private Pago enriquecer(Pago pago) {
        Object cita = fetchCita(pago.getCitaId());
        pago.setDatosCita(cita != null ? cita : FALLBACK_CITA);
        return pago;
    }

    private Object fetchCita(Long citaId) {
        try {
            return webClientBuilder.build()
                    .get()
                    .uri(agendamientoUrl + "/api/v1/citas/" + citaId)
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();
        } catch (Exception e) {
            return null;
        }
    }
}
