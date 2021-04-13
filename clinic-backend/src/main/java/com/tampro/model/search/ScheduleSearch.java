package com.tampro.model.search;

import java.io.Serializable;
import java.util.Date;

public class ScheduleSearch implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String keySearch;
	private Date dateTo;
	private Date dateFrom;
	private int type;
	private int status;
	private int keyId;
	private String key;
	
	
	
 
	public ScheduleSearch() {
		 
	}
	 
	public ScheduleSearch(String keySearch, Date dateFrom, Date dateTo, int type, int status) {
	 
		this.keySearch = keySearch;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.type = type;
		this.status = status;
	}

	public ScheduleSearch(String keySearch, Date dateFrom, Date dateTo, int type, int status, int keyId, String key) {
	 
		this.keySearch = keySearch;
		this.dateTo = dateTo;
		this.dateFrom = dateFrom;
		this.type = type;
		this.status = status;
		this.keyId = keyId;
		this.key = key;
	}

	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getKeySearch() {
		return keySearch;
	}
	public void setKeySearch(String keySearch) {
		this.keySearch = keySearch;
	}
	public Date getDateTo() {
		return dateTo;
	}
	public void setDateTo(Date dateTo) {
		this.dateTo = dateTo;
	}
	public Date getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(Date dateFrom) {
		this.dateFrom = dateFrom;
	}
	public int getKeyId() {
		return keyId;
	}
	public void setKeyId(int keyId) {
		this.keyId = keyId;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}
