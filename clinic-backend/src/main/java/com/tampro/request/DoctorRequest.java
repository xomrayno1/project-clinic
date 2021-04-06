package com.tampro.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

 
public class DoctorRequest {
	private Long id;
	@NotBlank(message = "Please input your name!")
	private String name;
	@NotBlank(message = "Please input your email!")
	@Email
	private String email;
	@NotBlank(message = "Please input your phone!")
	private String phone;
	@NotBlank(message = "Please input your gender!")
	private String gender;
	private Long userId;
	private MultipartFile imageUpload;
	private String description;
	@NotBlank(message = "Please input your domain!")
	private String domain;
	@NotBlank(message = "Please input your education!")
	private String education;
	@NotBlank(message = "Please input your level!")
	private String level;
	@NotBlank(message = "Please input your address!")
	private String address;
	@NotBlank(message = "Please input your city!")
	private String city;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	 
	public MultipartFile getImageUpload() {
		return imageUpload;
	}
	public void setImageUpload(MultipartFile imageUpload) {
		this.imageUpload = imageUpload;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	} 
	
	
}
