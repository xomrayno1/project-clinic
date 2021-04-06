INSERT INTO USERS(username, password, email) values ('xomrayno1','12345','xr1@gmail.com');
INSERT INTO USERS(username, password, email) values ('xomrayno2','12345','xr2@gmail.com');
INSERT INTO USERS(username, password, email) values ('xomrayno3','12345','xr3@gmail.com');
INSERT INTO USERS(username, password, email) values ('xomrayno4','12345','xr4@gmail.com');

INSERT INTO DOCTOR(ADDRESS, CITY, DESCRIPTION, DOMAIN, EDUCATION, EMAIL, GENDER, LEVEL, NAME, PHONE, USER_ID) 
values('Dong Hoa - HHT', 'PY', 'Mô tả', 'Phụ khoa', ' DH Y Duoc TP HCM', 'xr1@gmail.com', '1', 'Thạc sĩ', 'Tấn đoan', '03231242', 1);
INSERT INTO DOCTOR(ADDRESS, CITY, DESCRIPTION, DOMAIN, EDUCATION, EMAIL, GENDER, LEVEL, NAME, PHONE, USER_ID) 
values('Dong Hoa ', 'PY', 'Mo Ta Mo Ta', 'Y Khoa', ' DH Y Duoc Huế', 'xr2@gmail.com', '0', 'Thạc sĩ', 'Tran Van B', '03231242', 2);

INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID) 
values('Dong Hoa - HHT', 'Mo Ta Mo Ta', 'xr3@gmail.com', '1', 'Le Van A', '03231242', 3);
INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID) 
values('Dong Hoa ',  'Mo Ta Mo Ta', 'xr4@gmail.com', '0', 'Tran Van B', '03231242', 4);


