package com.tampro.exception;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException{
	
	private final Object msg;
	private final HttpStatus status;
	public ApplicationException(Object msg, HttpStatus status) {
		this.msg = msg;
		this.status = status;
	}
	public Object getMsg() {
		return msg;
	}
	public HttpStatus getStatus() {
		return status;
	}
	 
	
	
	

}
