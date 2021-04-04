package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Doctor;

@Repository
public interface DoctorRepository extends PagingAndSortingRepository<Doctor, Long> {
	
	@Query(value="SELECT DT FROM Doctor DT "
			+ " WHERE UPPER(DT.name) LIKE CONCAT('%',UPPER(?1),'%') "
		 
			,countQuery = "SELECT DT FROM Doctor DT  ")
	Page<Doctor> findAll(String search, Pageable pageable); // 
	
	Doctor getOne(Long id);

	Doctor findByName(String name);
	
	Doctor findByEmail(String email);
	
	
}
