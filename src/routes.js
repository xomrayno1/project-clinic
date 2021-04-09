 
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js"; 
import UserPage from "views/User.js";
import DoctorList from "views/Doctor/DoctorList";
import PatientList from "views/Patient/PatientList";
import ResultList from "views/Result/ResultList";
import UserList from "views/User/UserList";
import Booking from "views/Booking/Booking";
import BookingNext from "views/Booking/BookingNext";
import ScheduleList from "views/Schedule/ScheduleList";

var routes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    roles : ['ROLE_PATIENT','ROLE_ADMIN','ROLE_DOCTOR']
  },{
    path: "/users",
    name: "Tài khoản",
    icon: "nc-icon nc-single-02",
    component: UserList,
    layout: "/admin",
    roles : ['ROLE_ADMIN']
  },{
    path: "/doctors",
    name: "Bác sĩ",
    icon: "nc-icon nc-badge",
    component: DoctorList,
    layout: "/admin",
    roles : ['ROLE_ADMIN']
  } ,{
    path: "/patients",
    name: "Bệnh nhân",
    icon: "nc-icon nc-user-run",
    component: PatientList,
    layout: "/admin",
    roles : ['ROLE_ADMIN']
     
  },{
    path: "/schedules",
    name: "Lịch khám",
    icon: "nc-icon nc-time-alarm",
    component: ScheduleList,
    layout: "/admin",
    roles : ['ROLE_ADMIN','ROLE_DOCTOR']
    
  },{
    path: "/results",
    name: "Kết quả khám",
    icon: "nc-icon nc-single-copy-04",
    component: ResultList,
    layout: "/admin",
    roles : ['ROLE_ADMIN','ROLE_DOCTOR']
  },{
    path: "/booking",
    name: "Đặt lịch khám",
    icon: "nc-icon nc-paper",
    component: Booking,
    layout: "/admin",
    roles : ['ROLE_PATIENT']
    
  },{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    roles : ['ROLE_ADMIN','ROLE_DOCTOR','ROLE_PATIENT']
     
  },{
    path: "/user-page",
    name: "Thông tin cá nhân",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    roles : ['ROLE_ADMIN','ROLE_DOCTOR','ROLE_PATIENT']
  } 
];
export default routes;
