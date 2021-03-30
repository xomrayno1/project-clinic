package com.tampro.model;

public enum Type {
	REEXAMINATION(1,"re-examination");
	
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
