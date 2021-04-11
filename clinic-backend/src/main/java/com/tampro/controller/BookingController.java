package com.tampro.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Schedule;
import com.tampro.exception.ApplicationException;
import com.tampro.model.BookingSearch;
import com.tampro.model.BookingSearchPagination;
import com.tampro.model.Pagination;
import com.tampro.model.ScheduleSearch;
import com.tampro.model.ScheduleSearchPagination;
import com.tampro.request.BookingRequest;
import com.tampro.response.APIResponse;
import com.tampro.response.ScheduleResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.ScheduleService;
import com.tampro.utils.AppUtils;
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
	
	SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	
	//lấy ra lịch của từng user doctor - patient
	@PostMapping(value = Constant.API_GET_BOOKING_FILTER_PAGINATION)
	public ResponseEntity<APIResponse> findAllSearchFilterPagination(@RequestBody BookingSearchPagination bsg ){
 
		Pageable pageable =	PageRequest.of(bsg.getPage() - 1, bsg.getLimit());
		Page<Schedule> pageData = scheduleService.findAllSchedulePaginationFilterAndPatientId(
				new BookingSearch(bsg.getKeySearch(),bsg.getDateFrom()  ,bsg.getDateTo()  , bsg.getStatus(),bsg.getPatientId())
				, pageable);
		List<ScheduleResponse> data = new ArrayList<ScheduleResponse>();
		for(Schedule schedule  : pageData.getContent()) {
			ScheduleResponse response = AppUtils.convertScheduleEntityToResponse(schedule);
			data.add(response);
		}
		APIResponse apiResponse = new APIResponse(
					data, 
					new Pagination(pageData.getTotalElements(),bsg.getLimit(), bsg.getPage())
			);
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}
 
	@PostMapping
	public ResponseEntity<Object> bookingSchedule(@RequestBody BookingRequest bookingRequest){
		//check 
		try {
			List<Schedule> list = 	scheduleService.findByTime(date.parse(bookingRequest.getTime()));
			if(!list.isEmpty()) {
				throw new ApplicationException("Schedule is exists", HttpStatus.BAD_REQUEST);
			}
			Schedule schedule = new Schedule();
			schedule.setTime(date.parse(bookingRequest.getTime()));
			schedule.setDoctor(doctorService.getOne(bookingRequest.getDoctorId()));
			schedule.setPatients(patientService.getOne(bookingRequest.getPatientId()));
			schedule.setType(Constant.FIRST_EXAMINATION);
			schedule.setStatus(Constant.WAITING);
			schedule.setReason(bookingRequest.getReason());
			Map<String,String> data = new HashMap<String, String>();
			data.put("data", "Booking success");
			return new ResponseEntity<Object>(data,HttpStatus.OK);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new ApplicationException("Booking failed", HttpStatus.BAD_REQUEST);
		}
	}
	 
	@DeleteMapping("/cancel/{id}")
	public ResponseEntity<Object> cancelBooking(@PathVariable("id") int id){
		Schedule schedule =	scheduleService.findById(id);
		if(schedule == null) {
			throw new ApplicationException("Schedule not found exception with id :"+id, HttpStatus.NOT_FOUND);
		}
//		if(schedule.getTime().before(new Date())) {
//			throw new ApplicationException("Cancel failed", HttpStatus.BAD_REQUEST);
//		}
		scheduleService.cancel(schedule);
		Map<String,String> data = new HashMap<String, String>();
		data.put("data", "Cancel success");
		return new ResponseEntity<Object>(data,HttpStatus.OK);
	}
}
