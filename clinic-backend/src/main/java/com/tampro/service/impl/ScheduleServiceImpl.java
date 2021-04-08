package com.tampro.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.model.ScheduleInterface;
import com.tampro.model.ScheduleSearch;
import com.tampro.repository.ScheduleRepository;
import com.tampro.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	ScheduleRepository scheduleRepo;

	@Override
	public Page<ScheduleInterface> findAllSchedule(ScheduleSearch scheduleSearch, Pageable pageable) {
		// TODO Auto-generated method stub
		if(!scheduleSearch.getKeySearch().trim().isEmpty() && scheduleSearch.getDateFrom().trim().isEmpty() && scheduleSearch.getDateTo().trim().isEmpty()) {
			return scheduleRepo.findAllScheduleSearchName(scheduleSearch.getKeySearch(), pageable);			
		}else if(scheduleSearch.getKeySearch().trim().isEmpty() && !scheduleSearch.getDateFrom().trim().isEmpty() && !scheduleSearch.getDateTo().trim().isEmpty()){
			return scheduleRepo.findAllScheduleDate(scheduleSearch.getDateTo(), scheduleSearch.getDateFrom(), pageable);
		}
		return scheduleRepo.findAllSchedule(scheduleSearch.getKeySearch(), scheduleSearch.getDateTo(), scheduleSearch.getDateFrom(), pageable);
	}

}
