package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.EBook;
import com.example.demo.repository.EBookRepo;

@RestController
@RequestMapping("/open")
@CrossOrigin(origins="http://localhost:3000")
public class OpenController {
	@Autowired
	EBookRepo bookrepo;
	
	@GetMapping("/book")
	List<EBook> getAllBooks(){
		return bookrepo.findAll();
	}
	
	@GetMapping("/newarrivals")
	List<EBook> getNewBooks(){
		return bookrepo.getNewArrivals();
	}
	
	@GetMapping("/bestsellers")
	List<EBook> getBestBooks(){
		return bookrepo.getBestSellers();
	}
	
	@GetMapping("/bookbyid/{id}")
	EBook getBookById(@PathVariable int id) {
		return bookrepo.findById(id).get();
	}
}
