package com.tampro.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ErrorDetails {
	private String message;
	private Date date;
	private int code;
	private String description;
	private Map<String, String> fieldErrors = new HashMap<>();
	
	
	 
	public ErrorDetails(String message, Date date, int code, String description ) {
		 
		this.message = message;
		this.date = date;
		this.code = code;
		this.description = description;
		 
	}
	public ErrorDetails() {
		 
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Map<String, String> getFieldErrors() {
		return fieldErrors;
	}
	public void setFieldErrors(Map<String, String> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}
	
	
	
	

}
