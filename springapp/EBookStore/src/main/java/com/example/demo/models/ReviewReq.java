package com.example.demo.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewReq {
	private int userid;
	private int bookid;
	private String review;
	private int rating;
	private String creator;
	private String booktitle;
}
