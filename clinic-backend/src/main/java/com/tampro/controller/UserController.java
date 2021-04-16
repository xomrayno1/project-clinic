package com.tampro.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tampro.entity.Doctor;
import com.tampro.entity.Patients;
import com.tampro.entity.Roles;
import com.tampro.entity.Users;
import com.tampro.exception.ApplicationException;
import com.tampro.model.Gender;
import com.tampro.model.Pagination;
import com.tampro.request.DoctorRequest;
import com.tampro.request.PatientRequest;
import com.tampro.request.UserRequest;
import com.tampro.response.APIResponse;
import com.tampro.response.DoctorResponse;
import com.tampro.response.PatientResponse;
import com.tampro.response.UserResponse;
import com.tampro.service.DoctorService;
import com.tampro.service.PatientService;
import com.tampro.service.UserService;
import com.tampro.utils.ApiStatus;
import com.tampro.utils.AppUtils;
import com.tampro.utils.Constant;

@RestController
@RequestMapping(Constant.API_USER)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class UserController {
	@Autowired 
	UserService userService;
	@Autowired
	DoctorService doctorService;
	@Autowired
	PatientService patientService;
	@Autowired
	private PasswordEncoder bcryptEncoder;

	
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	
	@GetMapping
	public ResponseEntity<APIResponse> getAllSearchPagination(@RequestParam("search") String search,
			@RequestParam("limit") int limit, @RequestParam("page") int page
			) {
		Pageable pageable = PageRequest.of(page - 1, limit);
		// get value
		Page<Users> users = userService.findAllSearchPagination(search, pageable);
		// convert entity to response
		List<UserResponse> data = new ArrayList<UserResponse>();
		for (Users user : users.getContent()) {
			UserResponse userReponse = AppUtils.convertUserEntityToResponse(user);
			data.add(userReponse);
		}
		// create api response
		APIResponse apiResponse = new APIResponse(data, new Pagination(users.getTotalElements(), limit, page));
		return new ResponseEntity<APIResponse>(apiResponse, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getById(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			log.error("users not found exception with id : " + id);
			throw new ApplicationException("Không tìm thấy user", HttpStatus.NOT_FOUND);
		}
		UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
		return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable("id") long id) {
		Users users = userService.findById(id); 
		if (users == null) {
			log.error("users not found exception with id : " + id);
			throw new ApplicationException("Không tìm thấy user", HttpStatus.NOT_FOUND);
		}
		 
		 
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println(authentication.getName());
		if(users.getUsername().equals(authentication.getName())) {
			throw new ApplicationException("Không thể xoá chính bạn", HttpStatus.NOT_FOUND);
		}
		try {
			userService.delete(users);
		} catch (Exception e) {
			log.error("Delete failed ");
			throw new ApplicationException("Xoá thất bại", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@GetMapping("/restore/{id}")
	public ResponseEntity<Void> restoreUser(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			log.error("users not found exception with id : " + id);
			throw new ApplicationException("Không tìm thấy user", HttpStatus.NOT_FOUND);
		}
		try {
			userService.restore(users);
		} catch (Exception e) {
			throw new ApplicationException("Restore failed", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
		boolean flag = userService.isExistEmail(userRequest.getEmail());

		if (flag) {
			throw new ApplicationException("Email is exist", HttpStatus.CONFLICT);
		}
		flag = userService.isExistUsername(userRequest.getUsername());
		if (flag) {
			throw new ApplicationException("Username is exist", HttpStatus.CONFLICT);
		}
		try {
			Users users = new Users();
			users.setEmail(userRequest.getEmail());
			users.setPassword(bcryptEncoder.encode(users.getPassword()));
			Set<Roles> roles = new HashSet<>();
			for (Long id : userRequest.getRoles()) {
				Roles role = new Roles(id);
				roles.add(role);
			}
			users.setRoles(roles);
			users.setUsername(userRequest.getUsername());
			users = userService.save(users);
			UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
			return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Create failed", HttpStatus.CONFLICT);
		}

	}
	@PutMapping
	public ResponseEntity<Object> updateUser(@RequestBody UserRequest userRequest) {
		Users users = userService.findById(userRequest.getId());
		if(users == null) {
			throw new ApplicationException("user not found with id : "+ userRequest.getId(), HttpStatus.NOT_FOUND);
		}
		boolean flag = userService.isExistEmail(userRequest.getEmail());
		if (flag) {
			if(!users.getEmail().equals(userRequest.getEmail())) {
				Map<String, Object> data = new HashMap<>();
				data.put("code", ApiStatus.EMAIL_IS_EXIST.getCode());
				data.put("message", ApiStatus.EMAIL_IS_EXIST.getMessage());
				return new ResponseEntity<Object>(data, HttpStatus.CONFLICT);
			} 
		}
		flag = userService.isExistUsername(userRequest.getUsername());
		if (flag) {
			if(!users.getUsername().equals(userRequest.getUsername())) {
				Map<String, Object> data = new HashMap<>();
				data.put("code", ApiStatus.USERNAME_IS_EXIST.getCode());
				data.put("message", ApiStatus.USERNAME_IS_EXIST.getMessage());
				return new ResponseEntity<Object>(data, HttpStatus.CONFLICT);
			} 
		}
		try {
			 
			users.setEmail(userRequest.getEmail());
			if(!userRequest.getPassword().equals(users.getPassword())) {
				users.setPassword(bcryptEncoder.encode(userRequest.getPassword()));
				 
			}
			Set<Roles> roles = new HashSet<>();
			for (Long id : userRequest.getRoles()) {
				Roles role = new Roles(id);
				roles.add(role);
			}
			users.setRoles(roles);
			users.setId(userRequest.getId());
			users.setUsername(userRequest.getUsername());
			users = userService.save(users);
			UserResponse userResponse = AppUtils.convertUserEntityToResponse(users);
			return new ResponseEntity<Object>(userResponse, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Update failed", HttpStatus.BAD_REQUEST);
		}
	}
 

	
	@PutMapping("/doctor")
	public ResponseEntity<Object> updateDoctor(@RequestBody @Validated DoctorRequest doctorRequest){	 
		Doctor doctor = doctorService.findById(doctorRequest.getId());
		if(doctor == null) {
			doctor = new Doctor();
		}
		boolean isExist = doctorService.isExist(doctorRequest.getEmail());
		if(isExist) {
			if(!doctor.getEmail().equals(doctorRequest.getEmail())) {
				Map<String, Object> data = new HashMap<>();
				data.put("code", ApiStatus.EMAIL_IS_EXIST.getCode());
				data.put("message", ApiStatus.EMAIL_IS_EXIST.getMessage());
				return new ResponseEntity<Object>(data,HttpStatus.CONFLICT);
			}
		}
		//convert request to entity
		doctor.setDescription(doctorRequest.getDescription());
		doctor.setDomain(doctorRequest.getDomain());
		doctor.setEducation(doctorRequest.getEducation());
		doctor.setEmail(doctorRequest.getEmail());
		doctor.setGender(doctorRequest.getGender().equals(Gender.FEMALE.getGenderName()) ? Gender.FEMALE : Gender.MALE );
 
		doctor.setLevel(doctorRequest.getLevel());
		doctor.setDocName(doctorRequest.getName());
		doctor.setPhone(doctorRequest.getPhone());
		doctor.setAddress(doctorRequest.getAddress());
		doctor.setCity(doctorRequest.getCity());
		doctor.setUsers(userService.getOne(doctorRequest.getUserId()));
		// save to database
		doctor = doctorService.save(doctor);  
		//convert entity to doctorResponse
		DoctorResponse doctorResponse =  AppUtils.convertDoctorEntityToResponse(doctor);
		//get Uri
		return new ResponseEntity<Object>(doctorResponse,  HttpStatus.OK);
	}
	@PutMapping("/patients")
	public ResponseEntity<Object> updateProfilePatient(@RequestBody @Validated PatientRequest patientRequest){	 
		Patients patients = patientService.findById(patientRequest.getId());
		if(patients == null) {
			patients = new Patients();
		}
		boolean isExist = doctorService.isExist(patientRequest.getEmail());
		if(isExist) {
			if(!patients.getEmail().equals(patientRequest.getEmail())) {
				Map<String, Object> data = new HashMap<>();
				data.put("code", ApiStatus.EMAIL_IS_EXIST.getCode());
				data.put("message", ApiStatus.EMAIL_IS_EXIST.getMessage());
				return new ResponseEntity<Object>(data,HttpStatus.CONFLICT);
			}
		}
		//convert request to entity
		patients.setDescription(patientRequest.getDescription());
		patients.setEmail(patientRequest.getEmail());
		patients.setGender(patientRequest.getGender().equals(Gender.FEMALE.getGenderName()) ? Gender.FEMALE : Gender.MALE );
		patients.setPatiName(patientRequest.getName());
		patients.setPhone(patientRequest.getPhone());
		patients.setAddress(patientRequest.getAddress());
		patients.setUsers(userService.getOne(patientRequest.getUserId()));
		// save to database
		patients = patientService.save(patients);  
		//convert entity to doctorResponse
		PatientResponse patientResponse =  AppUtils.convertPatientEntityToResponse(patients);
		//get Uri
		return new ResponseEntity<Object>(patientResponse,  HttpStatus.OK);
	}
	@GetMapping("/{id}/doctor")
	public ResponseEntity<Object> findDoctorByUser(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			throw new ApplicationException("users not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		Doctor doctor = doctorService.findByUsers(users);
		if(doctor == null) {
			return new ResponseEntity<Object>(null, HttpStatus.OK);
		}
		DoctorResponse doctorResponse = AppUtils.convertDoctorEntityToResponse(doctor);
		return new ResponseEntity<Object>(doctorResponse, HttpStatus.OK);
	}
	@GetMapping("/{id}/patients")
	public ResponseEntity<Object> findPatientByUser(@PathVariable("id") long id) {
		Users users = userService.findById(id);
		if (users == null) {
			throw new ApplicationException("users not found exception with id : " + id, HttpStatus.NOT_FOUND);
		}
		Patients patient = patientService.findByUsers(users);
		if(patient == null) {
			return new ResponseEntity<Object>(null, HttpStatus.OK);
		}
		PatientResponse patientResponse = AppUtils.convertPatientEntityToResponse(patient);
		return new ResponseEntity<Object>(patientResponse, HttpStatus.OK);
	}
}
