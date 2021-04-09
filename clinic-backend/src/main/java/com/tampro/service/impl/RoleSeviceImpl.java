package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tampro.entity.Roles;
import com.tampro.repository.RoleRepository;
import com.tampro.service.RoleSevice;

@Service
public class RoleSeviceImpl implements RoleSevice {
	@Autowired
	RoleRepository roleRepo;

	@Override
	public Roles findById(long id) {
		// TODO Auto-generated method stub
		return roleRepo.findById(id).orElse(null);
	}

}
