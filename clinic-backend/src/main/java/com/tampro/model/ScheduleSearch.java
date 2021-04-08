package com.tampro.model;


public class ScheduleSearch {
	private String keySearch;
	private String dateTo;
	private String dateFrom;
	
	
	
	public ScheduleSearch(String keySearch, String dateTo, String dateFrom) {
		super();
		this.keySearch = keySearch;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
	}
	public String getKeySearch() {
		return keySearch;
	}
	public void setKeySearch(String keySearch) {
		this.keySearch = keySearch;
	}
	public String getDateTo() {
		return dateTo;
	}
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}
	public String getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}
	
	
	
}
