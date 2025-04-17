package edu.icet.ecom.service.impl;

import edu.icet.ecom.entity.CustomerEntity;
import edu.icet.ecom.repository.CustomerRepository;
import edu.icet.ecom.service.CustomerService;
import edu.icet.ecom.dto.Customer;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    // Create a new customer and return the DTO
    @Override
    public Customer createCustomer(Customer customerDTO) {
        CustomerEntity customerEntity = modelMapper.map(customerDTO, CustomerEntity.class);
        CustomerEntity savedCustomer = customerRepository.save(customerEntity);
        return modelMapper.map(savedCustomer, Customer.class);
    }

    // Find customer by email and return DTO
    @Override
    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email)
                .map(customerEntity -> modelMapper.map(customerEntity, Customer.class));
    }

    // Find customer by contact number and return DTO
    @Override
    public Optional<Customer> findByContactNumber(String contactNumber) {
        return customerRepository.findByContactNumber(contactNumber)
                .map(customerEntity -> modelMapper.map(customerEntity, Customer.class));
    }

    // Get all customers and return a list of DTOs
    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerEntity -> modelMapper.map(customerEntity, Customer.class))
                .collect(Collectors.toList());
    }

    // Delete customer by ID
    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
