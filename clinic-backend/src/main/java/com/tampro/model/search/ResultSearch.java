package com.tampro.model.search;

import java.util.Date;

public class ResultSearch {
	private  String searchKey;
	private  Date dateFrom;
	private  Date dateTo;
	public ResultSearch(String searchKey, Date dateFrom, Date dateTo) {
		super();
		this.searchKey = searchKey;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}
	public String getSearchKey() {
		return searchKey;
	}
	public void setSearchKey(String searchKey) {
		this.searchKey = searchKey;
	}
	public Date getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(Date dateFrom) {
		this.dateFrom = dateFrom;
	}
	public Date getDateTo() {
		return dateTo;
	}
	public void setDateTo(Date dateTo) {
		this.dateTo = dateTo;
	}
	

	
	
	
	

}
