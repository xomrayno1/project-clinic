package com.tampro.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Schedule;
import com.tampro.model.StatisticalSchedule;
import com.tampro.model.search.ScheduleSearch;
import com.tampro.model.specification.ScheduleSpecification;
import com.tampro.repository.ScheduleRepository;
import com.tampro.request.UpdateStatusScheduleRequest;
import com.tampro.service.NotificationService;
import com.tampro.service.ScheduleService;
import com.tampro.utils.Constant;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	ScheduleRepository scheduleRepo;
	@Autowired
	NotificationService notifiService;

	SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
	
	@Override
	public Page<Schedule> findAllSchedulePaginationFilter(ScheduleSearch scheduleSearch, Pageable pageable) {
		// TODO Auto-generated method stub
		return  scheduleRepo.findAll(
				 new ScheduleSpecification(
						 	scheduleSearch.getKeySearch(),					 	 
						 	scheduleSearch.getDateFrom(),
						 	scheduleSearch.getDateTo(),
						 	scheduleSearch.getType(),
						 	scheduleSearch.getStatus(),
						 	scheduleSearch.getKey(),
						 	scheduleSearch.getKeyId()
						 ),	pageable
				 );
	}

	@Override
	public List<Schedule> findByTime(Date dateTime,long doctorId) {
		// TODO Auto-generated method stub
		Date dateTo = addHour(dateTime, 1);
		return scheduleRepo.findByTime(dateTime,dateTo,doctorId);
	}

	@Override
	public void cancel(Schedule schedule) {
		// TODO Auto-generated method stub
		schedule.setStatus(Constant.CANCEL);
		scheduleRepo.save(schedule);
	}

	@Override
	public Schedule save(Schedule schedule) {
		// TODO Auto-generated method stub
		schedule.setActiveFlag(Constant.ACTIVE);
		return   scheduleRepo.save(schedule);
		 
	}
	 
	@Override
	public Schedule findById(long id) {
		// TODO Auto-generated method stub
		return scheduleRepo.findById(id).orElse(null);
	}

 
	@Override
	public void delete(Schedule schedule) {
		// TODO Auto-generated method stub
		if(schedule.getStatus() == Constant.COMPLETE) {
			schedule.setActiveFlag(Constant.NOT_ACTIVE);
			scheduleRepo.save(schedule);
		}else {
			scheduleRepo.delete(schedule);
		}		 
	}

	@Override
	public Schedule getOne(long id) {
		// TODO Auto-generated method stub
		return scheduleRepo.getOne(id);
	}

	@Override
	public Schedule updateStatusSchedule(UpdateStatusScheduleRequest updateStatusScheduleRequest) {
		// TODO Auto-generated method stub
		return scheduleRepo.updateStatusSchedule(updateStatusScheduleRequest.getStatus(), updateStatusScheduleRequest.getScheduleId());
	}

	@Override
	public long countByActiveFlagAndStatusAndTime(int activeFlag, int status, int month) {
		// TODO Auto-generated method stub
		return scheduleRepo.countByActiveFlagAndStatusAndTime(activeFlag, status, month);
	}

	@Override
	public List<Schedule> findByTimeAndStatus(Date dateTime, int status, long doctorId) {
		// TODO Auto-generated method stub
		Date dateTo = addHour(dateTime, 1);
		return scheduleRepo.findByTimeAndStatus(dateTime,dateTo,status,doctorId);
	}

	@Override
	public int countByTimeAndStatus(Date dateTime, int status, long doctorId) {
		// TODO Auto-generated method stub
		Date dateTo = addHour(dateTime, 1);
		return scheduleRepo.countByTimeAndStatus(dateTime, dateTo, status, doctorId);
	}
	
	public Date addHour(Date dateTime, int countHour) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateTime);
		calendar.add(Calendar.HOUR,  countHour);
		Date dateTo = calendar.getTime();
		return dateTo;
	}

	@Override
	public List<StatisticalSchedule> statisticalScheduleByYear(int year) {
		// TODO Auto-generated method stub
		return scheduleRepo.statisticalScheduleByYear(year);
	}

}