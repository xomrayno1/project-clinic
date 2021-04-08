package com.tampro.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tampro.model.Status;
import com.tampro.model.Type;
// lịch khám bệnh
@Entity
public class Schedule  extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Date time;
	private Status status;
	@ManyToOne
	@JoinColumn(name = "patient_id")
	private Patients patients;
	@ManyToOne
	@JoinColumn(name = "doctor_id")
	private Doctor doctor;
	private Type type;
	private String reason;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Patients getPatients() {
		return patients;
	}
	public void setPatients(Patients patients) {
		this.patients = patients;
	}
	public Doctor getDoctor() {
		return doctor;
	}
	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	
	
	

}
