package com.tampro.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.entity.Results;
import com.tampro.entity.Schedule;
import com.tampro.model.search.ResultSearch;

public interface ResultService {
	
	Page<Results> findAllSchedulePaginationFilter(ResultSearch resultSearch, Pageable pageable);

	void delete(Results results);

	Results save(Results results);
	
	Results findById(long id);
	
	Results getOne(long id);
	
	Results findBySchedule(Schedule schedule);
}
