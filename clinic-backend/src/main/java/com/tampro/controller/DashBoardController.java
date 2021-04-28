package com.tampro.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.response.StatisticalResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.ScheduleService;
import com.tampro.utils.Constant;

@RestController
@CrossOrigin(Constant.CROSS_ORIGIN)
@RequestMapping(Constant.API_DASHBOARD)
public class DashBoardController {
	
	@Autowired
	private PatientService patientService;
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private ScheduleService scheduleService;
	
	@GetMapping("/statistical")
	public ResponseEntity<StatisticalResponse> statis(){
 
		int month = LocalDateTime.now().getMonthValue();
		long countPatient = patientService.countByActiveFlag(Constant.ACTIVE);
		long doctorPatient = doctorService.countByActiveFlag(Constant.ACTIVE);
		long scheduleWaiting = scheduleService.countByActiveFlagAndStatusAndTime(Constant.ACTIVE, Constant.WAITING, month);
		long scheduleSuccess = scheduleService.countByActiveFlagAndStatusAndTime(Constant.ACTIVE, Constant.COMPLETE, month);
				
		StatisticalResponse statisticalResponse = new StatisticalResponse(doctorPatient, countPatient, scheduleWaiting, scheduleSuccess);
		return new ResponseEntity<StatisticalResponse>(statisticalResponse,HttpStatus.OK);
	}

}
