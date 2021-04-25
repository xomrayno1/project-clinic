package com.tampro.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.entity.Schedule;
import com.tampro.model.search.ScheduleSearch;
import com.tampro.request.UpdateStatusScheduleRequest;

public interface ScheduleService {

	Page<Schedule> findAllSchedulePaginationFilter(ScheduleSearch scheduleSearch,Pageable pageable);

	List<Schedule> findByTime(Date dateTime, long doctorId);
	
	void cancel(Schedule schedule);

	Schedule save(Schedule schedule);
	
	Schedule findById(long id);
	
	void delete(Schedule schedule);
	
	Schedule getOne(long id);
	
	Schedule updateStatusSchedule(UpdateStatusScheduleRequest	updateStatusScheduleRequest);
	
	long countByActiveFlagAndStatusAndTime(int activeFlag, int status, int month);
	
	
}
