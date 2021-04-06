 
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import DoctorList from "views/Doctor/DoctorList";
import PatientList from "views/Patient/PatientList";
import ScheduleList from "views/Schedule/ScheduleList";
import ResultList from "views/Result/ResultList";
import UserList from "views/User/UserList";
import Booking from "views/Booking/Booking";
import BookingNext from "views/Booking/BookingNext";

var routes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
     
  },{
    path: "/users",
    name: "Tài khoản",
    icon: "nc-icon nc-single-02",
    component: UserList,
    layout: "/admin",
    
  },{
    path: "/doctors",
    name: "Bác sĩ",
    icon: "nc-icon nc-badge",
    component: DoctorList,
    layout: "/admin",
     
  } ,{
    path: "/patients",
    name: "Bệnh nhân",
    icon: "nc-icon nc-user-run",
    component: PatientList,
    layout: "/admin",
     
  },{
    path: "/schedules",
    name: "Lịch khám",
    icon: "nc-icon nc-time-alarm",
    component: ScheduleList,
    layout: "/admin",
    
  },{
    path: "/results",
    name: "Kết quả khám",
    icon: "nc-icon nc-single-copy-04",
    component: ResultList,
    layout: "/admin",
  
  },{
    path: "/booking",
    name: "Đặt lịch khám",
    icon: "nc-icon nc-paper",
    component: Booking,
    layout: "/admin",
    
  },{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
     
  },{
    path: "/user-page",
    name: "Thông tin cá nhân",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    
  } 
];
export default routes;
