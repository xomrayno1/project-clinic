<!--ALTER DATABASE clinic CHARACTER SET utf8 COLLATE utf8_general_ci;-->
<!--ALTER TABLE PATIENTS CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;-->
<!--ALTER TABLE logtest CHANGE title title VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci;-->

INSERT INTO USERS(username, password, email,active_Flag) values ('admin','$2a$10$1HPIA/uJcAyAaJfcFcudG.cnOqmaMuKIMlVpeDvTKh3UoprGbJamG','admin@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno1','$2a$10$1HPIA/uJcAyAaJfcFcudG.cnOqmaMuKIMlVpeDvTKh3UoprGbJamG','xr1@gmail.com',1);
INSERT INTO USERS(username, password, email,active_Flag) values ('xomrayno2','$2a$10$1HPIA/uJcAyAaJfcFcudG.cnOqmaMuKIMlVpeDvTKh3UoprGbJamG','xr2@gmail.com',1);
 
INSERT INTO ROLES(NAME) VALUES ('ROLE_ADMIN');
INSERT INTO ROLES(NAME) VALUES ('ROLE_DOCTOR');
INSERT INTO ROLES(NAME) VALUES ('ROLE_PATIENT');
 
INSERT INTO USER_ROLE(user_id,role_id) VALUES (1,1);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (2,2);
INSERT INTO USER_ROLE(user_id,role_id) VALUES (3,3);
 
 
INSERT INTO DOCTOR(ADDRESS, CITY, DESCRIPTION, DOMAIN, EDUCATION, EMAIL, GENDER, LEVEL, name, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'PY', 'Mô tả', 'Phụ khoa', ' DH Y Duoc TP HCM', 'xr1@gmail.com', '1', 'Thạc sĩ', 'Tấn đoan', '03231242', 2,1);
 
INSERT INTO PATIENTS(ADDRESS, DESCRIPTION, EMAIL, GENDER, NAME, PHONE, USER_ID,active_Flag) 
values('Dong Hoa - HHT', 'Mo Ta Mo Ta', 'xr3@gmail.com', '1', 'Le Van A', '03231242', 3,1);

INSERT INTO SCHEDULE(ACTIVE_FLAG,REASON,STATUS,TIME,TYPE,DOCTOR_ID,PATIENT_ID )
VALUES(1,'Đau bụng nhiều',2,'2021-04-08 08:00:00',1,1,1);
 