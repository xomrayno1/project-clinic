package com.tampro.utils;

public enum ApiStatus {
	
	EMAIL_IS_EXIST(303, "Email is exist"),
	USERNAME_IS_EXIST(304, "Username is exist"),
	UNREGISTED_INFO(350, "Bệnh nhân chưa đăng ký thông tin");

	private int code;
	private String message;
	
	ApiStatus(int i, String string) {
		// TODO Auto-generated constructor stub
		this.code = i;
		this.message = string;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
