package com.tampro.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

public class PatientRequest {
	private Long id;
	@NotBlank(message = "Vui lòng nhập tên!")
	@Size(max = 3, min = 16, message = "Tên của bạn từ 3 - 16 kí tự")
	private String name;
	@NotBlank(message = "Vui lòng nhập email!")
	@Email(message = "Vui lòng định dạng email")
	private String email;
	@NotBlank(message = "Vui lòng nhập số điện thoại!")
	@Size(max = 8, min = 12, message = "Số điện thoại từ 8 - 12 kí tự")
	private String phone;
	@NotBlank(message = "Vui lòng nhập giới tính!")
	private String gender;
	private MultipartFile imageUpload;
	private String description;
	private Long userId;
	@NotBlank(message = "Vui lòng nhập địa chỉ!")
	@Size(max = 3, min = 20, message = "Địa chỉ từ 5 - 40 kí tự")
	private String address;
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
