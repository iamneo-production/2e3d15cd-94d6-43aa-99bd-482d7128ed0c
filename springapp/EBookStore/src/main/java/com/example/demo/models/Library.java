package com.example.demo.models;

import java.util.LinkedList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Library {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<EBook> books;
	
	public Library() {
		books=new LinkedList<>();
	}
	public void addBook(EBook x) {
		books.add(x);
	}
	public void setBooks(List<EBook> x) {
		this.books=x;
	}
}
