package com.tampro.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tampro.entity.Roles;
@Repository
public interface RoleRepository extends CrudRepository<Roles, Long>{

	 
}
