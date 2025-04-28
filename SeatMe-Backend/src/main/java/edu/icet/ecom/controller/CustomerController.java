package edu.icet.ecom.controller;

import edu.icet.ecom.dto.Customer;
import edu.icet.ecom.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/save-customer")
    public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.createCustomer(customer));
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/get-by-email/{email}")
    public ResponseEntity<Customer> getByEmail(@PathVariable String email) {
        return customerService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get-by-contact/{contactNumber}")
    public ResponseEntity<Customer> getByContactNumber(@PathVariable String contactNumber) {
        return customerService.findByContactNumber(contactNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer loginRequest) {
        return customerService.findByEmail(loginRequest.getEmail())
                .map(customer -> {
                    if (customer.getContactNumber().equals(loginRequest.getContactNumber())) {
                        return ResponseEntity.ok(customer); // Login success
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Invalid email or contact number");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or contact number"));
    }

}


