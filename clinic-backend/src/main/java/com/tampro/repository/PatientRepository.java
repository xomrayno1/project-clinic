package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Patients;
import com.tampro.entity.Users;

@Repository
public interface PatientRepository extends PagingAndSortingRepository<Patients, Long>{
	@Query(value="SELECT DT FROM Patients DT "
			+ " WHERE UPPER(DT.patiName) LIKE CONCAT('%',UPPER(?1),'%') "
			+ " OR UPPER(DT.email) LIKE CONCAT('%',UPPER(?1),'%') "
			+ " OR UPPER(DT.users.username) LIKE CONCAT('%',UPPER(?1),'%') "
			+ " ORDER BY DT.activeFlag Asc"
			,countQuery = "SELECT COUNT(DT) FROM Patients DT   "
					+ " WHERE UPPER(DT.patiName) LIKE CONCAT('%',UPPER(?1),'%') "
					+ " OR UPPER(DT.email) LIKE CONCAT('%',UPPER(?1),'%') "
					+ " OR UPPER(DT.users.username) LIKE CONCAT('%',UPPER(?1),'%') "
			)
	Page<Patients> findAll(String search, Pageable pageable); // 
	
	Patients getOne(Long id);

	Patients findByPatiName(String name);
	
	Patients findByEmail(String email);
	
	Patients findByUsers(Users users);
	 
	long countByActiveFlag(int activeFlag);
}
