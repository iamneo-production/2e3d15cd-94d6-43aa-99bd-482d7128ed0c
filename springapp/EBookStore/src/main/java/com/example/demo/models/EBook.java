package com.example.demo.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class EBook {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String title;
	private String author;
	private LocalDate postedOn=LocalDate.now();
	private List<String> genre;
	private int purchases;
	private double rating;
	@Column(columnDefinition="LONGTEXT")
	private String synopsis;
	private double price;
	private String coverimage;
	private String preimage1;
	private String preimage2;
	private String preimage3;
	private String preimage4;

	
}
