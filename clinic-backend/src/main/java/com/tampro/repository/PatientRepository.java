package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Patients;

@Repository
public interface PatientRepository extends PagingAndSortingRepository<Patients, Long>{
	@Query(value="SELECT DT FROM Patients DT "
			+ " WHERE UPPER(DT.name) LIKE CONCAT('%',UPPER(?1),'%') "
		 
			,countQuery = "SELECT COUNT(DT) FROM Patients DT   "
					+ " WHERE UPPER(DT.name) LIKE CONCAT('%',UPPER(?1),'%') "
					)
	Page<Patients> findAll(String search, Pageable pageable); // 
	
	Patients getOne(Long id);

	Patients findByName(String name);
	
	Patients findByEmail(String email);
	 
}
