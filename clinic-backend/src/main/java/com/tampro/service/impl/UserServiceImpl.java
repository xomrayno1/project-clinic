package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
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

}
