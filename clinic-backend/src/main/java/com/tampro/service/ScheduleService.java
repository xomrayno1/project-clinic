package com.tampro.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tampro.entity.Schedule;
import com.tampro.model.BookingSearch;
import com.tampro.model.ScheduleSearch;

public interface ScheduleService {

	Page<Schedule> findAllSchedulePaginationFilter(ScheduleSearch scheduleSearch,Pageable pageable);
	
	Page<Schedule> findAllSchedulePaginationFilterAndPatientId(BookingSearch bookingSearch,Pageable pageable);
	
	List<Schedule> findByTime(Date dateTime);
	
	void cancel(Schedule schedule);

	void save(Schedule schedule);
	
	Schedule findById(long id);
	
	void delete(Schedule schedule);
}
