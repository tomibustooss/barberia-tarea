package com.example.service_agendamiento.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.service_agendamiento.model.Cita;
import com.example.service_agendamiento.repository.CitaRepository;

@Service
public class AgendamientoService {

    private static final String FALLBACK_CLIENTE = "Informacion de cliente no disponible actualmente";
    private static final String FALLBACK_BARBERO = "Informacion de barbero no disponible actualmente";
    private static final String FALLBACK_SERVICIO = "Informacion de servicio no disponible actualmente";

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${barberia.service-clientes.url:http://localhost:8082}")
    private String clientesUrl;

    @Value("${barberia.service-barberos.url:http://localhost:8084}")
    private String barberosUrl;

    @Value("${barberia.service-servicios.url:http://localhost:8085}")
    private String serviciosUrl;

    public Cita guardarCita(Cita cita) {
        if (cita.getClienteId() == null) {
            throw new RuntimeException("clienteId es obligatorio");
        }
        if (cita.getBarberoId() == null) {
            throw new RuntimeException("barberoId es obligatorio");
        }
        if (cita.getServicioId() == null) {
            throw new RuntimeException("servicioId es obligatorio");
        }

        // Falla rapido si alguna referencia no existe.
        if (fetch(clientesUrl + "/clientes/" + cita.getClienteId()) == null) {
            throw new RuntimeException("Cliente no encontrado: " + cita.getClienteId());
        }
        if (fetch(barberosUrl + "/api/v1/barberos/" + cita.getBarberoId()) == null) {
            throw new RuntimeException("Barbero no encontrado: " + cita.getBarberoId());
        }
        if (fetch(serviciosUrl + "/api/v1/servicios/" + cita.getServicioId()) == null) {
            throw new RuntimeException("Servicio no encontrado: " + cita.getServicioId());
        }

        Cita guardada = citaRepository.save(cita);
        return enriquecer(guardada);
    }

    public Cita obtenerCitaCompleta(Long id) {
        Cita cita = citaRepository.findById(id).orElse(null);
        if (cita == null) {
            return null;
        }
        return enriquecer(cita);
    }

    public List<Cita> listarTodas() {
        return citaRepository.findAll().stream().map(this::enriquecer).toList();
    }

    public List<Cita> listarPorCliente(Long clienteId) {
        return citaRepository.findByClienteId(clienteId).stream().map(this::enriquecer).toList();
    }

    public List<Cita> listarPorBarbero(Long barberoId) {
        return citaRepository.findByBarberoId(barberoId).stream().map(this::enriquecer).toList();
    }

    public List<Cita> listarPorFecha(LocalDate fecha) {
        return citaRepository.findByFecha(fecha).stream().map(this::enriquecer).toList();
    }

    private Cita enriquecer(Cita cita) {
        Object cliente = fetch(clientesUrl + "/clientes/" + cita.getClienteId());
        cita.setDatosCliente(cliente != null ? cliente : FALLBACK_CLIENTE);

        Object barbero = fetch(barberosUrl + "/api/v1/barberos/" + cita.getBarberoId());
        cita.setDatosBarbero(barbero != null ? barbero : FALLBACK_BARBERO);

        Object servicio = fetch(serviciosUrl + "/api/v1/servicios/" + cita.getServicioId());
        cita.setDatosServicio(servicio != null ? servicio : FALLBACK_SERVICIO);

        return cita;
    }

    private Object fetch(String url) {
        try {
            return webClientBuilder.build()
                    .get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();
        } catch (Exception e) {
            return null;
        }
    }
}
