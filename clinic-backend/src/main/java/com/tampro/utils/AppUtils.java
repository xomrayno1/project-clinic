package com.tampro.utils;

import org.springframework.web.multipart.MultipartFile;

import com.tampro.entity.Doctor;
import com.tampro.response.DoctorResponse;

public class AppUtils {
	
	public static String uploadFile(MultipartFile file) {
		return null;
	}
	
	public static DoctorResponse convertDoctorEntityToResponse(Doctor doctor) {
		DoctorResponse doctorResponse = new DoctorResponse();
		doctorResponse.setDescription(doctor.getDescription());
		doctorResponse.setDomain(doctor.getDomain());
		doctorResponse.setEducation(doctor.getEducation());
		doctorResponse.setEmail(doctor.getEmail());
		doctorResponse.setGender(doctor.getGender().getGenderName());
		doctorResponse.setId(doctor.getId());
		doctorResponse.setImageUrl(doctor.getImageUrl());
		doctorResponse.setLevel(doctor.getLevel());
		doctorResponse.setName(doctor.getName());
		doctorResponse.setPhone(doctor.getPhone());
		doctorResponse.setAddress(doctor.getAddress());
		doctorResponse.setCity(doctor.getCity());
		if(doctor.getUsers() != null) {
			doctorResponse.setUserId(doctor.getUsers().getId());
		}
		return doctorResponse;
	}

}
