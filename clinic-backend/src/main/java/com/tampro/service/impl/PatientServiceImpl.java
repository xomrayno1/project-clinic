package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Patients;
import com.tampro.entity.Users;
import com.tampro.repository.PatientRepository;
import com.tampro.service.PatientService;
import com.tampro.utils.Constant;

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
		patients.setActiveFlag(Constant.NOT_ACTIVE);
		patientRepo.save(patients);
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

	@Override
	public void restore(Patients patients) {
		// TODO Auto-generated method stub
		patients.setActiveFlag(Constant.ACTIVE);
		patientRepo.save(patients);
	}

	@Override
	public Patients findByUsers(Users users) {
		// TODO Auto-generated method stub
		return patientRepo.findByUsers(users);
	}

	@Override
	public long countByActiveFlag(int activeFlag) {
		// TODO Auto-generated method stub
		return patientRepo.countByActiveFlag(activeFlag);
	}

}
