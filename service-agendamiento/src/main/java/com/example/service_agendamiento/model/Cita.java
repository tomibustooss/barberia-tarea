package com.example.service_agendamiento.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private LocalTime hora;
    private Double costo;
    private String estado;

    private Long clienteId;
    private Long barberoId;
    private Long servicioId;

    @Transient
    private Object datosCliente;

    @Transient
    private Object datosBarbero;

    @Transient
    private Object datosServicio;
}
