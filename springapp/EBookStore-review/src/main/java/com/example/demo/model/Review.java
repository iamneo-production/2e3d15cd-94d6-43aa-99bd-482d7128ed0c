package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private String review;
	private int rating;
	private int bookid;
	private int userid;
	private String creator;
	private String booktitle;
	private LocalDate postedOn;
}
