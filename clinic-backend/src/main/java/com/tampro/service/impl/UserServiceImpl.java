package com.tampro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tampro.entity.Doctor;
import com.tampro.entity.Patients;
import com.tampro.entity.Users;
import com.tampro.repository.UserRepository;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.UserService;
import com.tampro.utils.Constant;

@Service
public class UserServiceImpl  implements UserService{

	@Autowired
	UserRepository userRepo;
	@Autowired
	DoctorService doctorService;
	@Autowired
	PatientService patientService;
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	public Users getOne(Long id) {
		// TODO Auto-generated method stub
		return userRepo.getOne(id);
	}

	@Override
	public Users findById(long id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id).orElse(null);
	}

	@Override
	public void delete(Users users) {
		// TODO Auto-generated method stub
		Doctor doctor = doctorService.findByUsers(users)  ;
		Patients patient = patientService.findByUsers(users)  ;
		if(doctor != null || patient != null) {
			if(doctor != null) {
				doctorService.delete(doctor);
			}else {
				patientService.delete(patient);
			}
			users.setActiveFlag(Constant.NOT_ACTIVE);
			userRepo.save(users);
		}else {
			userRepo.delete(users);
		}
	}

	@Override
	public Users save(Users users) {
		// TODO Auto-generated method stub
		users.setPassword(bcryptEncoder.encode(users.getPassword()));
		return userRepo.save(users);
	}

	@Override
	public Page<Users> findAllSearchPagination(String search,Pageable pageable) {
		// TODO Auto-generated method stub
		return userRepo.findAllSearch(search, pageable);
	}

	 

	@Override
	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void restore(Users users) {
		// TODO Auto-generated method stub
		users.setActiveFlag(Constant.ACTIVE);
		userRepo.save(users);
	}

	@Override
	public boolean isExistEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email) != null ? true : false;
	}

	@Override
	public boolean isExistUsername(String username) {
		// TODO Auto-generated method stub
		return userRepo.findByUsername(username) != null ? true : false;
	}

}
