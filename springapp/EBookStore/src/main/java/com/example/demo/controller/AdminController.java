package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Cart;
import com.example.demo.models.EBook;
import com.example.demo.models.Order;
import com.example.demo.models.User;
import com.example.demo.repository.CartRepo;
import com.example.demo.repository.EBookRepo;
import com.example.demo.repository.OrderRepo;
import com.example.demo.repository.UserRepo;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
	@Autowired
	EBookRepo bookrepo;
	
	@Autowired
	UserRepo userrepo;
	
	@Autowired
	CartRepo cartrepo;
	
	@Autowired
	OrderRepo orderrepo;
	
	
	@GetMapping("/user")
	List<User> getAllUsers(){
		return userrepo.findAll();
	}
	
	@PostMapping("/book")
	EBook postBook(@RequestBody EBook x) {
		return bookrepo.save(x);
	}
	
	@DeleteMapping("/book/{id}")
	String deleteBook(@PathVariable int id) {
		bookrepo.deleteById(id);
		return "Deleted";
	}
	@PostMapping("/books")
	List<EBook> postBooks (@RequestBody List<EBook> x){
		return bookrepo.saveAll(x);
	}
	

	@GetMapping("/carts")
	List<Cart> getAllCarts(){
		return cartrepo.findAll();
	}
	@GetMapping("/orders")
	List<Order> getAllOrders(){
		return orderrepo.findAll();
	}
	
}
