package com.tampro.utils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.stream.Collectors;

import org.springframework.web.multipart.MultipartFile;

import com.tampro.entity.Doctor;
import com.tampro.entity.Notification;
import com.tampro.entity.Patients;
import com.tampro.entity.Results;
import com.tampro.entity.Schedule;
import com.tampro.entity.Users;
import com.tampro.response.DoctorResponse;
import com.tampro.response.NotificationResponse;
import com.tampro.response.PatientResponse;
import com.tampro.response.ResultResponse;
import com.tampro.response.ScheduleResponse;
import com.tampro.response.UserResponse;

public class AppUtils {
	 
	public static String uploadFile(MultipartFile multipartFile) throws IllegalStateException, IOException {
		String imageUrl = System.currentTimeMillis()+"_"+multipartFile.getOriginalFilename();
		File file = new File(Constant.UPLOAD_IMAGE + imageUrl);
		multipartFile.transferTo(file);
		return imageUrl;
	}
	public static ScheduleResponse convertScheduleEntityToResponse(Schedule schedule) {
		ScheduleResponse infoResponse = new ScheduleResponse();
		infoResponse.setDoctorId(schedule.getDoctor().getDocId());
		infoResponse.setDoctorName(schedule.getDoctor().getDocName());
		infoResponse.setId(schedule.getId());
		infoResponse.setPatientId(schedule.getPatients().getPatiId());
		infoResponse.setPatientName(schedule.getPatients().getPatiName());
		infoResponse.setReason(schedule.getReason());
		infoResponse.setStatus(schedule.getStatus());
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		infoResponse.setTime(simpleDateFormat.format(schedule.getTime()));
		infoResponse.setType(schedule.getType());
		return infoResponse;
	}
	public static DoctorResponse convertDoctorEntityToResponse(Doctor doctor) {
		DoctorResponse doctorResponse = new DoctorResponse();
		doctorResponse.setDescription(doctor.getDescription());
		doctorResponse.setDomain(doctor.getDomain());
		doctorResponse.setEducation(doctor.getEducation());
//		doctorResponse.setEmail(doctor.getEmail());
		doctorResponse.setGender(doctor.getGender().getGenderName());
		doctorResponse.setId(doctor.getDocId());
		doctorResponse.setImageUrl(doctor.getImageUrl());
		doctorResponse.setLevel(doctor.getLevel());
		doctorResponse.setName(doctor.getDocName());
		doctorResponse.setPhone(doctor.getPhone());
		doctorResponse.setAddress(doctor.getAddress());
		doctorResponse.setCity(doctor.getCity());
		doctorResponse.setActiveFlag(doctor.getActiveFlag());
		if(doctor.getUsers() != null) {
			doctorResponse.setUserId(doctor.getUsers().getId());
			doctorResponse.setUsername(doctor.getUsers().getUsername());
		}
		return doctorResponse;
	}
	public static PatientResponse convertPatientEntityToResponse(Patients patient) {
		PatientResponse patientResponse = new PatientResponse();
		patientResponse.setDescription(patient.getDescription());	 
//		patientResponse.setEmail(patient.getEmail());
		patientResponse.setGender(patient.getGender().getGenderName());
		patientResponse.setId(patient.getPatiId());
		patientResponse.setImageUrl(patient.getImageUrl());
		patientResponse.setName(patient.getPatiName());
		patientResponse.setPhone(patient.getPhone());
		patientResponse.setAddress(patient.getAddress());
		patientResponse.setActiveFlag(patient.getActiveFlag());
		if(patient.getUsers() != null) {
			patientResponse.setUserId(patient.getUsers().getId());
			patientResponse.setUsername(patient.getUsers().getUsername());
		}
		return patientResponse;
	}
	
	public static UserResponse convertUserEntityToResponse(Users users) {
		UserResponse response = new UserResponse();
		response.setEmail(users.getEmail());
		response.setId(users.getId());
		response.setPassword(users.getPassword());
		response.setUsername(users.getUsername());
		response.setActiveFlag(users.getActiveFlag());
		Long[] roles =  users.getRoles().stream()
				.map(item -> item.getId()	)
				.collect(Collectors.toList())
				.toArray(new Long[users.getRoles().size()]);
				 
		response.setRoles(roles);
		return response;
	}

	public static ResultResponse convertResultEntityToResponse(Results results) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		ResultResponse resultResponse = new ResultResponse();
		resultResponse.setBloodPressure(results.getBloodPressure());
		resultResponse.setDiagnose(results.getDiagnose());
		if(results.getDoctor() != null) {
			resultResponse.setDoctorId(results.getDoctor().getDocId());
			resultResponse.setDoctorName(results.getDoctor().getDocName());
		}
		resultResponse.setHeight(results.getHeight());
		resultResponse.setId(results.getId());
		resultResponse.setImageUrl(results.getImageUrl());
		resultResponse.setNote(results.getNote());
		if(results.getPatients() != null) {
			resultResponse.setPatientId(results.getPatients().getPatiId());
			resultResponse.setPatientName(results.getPatients().getPatiName());
		}
		resultResponse.setReason(results.getReason());
		resultResponse.setReasonDescribe(results.getReasonDescribe());
		resultResponse.setWeight(results.getWeight());
		if(results.getSchedule() != null) {
			resultResponse.setCheduleId(results.getSchedule().getId());
			resultResponse.setTime(simpleDateFormat.format(results.getSchedule().getTime()));
		}
		return resultResponse;
	}
	
	public static NotificationResponse convertNotificationEntityToResponse(Notification notification) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyy HH:mm:ss");
		NotificationResponse response = new NotificationResponse();
		response.setId(notification.getId());
		response.setMessage(notification.getMessage());
		response.setSeen(notification.getSeen());
		response.setSender(notification.getSender());
		response.setTitle(notification.getTitle());
		 
		response.setUserId(notification.getUserReceiver().getId());
		response.setDate(simpleDateFormat.format(notification.getDate()) ); 
		return response;
	}
}
