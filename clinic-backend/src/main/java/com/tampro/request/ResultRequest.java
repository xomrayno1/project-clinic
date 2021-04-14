package com.tampro.request;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResultRequest {
	private long id;
	@JsonProperty(value = "doctor_id")
	private long doctorId;
	@JsonProperty(value = "pati_id")
	private long patientId;
	private String note;
	@JsonProperty(value = "image_upload")
	private MultipartFile imageUpload;
	private String reason; //nguyên nhân khám
	@JsonProperty(value = "reason_describe")
	private String reasonDescribe; //nguyên nhân khám chi tiết
	private String diagnose; //chẩn đoán của bác sĩ
	@JsonProperty(value = "blood_pressure")
	private String bloodPressure; // huyết áp
	private Integer height; // chiều cao 
	private Integer weight; // câng nặng
	@JsonProperty(value = "schedule_id")
	private long scheduleId;
	
	public long getId() {
		return id;
	}
	 
	public long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(long doctorId) {
		this.doctorId = doctorId;	
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public MultipartFile getImageUpload() {
		return imageUpload;
	}
	public void setImageUpload(MultipartFile imageUpload) {
		this.imageUpload = imageUpload;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getReasonDescribe() {
		return reasonDescribe;
	}
	public void setReasonDescribe(String reasonDescribe) {
		this.reasonDescribe = reasonDescribe;
	}
	public String getDiagnose() {
		return diagnose;
	}
	public void setDiagnose(String diagnose) {
		this.diagnose = diagnose;
	}
	public String getBloodPressure() {
		return bloodPressure;
	}
	public void setBloodPressure(String bloodPressure) {
		this.bloodPressure = bloodPressure;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	public void setId(long id) {
		this.id = id;
	}

	public long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(long scheduleId) {
		this.scheduleId = scheduleId;
	}
 
	
	
}
