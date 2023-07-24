package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Review;
import com.example.demo.model.ReviewRequest;
import com.example.demo.repository.ReviewRepo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ApiController {
	private final  ReviewRepo repo;
	@GetMapping("/bookreviews/{id}")
	public List<Review> getBookReviews(@PathVariable int id){
		return repo.findByBookid(id);
	}
	
	@GetMapping("/userreviews/{id}")
	public List<Review> getUserReviews(@PathVariable int id){
		return repo.findByUserid(id);
	}
	
	@PostMapping("/postreview")
	public Review postReview(@RequestBody ReviewRequest reviewreq) {
		Review review=Review.builder().bookid(reviewreq.getBookid())
		.userid(reviewreq.getUserid())
		.booktitle(reviewreq.getBooktitle())
		.creator(reviewreq.getCreator())
		.review(reviewreq.getReview())
		.rating(reviewreq.getRating())
		.postedOn(LocalDate.now()).build();
		return repo.save(review);
	}
}
