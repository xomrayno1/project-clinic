package com.tampro.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserRequest {
	private Long id;
	@NotBlank(message = "Vui lòng nhập username !")
	private String username;
	@NotBlank(message = "Vui lòng nhập password !")
	private String password;
	@NotBlank(message = "Vui lòng nhập email !")
	@Email(message = "Lỗi format email")
	private String email;
	private Long[] roles;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long[] getRoles() {
		return roles;
	}
	public void setRoles(Long[] roles) {
		this.roles = roles;
	}
	
	
}
