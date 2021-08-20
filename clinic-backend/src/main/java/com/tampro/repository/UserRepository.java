package com.tampro.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Users;

@Repository
public interface UserRepository extends PagingAndSortingRepository<Users, Long>{

	Users getOne(Long id);
	
	
	@Query(value="SELECT DT FROM Users DT "
			+ " WHERE UPPER(DT.username) LIKE CONCAT('%',UPPER(?1),'%') "
			+ " OR UPPER(DT.email) LIKE CONCAT('%',UPPER(?1),'%') "
			,countQuery = "SELECT COUNT(DT) FROM Users DT   "
					+ " WHERE UPPER(DT.username) LIKE CONCAT('%',UPPER(?1),'%') "
					+ " OR UPPER(DT.email) LIKE CONCAT('%',UPPER(?1),'%') "
					)
	Page<Users> findAllSearch(String search, Pageable pageable); //
	
	Users findByEmail(String email);
	
	@Query("SELECT U FROM Users U WHERE U.username = ?1 and U.activeFlag = 1")
	Users findByUsername(String username);
}
