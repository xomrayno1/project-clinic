package com.tampro.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StatisticalResponse {
	@JsonProperty("count_doctor")
	private long countDoctor;
	@JsonProperty("count_patient")
	private long countPatient;
	@JsonProperty("count_schdule_waiting")
	private long countScheduleWaiting;
	@JsonProperty("count_schdule_success")
	private long countScheduleSuccess;
	
	
	public StatisticalResponse(long countDoctor, long countPatient, long countScheduleWaiting,
			long countScheduleSuccess) {
		this.countDoctor = countDoctor;
		this.countPatient = countPatient;
		this.countScheduleWaiting = countScheduleWaiting;
		this.countScheduleSuccess = countScheduleSuccess;
	}
	public long getCountDoctor() {
		return countDoctor;
	}
	public void setCountDoctor(long countDoctor) {
		this.countDoctor = countDoctor;
	}
	public long getCountPatient() {
		return countPatient;
	}
	public void setCountPatient(long countPatient) {
		this.countPatient = countPatient;
	}
	 
	public long getCountScheduleWaiting() {
		return countScheduleWaiting;
	}
	public void setCountScheduleWaiting(long countScheduleWaiting) {
		this.countScheduleWaiting = countScheduleWaiting;
	}
	public long getCountScheduleSuccess() {
		return countScheduleSuccess;
	}
	public void setCountScheduleSuccess(long countScheduleSuccess) {
		this.countScheduleSuccess = countScheduleSuccess;
	}
	 
	

}
