package com.tampro.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.entity.Patients;

public interface PatientService {
	Patients findById(long id);
	 
	void delete(Patients patients);
	
	void restore(Patients patients);
	
	Patients save(Patients patients);
	
	Page<Patients> findAllSearchPagination(String search, Pageable pageable);
	
	Patients getOne(Long id);
	
	boolean isExist(String email);
}
