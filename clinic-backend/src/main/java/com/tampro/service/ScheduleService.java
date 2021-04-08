package com.tampro.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.model.ScheduleInterface;
import com.tampro.model.ScheduleSearch;

public interface ScheduleService {

	Page<ScheduleInterface> findAllSchedule(ScheduleSearch scheduleSearch,Pageable pageable);
	
}
