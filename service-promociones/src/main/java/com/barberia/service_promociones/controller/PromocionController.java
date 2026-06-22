package com.barberia.service_promociones.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.barberia.service_promociones.model.Promocion;
import com.barberia.service_promociones.service.PromocionService;

@RestController
@RequestMapping("/promociones")
public class PromocionController {

    @Autowired
    private PromocionService promocionService;

    @GetMapping
    public List<Promocion> listar() {
        return promocionService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Promocion> obtener(@PathVariable Long id) {
        return promocionService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Promocion> crear(@RequestBody Promocion promocion) {
        return ResponseEntity.ok(promocionService.guardar(promocion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Promocion> actualizar(@PathVariable Long id, @RequestBody Promocion promocion) {
        return promocionService.buscarPorId(id)
                .map(existente -> {
                    promocion.setId(id);
                    return ResponseEntity.ok(promocionService.guardar(promocion));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        promocionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
