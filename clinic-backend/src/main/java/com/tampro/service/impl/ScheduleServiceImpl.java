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
import com.tampro.model.search.ScheduleSearch;
import com.tampro.model.specification.ScheduleSpecification;
import com.tampro.repository.ScheduleRepository;
import com.tampro.request.NotificationRequest;
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
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateTime);
		calendar.add(Calendar.HOUR,  1);
		Date dateTo = calendar.getTime();
		return scheduleRepo.findByTime(dateTime,dateTo,doctorId);
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
		schedule = scheduleRepo.save(schedule);
		// send notification
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append(" Bạn nhận được một lịch khám vào ngày : ")
						.append(sdf.format(schedule.getTime()))
						.append(". Từ ")
						.append(schedule.getPatients().getPatiName())
						.append("<br>")
						.append(" với nội dung : ")
						.append(schedule.getReason());
		
		NotificationRequest notificationRequest = new NotificationRequest();
		notificationRequest.setMessage(messageBuilder.toString());
		notificationRequest.setSeen(Constant.SEEN_FALSE);
		notificationRequest.setSender("Hệ thống");
		notificationRequest.setTitle("Đặt lịch khám");
		notificationRequest.setType(Constant.TYPE_BOOKING);
		notificationRequest.setUserId(schedule.getDoctor().getUsers().getId());
		notifiService.saveNotification(notificationRequest);
		
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
