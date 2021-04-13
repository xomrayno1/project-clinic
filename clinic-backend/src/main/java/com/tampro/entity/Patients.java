package com.tampro.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.tampro.model.Gender;

@Entity
public class Patients  extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="id")
	private Long patiId;
	@Column(name = "name")
	private String patiName;
	private String email;
	private String phone;
	private Gender gender;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users users;
	private String imageUrl;
	@Column(columnDefinition = "TEXT")
	private String description;
	private String address;
	
	
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	 
	 
	public Long getPatiId() {
		return patiId;
	}
	public void setPatiId(Long patiId) {
		this.patiId = patiId;
	}
	public String getPatiName() {
		return patiName;
	}
	public void setPatiName(String patiName) {
		this.patiName = patiName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
}
