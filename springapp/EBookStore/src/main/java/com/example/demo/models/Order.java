package com.example.demo.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private LocalDateTime orderDate;
	private double total;
	
	@OneToOne
	private Transaction transaction;
	
	@ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<EBook> books;
	
	
}
