package com.tampro.model;

public enum Gender {
	FEMALE(1, "female"),
	MALE(2, "male");
	
	private final int genderCode;
	private final String genderName;
	
	
	private Gender(int genderCode, String genderName) {
		this.genderCode = genderCode;
		this.genderName = genderName;
	}
 
	public int getGenderCode() {
		return genderCode;
	}
 
	public String getGenderName() {
		return genderName;
	}
	
	

}
