package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.models.EBook;

@Repository
public interface EBookRepo extends JpaRepository<EBook,Integer>{

	@Query("SELECT b FROM EBook b ORDER BY b.postedOn LIMIT 7")
	public List<EBook> getNewArrivals();
	
	@Query("SELECT b FROM EBook b ORDER BY b.purchases LIMIT 7")
	public List<EBook> getBestSellers();
	
}
