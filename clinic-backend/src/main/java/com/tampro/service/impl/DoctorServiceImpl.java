package com.tampro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Doctor;
import com.tampro.repository.DoctorRepository;
import com.tampro.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService{
	@Autowired
	DoctorRepository doctorRepo;

	@Override
	public Doctor findById(long id) {
		// TODO Auto-generated method stub
		return doctorRepo.findById(id).orElse(null);
	}
 
	@Override
	public Doctor save(Doctor doctor) {
		// TODO Auto-generated method stub
		return doctorRepo.save(doctor);
	}
 
	@Override
	public void delete(Doctor doctor) {
		// TODO Auto-generated method stub
		doctorRepo.delete(doctor);
	}

	@Override
	public Page<Doctor> findAllSearchPagination(String search, Pageable pageable) {
		// TODO Auto-generated method stub
		return doctorRepo.findAll(search, pageable);
	}

	@Override
	public Doctor getOne(Long id) {
		// TODO Auto-generated method stub
		return doctorRepo.getOne(id);
	}

	@Override
	public boolean isExist(String email) {
		// TODO Auto-generated method stub
		return doctorRepo.findByEmail(email) != null ? true : false;
	}

	@Override
	public List<Doctor> findAll() {
		// TODO Auto-generated method stub
		return doctorRepo.findAll();
	}
	

	 

}
