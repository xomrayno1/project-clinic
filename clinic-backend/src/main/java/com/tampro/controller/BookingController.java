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
import com.tampro.service.DoctorService;
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
			List<Schedule> list = 	scheduleService.findByTime(date.parse(bookingRequest.getTime()), bookingRequest.getDoctorId());
			if(!list.isEmpty()) {
				throw new ApplicationException("Lịch đã tồn tại", HttpStatus.BAD_REQUEST);
			}
			Schedule schedule = new Schedule();
			schedule.setTime(date.parse(bookingRequest.getTime()));
			schedule.setDoctor(doctorService.getOne(bookingRequest.getDoctorId()));
			schedule.setPatients(patients);
			schedule.setType(Constant.FIRST_EXAMINATION);
			schedule.setStatus(Constant.WAITING);
			schedule.setReason(bookingRequest.getReason());
			scheduleService.save(schedule);
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
			throw new ApplicationException("Schedule not found exception with id :"+id, HttpStatus.NOT_FOUND);
		}
		if(schedule.getStatus() !=  Constant.WAITING) {
			Map<String, Object> data = new HashMap<>();
			 
			data.put("message" ,"Lịch đã hoàn thành");	
			return new ResponseEntity<Object>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
//		if(schedule.getTime().before(new Date())) {
//			throw new ApplicationException("Lịch đã quá hạn", HttpStatus.BAD_REQUEST);
//		}
		scheduleService.cancel(schedule);
		Map<String,String> data = new HashMap<String, String>();
		data.put("message", "Cancel success");
		return new ResponseEntity<Object>(data,HttpStatus.OK);
	}
}
