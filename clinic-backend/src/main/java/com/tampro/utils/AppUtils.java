package com.tampro.utils;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.tampro.entity.Doctor;
import com.tampro.response.DoctorResponse;

public class AppUtils {
	
	public static String uploadFile(MultipartFile multipartFile) throws IllegalStateException, IOException {
		String imageUrl = System.currentTimeMillis()+"_"+multipartFile.getOriginalFilename();
		File file = new File(Constant.UPLOAD_IMAGE + imageUrl);
		multipartFile.transferTo(file);
		return imageUrl;
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
			doctorResponse.setUsername(doctor.getUsers().getUsername());
		}
		return doctorResponse;
	}

}
