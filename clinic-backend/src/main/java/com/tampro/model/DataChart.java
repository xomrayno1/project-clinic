package com.tampro.model;

public class DataChart {
	private int status;
	private int count;
	
	public DataChart() {
		super();
	}
	public DataChart(int status, int count) {
		super();
		this.status = status;
		this.count = count;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	@Override
	public String toString() {
		return "DataChart [status=" + status + ", count=" + count + "]";
	}
	
	
	

}
