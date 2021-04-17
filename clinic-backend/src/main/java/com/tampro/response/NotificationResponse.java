package com.tampro.response;

public class NotificationResponse {
	private long id;
	private String title;
	private String message;
	private int seen; // đã đọc chưa
	private String sender;
	private long userId;
	 
	private String date;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getSeen() {
		return seen;
	}
	public void setSeen(int seen) {
		this.seen = seen;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	 
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
	
}
