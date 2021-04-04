package com.tampro.exception;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException{
	
	private final String msg;
	private final HttpStatus status;
	public ApplicationException(String msg, HttpStatus status) {
		this.msg = msg;
		this.status = status;
	}
	public String getMsg() {
		return msg;
	}
	public HttpStatus getStatus() {
		return status;
	}
	 
	
	
	

}
