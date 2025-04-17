package edu.icet.ecom.service;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.entity.CustomerEntity;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByContactNumber(String contactNumber);
    List<Customer> getAllCustomers();
    void deleteCustomer(Long id);
}
