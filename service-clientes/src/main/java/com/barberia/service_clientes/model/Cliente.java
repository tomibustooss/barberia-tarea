package com.barberia.service_clientes.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String run;
    private String nombres;
    private String apellidos;
    private String correo;
    private String telefono;
    
    private String password;
    private String rol = "CLIENTE";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_cliente_id")
    private TipoCliente tipoCliente;

    @OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL)
    private FichaCliente fichaCliente;

}
