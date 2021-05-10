package com.tampro.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Patients;
import com.tampro.entity.Schedule;
import com.tampro.entity.Users;
import com.tampro.exception.ApplicationException;
import com.tampro.request.BookingRequest;
import com.tampro.request.NotificationRequest;
import com.tampro.service.DoctorService;
import com.tampro.service.NotificationService;
import com.tampro.service.PatientService;
import com.tampro.service.ScheduleService;
import com.tampro.service.UserService;
import com.tampro.utils.ApiStatus;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_BOOKING)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class BookingController {
 
	@Autowired
	DoctorService doctorService;
	@Autowired
	PatientService patientService;
	@Autowired
	ScheduleService scheduleService;
	@Autowired
	UserService userService;
	@Autowired
	NotificationService notifiService;
	
	SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	
	private static final Logger log = LoggerFactory.getLogger(BookingController.class);

 
	@PostMapping
	public ResponseEntity<Object> bookingSchedule(@RequestBody BookingRequest bookingRequest){
		//check 
		Users users =  userService.findById(bookingRequest.getUserId());
		if(users == null) {
			log.warn("users not found exception with id "+bookingRequest.getUserId());
			throw new ApplicationException("users not found exception with id "+bookingRequest.getId(), HttpStatus.NOT_FOUND);
		}
		Patients patients =	patientService.findByUsers(users);
		if(patients == null) {
			Map<String, Object> data = new HashMap<>();
			data.put("code" ,ApiStatus.UNREGISTED_INFO.getCode());
			data.put("message" ,ApiStatus.UNREGISTED_INFO.getMessage());		
			return new ResponseEntity<Object>(data,HttpStatus.NOT_FOUND);
		}
		try {
			if(date.parse(bookingRequest.getTime()).before(new Date())) {
				throw new ApplicationException("Ngày đặt đã qua, Vui lòng chọn ngày khác", HttpStatus.BAD_REQUEST);
			}
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try {
//			List<Schedule> list = 	scheduleService.findByTimeAndStatus(date.parse(bookingRequest.getTime()),Constant.WAITING, bookingRequest.getDoctorId());
//			if(!list.isEmpty()) {
//				throw new ApplicationException("Lịch đã tồn tại", HttpStatus.BAD_REQUEST);
//			}
			int countSche = scheduleService.countByTimeAndStatus(date.parse(bookingRequest.getTime()),Constant.WAITING, bookingRequest.getDoctorId());
			if(countSche == Constant.MAX_BOONGKING) {
				throw new ApplicationException("Giờ đã đầy", HttpStatus.BAD_REQUEST);
			}
			Schedule schedule = new Schedule();
			schedule.setTime(date.parse(bookingRequest.getTime()));
			schedule.setDoctor(doctorService.getOne(bookingRequest.getDoctorId()));
			schedule.setPatients(patients);
			schedule.setType(Constant.FIRST_EXAMINATION);
			schedule.setStatus(Constant.WAITING);
			schedule.setReason(bookingRequest.getReason());
			schedule = scheduleService.save(schedule);
			
			 

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			// send notification
			StringBuilder messageBuilder = new StringBuilder();
			messageBuilder.append(" Bạn nhận được một lịch khám vào ngày : ")
							.append(sdf.format(schedule.getTime()))
							.append(". Từ bệnh nhân: ")
							.append(schedule.getPatients().getPatiName());
			
			NotificationRequest notificationRequest = new NotificationRequest();
			notificationRequest.setMessage(messageBuilder.toString());
			notificationRequest.setSeen(Constant.SEEN_FALSE);
			notificationRequest.setSender("Hệ thống");
			notificationRequest.setTitle("Đặt lịch khám");
		 
			notificationRequest.setUserId(schedule.getDoctor().getUsers().getId());
			notifiService.saveNotification(notificationRequest);
			
			Map<String,String> data = new HashMap<String, String>();
			data.put("message", "Đặt thành công");
			return new ResponseEntity<Object>(data,HttpStatus.OK);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new ApplicationException("Đặt thất bại", HttpStatus.BAD_REQUEST);
		}
	}
	 
	@DeleteMapping("/cancel/{id}")
	public ResponseEntity<Object> cancelBooking(@PathVariable("id") int id){
		Schedule schedule =	scheduleService.findById(id);
		if(schedule == null) {
			throw new ApplicationException("Không tìm lấy lịch với id :"+id, HttpStatus.NOT_FOUND);
		}
		
		if(schedule.getStatus() !=  Constant.WAITING) {
			Map<String, Object> data = new HashMap<>();
			 
			data.put("message" ,"Lịch đã hoàn thành");	
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(schedule.getTime().before(new Date())) {
			throw new ApplicationException("Lịch đã quá hạn", HttpStatus.BAD_REQUEST);
		} // chưa test
		
		// nếu hôm nay khám mà hôm nay huỷ thì => false
		if(schedule.getTime().equals(new Date())) {
			throw new ApplicationException("Bạn không thể huỷ lịch khám trong ngày", HttpStatus.BAD_REQUEST);
		} // chưa test
		
		scheduleService.cancel(schedule);
		
		Map<String,String> data = new HashMap<String, String>();
		data.put("message", "Huỷ thành công");
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		// send notification
		StringBuilder messageBuilder = new StringBuilder();
		messageBuilder.append(" Lịch khám của bạn đã bị huỷ : ")
						.append(". Từ bệnh nhân : ")
						.append(schedule.getPatients().getPatiName());
		
		NotificationRequest notificationRequest = new NotificationRequest();
		notificationRequest.setMessage(messageBuilder.toString());
		notificationRequest.setSeen(Constant.SEEN_FALSE);
		notificationRequest.setSender("Hệ thống");
		notificationRequest.setTitle("Huỷ lịch khám");
	 
		notificationRequest.setUserId(schedule.getDoctor().getUsers().getId());
		notifiService.saveNotification(notificationRequest);
		
		
		return new ResponseEntity<Object>(data,HttpStatus.OK);
	}
}
