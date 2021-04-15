package com.tampro.model;

import java.util.Date;

public class ResultSearchPagination {
	private String searchKey;
	private Date dateFrom;
	private Date dateTo;
	private int limit;
	private int page;
	
	
	public ResultSearchPagination() {
		super();
	}
	public ResultSearchPagination(String searchKey, Date dateFrom, Date dateTo, int limit, int page) {
		super();
		this.searchKey = searchKey;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
		this.limit = limit;
		this.page = page;
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
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	
	
	
}	
