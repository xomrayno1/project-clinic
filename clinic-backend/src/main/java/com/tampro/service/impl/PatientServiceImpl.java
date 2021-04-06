package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Patients;
import com.tampro.repository.PatientRepository;
import com.tampro.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService{
	@Autowired
	PatientRepository patientRepo;

	@Override
	public Patients findById(long id) {
		// TODO Auto-generated method stub
		return patientRepo.findById(id).orElse(null);
	}

	@Override
	public void delete(Patients patients) {
		// TODO Auto-generated method stub
		patientRepo.delete(patients);
	}

	@Override
	public Patients save(Patients patients) {
		// TODO Auto-generated method stub
		return patientRepo.save(patients);
	}

	@Override
	public Page<Patients> findAllSearchPagination(String search, Pageable pageable) {
		// TODO Auto-generated method stub
		return patientRepo.findAll(search, pageable);
	}

	@Override
	public Patients getOne(Long id) {
		// TODO Auto-generated method stub
		return patientRepo.getOne(id);
	}

	@Override
	public boolean isExist(String email) {
		// TODO Auto-generated method stub
		return patientRepo.findByEmail(email) != null ? true : false;
	}

}
