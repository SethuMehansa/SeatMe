package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Table;
import edu.icet.ecom.service.TableService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
@CrossOrigin
public class TableController {

    private final TableService tableService;

    @PostMapping("/create-table")
    public ResponseEntity<Table> createTable(@RequestBody Table table) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tableService.createTable(table));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Table>> getAllTables() {
        return ResponseEntity.ok(tableService.getAllTables());
    }

    @GetMapping("/available/{tableId}")
    public ResponseEntity<Boolean> isTableAvailable(
            @PathVariable Long tableId,
            @RequestParam("time") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime requestedTime
    ) {
        boolean available = tableService.isTableAvailable(tableId, requestedTime);
        return ResponseEntity.ok(available);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Table>> getAllAvailableTables() {
        return ResponseEntity.ok(tableService.getAvailableTables());
    }
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Table>> getTablesByRestaurant(@PathVariable Long restaurantId) {
        List<Table> tables = tableService.getTablesByRestaurant(restaurantId);
        return ResponseEntity.ok(tables);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        tableService.deleteTableById(id);
        return ResponseEntity.noContent().build();
    }

}


