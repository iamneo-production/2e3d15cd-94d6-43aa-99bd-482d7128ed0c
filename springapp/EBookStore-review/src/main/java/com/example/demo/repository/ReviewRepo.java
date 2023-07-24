package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Integer> {
	
	public List<Review> findByBookid(int id);
	public List<Review> findByUserid(int id);
}
