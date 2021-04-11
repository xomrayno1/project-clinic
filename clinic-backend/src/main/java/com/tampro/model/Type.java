package com.tampro.model;

public enum Type {
	FIRSTEXAMINATION(0,"First-examination"),
	REEXAMINATION(1,"Re-examination");
	
	private final int typeCode;
	private final String typeName;

	Type(int i, String string) {
		// TODO Auto-generated constructor stub
		this.typeCode = i;
		this.typeName = string;
	}

	public int getTypeCode() {
		return typeCode;
	}

	public String getTypeName() {
		return typeName;
	}
	
	
	
	
}
