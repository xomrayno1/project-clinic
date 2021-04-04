package com.tampro.model;

public class Pagination {
	private long totalRows;
	private int limit ;
	private int page;
	
	
	public Pagination() {
		super();
	}
	public Pagination(long totalRows, int limit, int page) {
		super();
		this.totalRows = totalRows;
		this.limit = limit;
		this.page = page;
	}
	public long getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(long totalRows) {
		this.totalRows = totalRows;
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
