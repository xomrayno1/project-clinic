INSERT INTO USERS(username, password, email,active_Flag) values ('admin','12345','admin@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno1','12345','xr1@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno2','12345','xr2@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno3','12345','xr3@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno4','12345','xr4@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno5','12345','xr5@gmail.com',1);

INSERT INTO ROLES(NAME) VALUES ('ROLE_ADMIN');
INSERT INTO ROLES(NAME) VALUES ('ROLE_DOCTOR');
INSERT INTO ROLES(NAME) VALUES ('ROLE_PATIENT');
 
INSERT INTO USER_ROLE(user_id,role_id) VALUES (1,1);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (2,2);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (3,2);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (4,3);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (5,3);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (6,3);

 
INSERT INTO DOCTOR(ADDRESS, CITY, DESCRIPTION, DOMAIN, EDUCATION, EMAIL, GENDER, LEVEL, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'PY', 'Mô tả', 'Phụ khoa', ' DH Y Duoc TP HCM', 'xr1@gmail.com', '1', 'Thạc sĩ', 'Tấn đoan', '03231242', 1,1);
INSERT INTO DOCTOR(ADDRESS, CITY, DESCRIPTION, DOMAIN, EDUCATION, EMAIL, GENDER, LEVEL, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa ', 'PY', 'Mo Ta Mo Ta', 'Y Khoa', ' DH Y Duoc Huế', 'xr2@gmail.com', '0', 'Thạc sĩ', 'Tran Van B', '03231242', 2,1);

INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'Mo Ta Mo Ta', 'xr3@gmail.com', '1', 'Le Van A', '03231242', 3,1);
INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'Mo Ta Mo Ta', 'xr4@gmail.com', '1', 'Le Van B', '03231242', 4,1);
 INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'Mo Ta Mo Ta', 'xr5@gmail.com', '1', 'Le Van C', '03231242', 5,1); 

INSERT INTO SCHEDULE(ACTIVE_FLAG,REASON,STATUS,TIME,TYPE,DOCTOR_ID,PATIENT_ID )
VALUES(1,'Đau bụng nhiều',2,'2021-04-08 08:00:00',1,1,1);
INSERT INTO SCHEDULE(ACTIVE_FLAG,REASON,STATUS,TIME,TYPE,DOCTOR_ID,PATIENT_ID )
VALUES(1,'Đau bụng ít',1,'2021-04-08 15:00:00',2,1,2);
INSERT INTO SCHEDULE(ACTIVE_FLAG,REASON,STATUS,TIME,TYPE,DOCTOR_ID,PATIENT_ID )
VALUES(1,'Đau bụng vừa vừa',1,'2021-04-09 17:00:00',1,1,3);
