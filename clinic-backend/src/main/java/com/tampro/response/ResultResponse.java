package com.tampro.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResultResponse {
	private long id;
	@JsonProperty(value = "doctor_id")
	private long doctorId;
	@JsonProperty(value = "doc_name")
	private String doctorName;
	@JsonProperty(value = "pati_id")
	private long patientId;
	@JsonProperty(value = "pati_name")
	private String patientName;
	private String note;
	@JsonProperty(value = "image_upload")
	private String imageUrl;
	private String reason; //nguyên nhân khám 
	@JsonProperty(value = "reason_describe")
	private String reasonDescribe; //nguyên nhân khám chi tiết
	private String diagnose; //chẩn đoán của bác sĩ
	@JsonProperty(value = "blood_pressure")
	private String bloodPressure; // huyết áp
	@JsonProperty(value = "schedule_id")
	private long cheduleId;
	private Integer height; // chiều cao 
	private Integer weight; // câng nặng
	
	private String time;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(long doctorId) {
		this.doctorId = doctorId;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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
	public long getCheduleId() {
		return cheduleId;
	}
	public void setCheduleId(long cheduleId) {
		this.cheduleId = cheduleId;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	
	
	
}
