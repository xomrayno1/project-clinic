package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Patients;

@Repository
public interface PatientRepository extends PagingAndSortingRepository<Patients, Long>{
	@Query(value="SELECT PT FROM Patients PT "
			+ " WHERE UPPER(PT.name) LIKE CONCAT('%',UPPER(?1),'%') "
			 
			,countQuery = "SELECT PT FROM Patients PT  ")
	Page<Patients> findAll(String search, Pageable pageable); // 

	 
}
