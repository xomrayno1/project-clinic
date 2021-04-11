package com.tampro.model;

import java.util.Date;

public class BookingSearch {
	private String keySearch;
	private Date dateTo;
	private Date dateFrom;
	private int status;
	private long patientId;
	
	 
	public BookingSearch(String keySearch, Date dateTo, Date dateFrom, int status, long patientId) {
		super();
		this.keySearch = keySearch;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.status = status;
		this.patientId = patientId;
	}
	public String getKeySearch() {
		return keySearch;
	}
	public void setKeySearch(String keySearch) {
		this.keySearch = keySearch;
	}
	public Date getDateTo() {
		return dateTo;
	}
	public void setDateTo(Date dateTo) {
		this.dateTo = dateTo;
	}
	public Date getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(Date dateFrom) {
		this.dateFrom = dateFrom;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	
	
}
