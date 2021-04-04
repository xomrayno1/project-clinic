package com.tampro.controller;

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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tampro.entity.Doctor;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Gender;
import com.tampro.model.Pagination;
import com.tampro.request.DoctorRequest;
import com.tampro.response.APIResponse;
import com.tampro.response.DoctorResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.UserService;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_DOCTOR)
public class DoctorController {

	@Autowired
	DoctorService doctorService;
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<APIResponse> getAllSearchPagination(
			@RequestParam("search") String search, @RequestParam("limit") int limit,
			@RequestParam("page") int page){
		
		Pageable pageable =	PageRequest.of(page - 1, limit);
		//get value
		Page<Doctor> doctors = doctorService.findAllSearchPagination(search, pageable);
		//convert entity to response
		List<DoctorResponse> data = new ArrayList<DoctorResponse>();
		for(Doctor doctor : doctors.getContent()) {
			DoctorResponse doctorResponse = AppUtils.convertDoctorEntityToResponse(doctor);
			data.add(doctorResponse);
		}
		//create api response
		APIResponse apiResponse = new APIResponse(data,
									new Pagination(doctors.getTotalElements(), limit, page));
		return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<DoctorResponse> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest){
		boolean isExist = doctorService.isExist(doctorRequest.getEmail());
		if(isExist) {
			throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
		}
		//convert request to entity
		Doctor doctor = new Doctor();
		doctor.setDescription(doctorRequest.getDescription());
		doctor.setDomain(doctorRequest.getDomain());
		doctor.setEducation(doctorRequest.getEducation());
		doctor.setEmail(doctorRequest.getEmail());
		doctor.setGender(doctorRequest.getGender().equals(Gender.FEMALE.getGenderName()) ? Gender.FEMALE : Gender.MALE );
		if(doctorRequest.getImageUpload() != null) {
			String image = AppUtils.uploadFile(doctorRequest.getImageUpload());
			doctor.setImageUrl(image);
		}
		doctor.setLevel(doctorRequest.getLevel());
		doctor.setName(doctorRequest.getName());
		doctor.setPhone(doctorRequest.getPhone());
		doctor.setAddress(doctorRequest.getAddress());
		doctor.setCity(doctorRequest.getCity());
		doctor.setUsers(userService.getOne(doctorRequest.getUserId()));
		// save to database
		doctor = doctorService.save(doctor);  
		//convert entity to doctorResponse
		DoctorResponse doctorResponse =  AppUtils.convertDoctorEntityToResponse(doctor);
		//get Uri
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
											.buildAndExpand(doctorResponse.getId()) 
											.toUri();
		return ResponseEntity.created(uri).body(doctorResponse);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteDoctor(@PathVariable("id") Long id){
		Doctor doctor = doctorService.findById(id);
		if(doctor == null) {
			throw new ApplicationException("Doctor not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		doctorService.delete(doctor);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<DoctorResponse> getDoctor(@PathVariable("id") Long id){
		Doctor doctor = doctorService.findById(id);
		if(doctor == null) {
			throw new ApplicationException("Doctor not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		DoctorResponse doctorResponse = AppUtils.convertDoctorEntityToResponse(doctor);
		return new ResponseEntity<DoctorResponse>(doctorResponse,HttpStatus.OK);
	}
	 
}
