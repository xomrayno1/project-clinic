package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Results;
import com.tampro.entity.Schedule;
import com.tampro.model.search.ResultSearch;
import com.tampro.model.specification.ResultSpecification;
import com.tampro.repository.ResultRepository;
import com.tampro.service.ResultService;
import com.tampro.utils.Constant;

@Service
public class ResultServiceImpl implements ResultService{

	@Autowired
	ResultRepository resultRepo;
	
	@Override
	public Page<Results> findAllSchedulePaginationFilter(ResultSearch resultSearch, Pageable pageable) {
		// TODO Auto-generated method stub
		return resultRepo.findAll(new ResultSpecification(
				resultSearch.getSearchKey(), 
				resultSearch.getDateFrom(), 
				resultSearch.getDateTo(),
				resultSearch.getUserId()
				),pageable);
	}

	@Override
	public void delete(Results results) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Results save(Results results) {
		// TODO Auto-generated method stub
		results.setActiveFlag(Constant.ACTIVE);
		return resultRepo.save(results);
	}

	@Override
	public Results findById(long id) {
		// TODO Auto-generated method stub
		return resultRepo.findById(id).orElse(null);
	}

	@Override
	public Results getOne(long id) {
		// TODO Auto-generated method stub
		return resultRepo.getOne(id);
	}

	@Override
	public Results findBySchedule(Schedule schedule) {
		// TODO Auto-generated method stub
		return resultRepo.findBySchedule(schedule);
	}

}
