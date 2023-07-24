package com.example.demo.vo;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private String review;
	private int rating;
	private int bookid;
	private int userid;
	private String creator;
	private String booktitle;
	private LocalDate postedOn;
}
