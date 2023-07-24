package com.example.demo.models;

import java.util.LinkedList;
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
public class Cart {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private double total;
	
	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinColumn(name="cart_id")
	private List<EBook> books;
	
	public void calcTotal() {
		double t=0;
		for(EBook i:this.books) {
			t+=i.getPrice();
		}
		t=Math.round(t*100.0)/100.0;
		this.total=t;
	}
	public Cart() {
		books=new LinkedList<>();
	}
	
	public boolean containsBook(EBook x) {
		return books.contains(x);
	}
	
	public void addBook(EBook x) {
		books.add(x);
	}
	
	public void setBooks(List<EBook> b) {
		this.books=b;
	}
	
	public void removeBook(EBook x) {
		books.remove(x);
	}
	
}
