package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction,Integer>{

}
