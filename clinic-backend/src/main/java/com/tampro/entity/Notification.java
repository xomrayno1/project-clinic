package com.tampro.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String title;
	@Column(name = "message",columnDefinition = "TEXT")
	private String message;
	private int seen; 
	
	private String sender;
	@ManyToOne
	@JoinColumn(name = "user_receiver")
	private Users userReceiver;
	
 
	
	private Date date;
	
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
	public Users getUserReceiver() {
		return userReceiver;
	}
	public void setUserReceiver(Users userReceiver) {
		this.userReceiver = userReceiver;
	}
 
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	
	
	
	
	

}
