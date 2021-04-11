package com.tampro.model;

public enum Status {
	WAITING(0,"waiting"),
	COMPLETE(1,"complete");
	
	private final int statusCode;
	private final String statusName;
	
	
	Status(int i, String string) {
		// TODO Auto-generated constructor stub
		this.statusCode = i;
		this.statusName = string;
	}


	public int getStatusCode() {
		return statusCode;
	}


 

	public String getStatusName() {
		return statusName;
	}

 
	
	
	
	
}
