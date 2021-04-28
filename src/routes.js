 
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js"; 
 
import DoctorList from "views/Doctor/DoctorList";
import PatientList from "views/Patient/PatientList";
import ResultList from "views/Result/ResultList";
import UserList from "views/User/UserList";
import Booking from "views/Booking/Booking";
import BookingNext from "views/Booking/BookingNext";
import ScheduleList from "views/Schedule/ScheduleList";
import BookingList from "views/Booking/BookingList";
import UserPage from "views/UserPage";
import NotificationList from "views/Notifications/NotificationList";
import UserDashBoard from "views/Dashboard/UserDashBoard";

var routes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    roles : ['ROLE_ADMIN']
  },{
    path: "/us/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-bank",
    component: UserDashBoard,
    layout: "/admin",
    roles : ['ROLE_PATIENT','ROLE_DOCTOR']
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
  },{
    path: "/patients",
    name: "Bệnh nhân",
    icon: "nc-icon nc-user-run",
    component: PatientList,
    layout: "/admin",
    roles : ['ROLE_ADMIN']
     
  },{
    path: "/notifications",
    name: "Thông báo",
    icon: "nc-icon nc-bell-55",
    component: NotificationList,
    layout: "/admin",
    roles : ['ROLE_PATIENT','ROLE_DOCTOR']
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
    roles : ['ROLE_ADMIN','ROLE_DOCTOR','ROLE_PATIENT']
  },{
    path: "/booking",
    name: "Đặt lịch khám",
    icon: "nc-icon nc-paper",
    component: Booking,
    layout: "/admin",
    roles : ['ROLE_PATIENT']
  },{
    path: "/list-booking",
    name: "Lịch khám của bạn",
    icon: "nc-icon nc-basket",
    component: BookingList,
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
    roles : ['ROLE_DOCTOR','ROLE_PATIENT']
  } 
];
export default routes;
