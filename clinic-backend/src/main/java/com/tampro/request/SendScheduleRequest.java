package com.tampro.request;

public class SendScheduleRequest {
	private String time;
	private long patientId; 
	private long doctorId;
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	public long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(long doctorId) {
		this.doctorId = doctorId;
	}
	
	
	
}
