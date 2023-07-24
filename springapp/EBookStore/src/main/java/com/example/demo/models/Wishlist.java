package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Wishlist {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;

	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	@JoinColumn(name="wish_id")
	private List<EBook> books;
	
	public Wishlist() {
		books=new ArrayList<>();
	}
	
	public void addBook(EBook x) {
		books.add(x);
	}
	
	public void removeBook(EBook x) {
		books.remove(x);
	}
	public boolean containsBook(EBook x) {
		return books.contains(x);
	}
	
	public void setBooks(List<EBook> x) {
		this.books=x;
	}
}
