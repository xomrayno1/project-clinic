package com.tampro.model;

import java.util.List;

public class ChartDashBoard {
	private int month;
	private List<DataChart> data;
	
	
	
	public ChartDashBoard() {
		super();
	}
	public ChartDashBoard(int month, List<DataChart> data) {
		super();
		this.month = month;
		this.data = data;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public List<DataChart> getData() {
		return data;
	}
	public void setData(List<DataChart> data) {
		this.data = data;
	}
	@Override
	public String toString() {
		return "ChartDashBoard [month=" + month + ", data=" + data + "]";
	}
	
	 
	
	
}
