package com.tampro.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Users;
import com.tampro.repository.UserRepository;
import com.tampro.service.UserService;

@Service
public class UserServiceImpl  implements UserService{

	@Autowired
	UserRepository userRepo;
	
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
		userRepo.delete(users);
	}

	@Override
	public Users save(Users users) {
		// TODO Auto-generated method stub
		return userRepo.save(users);
	}

	@Override
	public Page<Users> findAllSearchPagination(String search, Pageable pageable) {
		// TODO Auto-generated method stub
		return userRepo.findAllSearch(search, pageable);
	}

	@Override
	public boolean isExist(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email) != null ? true : false;
	}

	@Override
	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
