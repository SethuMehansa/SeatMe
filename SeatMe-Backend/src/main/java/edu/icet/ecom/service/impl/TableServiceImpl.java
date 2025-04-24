package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.ReservationEntity;
import edu.icet.ecom.entity.TableEntity;
import edu.icet.ecom.repository.ReservationRepository;
import edu.icet.ecom.repository.TableRepository;
import edu.icet.ecom.service.TableService;
import edu.icet.ecom.dto.Table;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;
    private final ModelMapper modelMapper;

    // Create a new table and return the DTO
    @Override
    public Table createTable(Table tableDTO) {
        TableEntity tableEntity = modelMapper.map(tableDTO, TableEntity.class);
        TableEntity savedTable = tableRepository.save(tableEntity);
        return modelMapper.map(savedTable, Table.class);
    }

    // Get all tables and return a list of DTOs
    @Override
    public List<Table> getAllTables() {
        return tableRepository.findAll().stream()
                .map(tableEntity -> modelMapper.map(tableEntity, Table.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<Table> getAvailableTables() {
        return tableRepository.findByAvailableTrue().stream()
                .map(table -> modelMapper.map(table, Table.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isTableAvailable(Long tableId, LocalDateTime requestedTime) {
        List<ReservationEntity> reservations = reservationRepository.findByTableId(tableId);

        for (ReservationEntity reservation : reservations) {
            LocalDateTime start = reservation.getReservationTime();
            LocalDateTime end = start.plusHours(2); // Assume 2-hour time slots
            if (!requestedTime.isBefore(start) && !requestedTime.isAfter(end)) {
                return false;
            }
        }
        return true;
    }
    @Override
    public List<Table> getTablesByRestaurant(Long restaurantId) {
        List<TableEntity> tableEntities = tableRepository.findByRestaurantId(restaurantId);

        // Map List<TableEntity> to List<Table> using ModelMapper
        return tableEntities.stream()
                .map(tableEntity -> modelMapper.map(tableEntity, Table.class))
                .collect(Collectors.toList());
    }
    @Override
    public void deleteTableById(Long id) {
        if (!tableRepository.existsById(id)) {
            throw new RuntimeException("Table not found with id: " + id);
        }
        tableRepository.deleteById(id);
    }

}
