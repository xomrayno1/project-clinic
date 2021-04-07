package com.tampro.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.entity.Doctor;
 

public interface DoctorService {
	Doctor findById(long id);
	void restore(Doctor doctor);
	 
	void delete(Doctor doctor);
	
	Doctor save(Doctor doctor);
	
	Page<Doctor> findAllSearchPagination(String search, Pageable pageable);
	
	Doctor getOne(Long id);
	
	boolean isExist(String email);
	
	List<Doctor> findAll(String search);
	
}
