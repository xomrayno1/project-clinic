package com.tampro.request;

public class UpdateStatusScheduleRequest {
	private int status;
	private int scheduleId;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(int scheduleId) {
		this.scheduleId = scheduleId;
	}
	@Override
	public String toString() {
		return "UpdateStatusScheduleRequest [status=" + status + ", scheduleId=" + scheduleId + "]";
	}
	

}
