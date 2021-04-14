package com.tampro.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Results;
import com.tampro.entity.Schedule;
import com.tampro.exception.ApplicationException;
import com.tampro.request.ResultRequest;
import com.tampro.response.ResultResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.ResultService;
import com.tampro.service.ScheduleService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@CrossOrigin(Constant.CROSS_ORIGIN)
@RequestMapping(Constant.API_RESULTS)
public class ResultController {
	
	@Autowired
	ResultService resultService;
	@Autowired
	DoctorService doctorService;
	@Autowired
	PatientService patientService;
	@Autowired
	ScheduleService scheduleService;
	
	
	private static final Logger log = LoggerFactory.getLogger(ResultController.class);

	
	
	@PostMapping
	public ResponseEntity<Object> saveResult(@ModelAttribute ResultRequest request){
		try {
			Results results = resultService.findById(request.getId());
			if(results == null) {
				results = new Results();
			}
			results.setBloodPressure(request.getBloodPressure());
			results.setDiagnose(request.getDiagnose());
			if(request.getDoctorId() != 0) {
				results.setDoctor(doctorService.getOne(request.getDoctorId()));
			}
			if(request.getScheduleId() != 0) {
				results.setSchedule(scheduleService.getOne(request.getScheduleId()));
			}
			if(request.getPatientId() != 0) {
				results.setPatients(patientService.getOne(request.getDoctorId()));
			}
			results.setHeight(request.getHeight());
			results.setId(request.getId());
			if(request.getImageUpload() != null) {
				try {
					String imagesUrl = AppUtils.uploadFile(request.getImageUpload());
					results.setImageUrl(imagesUrl);
				} catch (IllegalStateException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			results.setNote(request.getNote());
			results.setReason(request.getReason());
			results.setReasonDescribe(request.getReasonDescribe());
			results.setWeight(request.getWeight());
			results  = resultService.save(results);
			Map<String, Object> data = new HashMap();
			data.put("code", "200");
			data.put("message", "Lưu thành công");
			return new ResponseEntity<Object>(data,HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Save Failed",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
	//	result/schedule/id
	@GetMapping 
	public ResponseEntity<Object> findResultByScheduleId(@RequestParam("schedule") long id){
		Schedule schedule = scheduleService.findById(id);
		if(schedule == null) {
			log.error("schedule not found exception with id :" +id);
			throw new ApplicationException("Không tìm thấy lịch" , HttpStatus.NOT_FOUND);
		}
		Results results = resultService.findBySchedule(schedule);
		if(results == null) {
			return new ResponseEntity<Object>(null,HttpStatus.OK);
		}
		ResultResponse response = AppUtils.convertResultEntityToResponse(results);
		return  new ResponseEntity<Object>(response,HttpStatus.OK);
	}
	
	
	
	
}
