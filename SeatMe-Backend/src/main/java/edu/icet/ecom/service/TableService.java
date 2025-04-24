package edu.icet.ecom.service;

import edu.icet.ecom.dto.Table;
import edu.icet.ecom.entity.TableEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TableService {
    Table createTable(Table tableDTO);
    List<Table> getAllTables();
    List<Table> getAvailableTables();
    boolean isTableAvailable(Long tableId, LocalDateTime requestedTime);
    List<Table> getTablesByRestaurant(Long restaurantId);
    void deleteTableById(Long id);

}
