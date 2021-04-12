package com.tampro.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

 
public class DoctorRequest {
	private long id;
	@NotBlank(message = "Vui lòng nhập tên!")
	@Size(max = 16, min = 3, message = "Tên của bạn từ 3 - 16 kí tự")
	private String name;
	@NotBlank(message = "Vui lòng nhập email!")
	@Email(message = "Vui lòng định dạng email")
	private String email;
	@NotBlank(message = "Vui lòng nhập số điện thoại!")
	@Size(max = 12, min = 8, message = "Số điện thoại từ 8 - 12 kí tự")
	private String phone;
	@NotBlank(message = "Vui lòng nhập giới tính!")
	private String gender;
	private Long userId;
	private MultipartFile imageUpload;
	private String description;
	@NotBlank(message = "Vui lòng nhập chuyên nghành!")
	@Size(max = 20, min = 3, message = "Chuyên nghành từ 3 - 20 kí tự")
	private String domain;
	@NotBlank(message = "Vui lòng nhập trường tốt nghiệp!")
	@Size(max = 20, min = 3, message = "Trường tốt nghiệp từ 3 - 20 kí tự")
	private String education;
	@NotBlank(message = "Vui lòng nhập trình độ!")
	@Size(max = 20, min = 3, message = "Trình độ  từ 3 - 20 kí tự")
	private String level;
	@NotBlank(message = "Vui lòng nhập địa chỉ!")
	@Size(max = 20, min = 3, message = "Địa chỉ từ 5 - 40 kí tự")
	private String address;
	@NotBlank(message = "Vui lòng nhập thành phố!")
	@Size(max = 20, min = 3, message = "Thành phố từ 3 - 20 kí tự")
	private String city;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
