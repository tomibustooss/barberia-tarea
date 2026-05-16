package com.barberia.service_clientes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ficha_cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FichaCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String preferencias;
    private String alergias;
    private String observaciones;

    @OneToOne
    @JoinColumn(name = "cliente_id", unique = true)
    @JsonIgnore
    private Cliente cliente;

}
