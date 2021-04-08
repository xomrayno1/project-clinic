package com.tampro.model;

public interface ScheduleInterface {
	String getReason();
	String getTime();
	String getType();
	Long getDoctorId();
	Long getPatientId();
	String getDoctorName();
	String getPatientName();
	Long getId();
	String getStatus();
}
