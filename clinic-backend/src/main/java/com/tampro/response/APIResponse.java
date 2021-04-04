package com.tampro.response;

import com.tampro.model.Pagination;

public class APIResponse<T> {
	private T data;
	private Pagination pagination;
	
	public APIResponse() {
		 
	}
	public APIResponse(T data, Pagination pagination) {
		 
		this.data = data;
		this.pagination = pagination;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public Pagination getPagination() {
		return pagination;
	}
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
	
	
}
