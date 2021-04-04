package com.tampro.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Users;

@Repository
public interface UserRepository extends PagingAndSortingRepository<Users, Long>{

	Users getOne(Long id);
}
