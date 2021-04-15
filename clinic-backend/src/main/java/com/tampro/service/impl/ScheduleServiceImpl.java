package com.tampro.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tampro.entity.Schedule;
import com.tampro.model.search.ScheduleSearch;
import com.tampro.model.specification.ScheduleSpecification;
import com.tampro.repository.ScheduleRepository;
import com.tampro.request.UpdateStatusScheduleRequest;
import com.tampro.service.ScheduleService;
import com.tampro.utils.Constant;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	ScheduleRepository scheduleRepo;

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
	public List<Schedule> findByTime(Date dateTime) {
		// TODO Auto-generated method stub
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateTime);
		calendar.add(Calendar.HOUR,  1);
		Date dateTo = calendar.getTime();
		return scheduleRepo.findByTime(dateTime,dateTo);
	}

	@Override
	public void cancel(Schedule schedule) {
		// TODO Auto-generated method stub
		schedule.setStatus(Constant.CANCEL);
		scheduleRepo.save(schedule);
	}

	@Override
	public void save(Schedule schedule) {
		// TODO Auto-generated method stub
		schedule.setActiveFlag(Constant.ACTIVE);
		scheduleRepo.save(schedule);
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

}
