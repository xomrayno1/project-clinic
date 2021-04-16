package com.tampro.controller;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tampro.entity.Patients;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Gender;
import com.tampro.model.Pagination;
import com.tampro.request.PatientRequest;
import com.tampro.response.APIResponse;
import com.tampro.response.PatientResponse;
import com.tampro.service.PatientService;
import com.tampro.service.UserService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_PATIENT)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class PatientController {
	
	@Autowired
	PatientService patientService;
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<APIResponse> getAllSearchPagination(
			@RequestParam("search") String search, 
			@RequestParam("limit") int limit,
			@RequestParam("page") int page){
		
		Pageable pageable =	PageRequest.of(page - 1, limit);
		//get value
		Page<Patients> patients = patientService.findAllSearchPagination(search, pageable);
		//convert entity to response
		List<PatientResponse> data = new ArrayList<PatientResponse>();
		for(Patients patient : patients.getContent()) {
			PatientResponse patientResponse = AppUtils.convertPatientEntityToResponse(patient);
			data.add(patientResponse);
		}
		//create api response
		APIResponse apiResponse = new APIResponse(data,
									new Pagination(patients.getTotalElements(), limit, page));
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<PatientResponse> createPatient(
			@ModelAttribute @Valid PatientRequest patientRequest){
		boolean isExist = patientService.isExist(patientRequest.getEmail());	
		if(isExist) {
			throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
		}
		//convert request to entity
		Patients patient = new Patients();
		patient.setDescription(patientRequest.getDescription());	 
		patient.setEmail(patientRequest.getEmail());
		patient.setGender(patientRequest.getGender().equals(Gender.FEMALE.getGenderName()) ? Gender.FEMALE : Gender.MALE );
		patient.setPatiName(patientRequest.getName());
		patient.setPhone(patientRequest.getPhone());
		patient.setAddress(patientRequest.getAddress());
		patient.setActiveFlag(Constant.ACTIVE);
		patient.setUsers(userService.getOne(patientRequest.getUserId()));
		if(patientRequest.getImageUpload() != null) {
			try {
				String image = AppUtils.uploadFile(patientRequest.getImageUpload());
				patient.setImageUrl("upload/"+image);
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		// save to database
		patient = patientService.save(patient);  
		//convert entity to doctorResponse
		PatientResponse patientResponse =  AppUtils.convertPatientEntityToResponse(patient);
		//get Uri
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
											.buildAndExpand(patientResponse.getId()) 
											.toUri();
		return ResponseEntity.created(uri).body(patientResponse);
	}
	@PutMapping
	public ResponseEntity<PatientResponse> updatePatient(
			@ModelAttribute @Valid PatientRequest patientRequest){
		
		Patients patient = patientService.findById(patientRequest.getId());
		if(patient == null) {
			throw new ApplicationException("Patient not found exception with id: "+patientRequest.getId(), HttpStatus.NOT_FOUND);
		}
//		
		boolean isExist = patientService.isExist(patientRequest.getEmail());
		if(isExist) {
			if(!patient.getEmail().equals(patientRequest.getEmail())) {
				throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
			}
		}
		 
		//convert request to entity
		 
		patient.setDescription(patientRequest.getDescription());
		patient.setEmail(patientRequest.getEmail());
		patient.setGender(patientRequest.getGender().equals(Gender.FEMALE.getGenderName()) ? Gender.FEMALE : Gender.MALE );
		patient.setPatiName(patientRequest.getName());
		patient.setPhone(patientRequest.getPhone());
		patient.setAddress(patientRequest.getAddress());
		patient.setUsers(userService.getOne(patientRequest.getUserId()));
		if(patientRequest.getImageUpload() != null) {
			try {
				String image = AppUtils.uploadFile(patientRequest.getImageUpload());
				patient.setImageUrl("upload/"+image);
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		 
	 
		// save to database
		patient = patientService.save(patient);  
		//convert entity to doctorResponse
		PatientResponse patientResponse =  AppUtils.convertPatientEntityToResponse(patient);
		//get Uri
		return new ResponseEntity<PatientResponse>(patientResponse,  HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletePatient(@PathVariable("id") Long id){
		Patients patient = patientService.findById(id);
		if(patient == null) {
			throw new ApplicationException("Patient not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		patientService.delete(patient);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	@GetMapping("/restore/{id}")
	public ResponseEntity<Void> restorePatient(@PathVariable("id") Long id){
		Patients patient = patientService.findById(id);
		if(patient == null) {
			throw new ApplicationException("Patient not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		patientService.restore(patient);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<PatientResponse> getPatient(@PathVariable("id") Long id){
		Patients patient = patientService.findById(id);
		if(patient == null) {
			throw new ApplicationException("Patient not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		PatientResponse patientResponse = AppUtils.convertPatientEntityToResponse(patient);
		return new ResponseEntity<PatientResponse>(patientResponse,HttpStatus.OK);
	}
	 
}
