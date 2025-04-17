package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.TableEntity;
import edu.icet.ecom.repository.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TableServiceImpl {

    private final TableRepository tableRepository;

    public List<TableEntity> getTablesByRestaurantId(Long restaurantId) {
        return tableRepository.findByRestaurantId(restaurantId);
    }

    public List<TableEntity> getAvailableTablesByRestaurantId(Long restaurantId) {
        return tableRepository.findByRestaurantIdAndAvailableTrue(restaurantId);
    }

    public TableEntity addTable(TableEntity table) {
        return tableRepository.save(table);
    }

    public Optional<TableEntity> getTableById(Long id) {
        return tableRepository.findById(id);
    }
}

