 
import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "clinic_logo.svg";
import { useSelector } from "react-redux";

var ps;

function Sidebar(props) {
 

  const auth = useSelector(state => state.auth);
  const rolesUser = auth.user.roles;
  const sidebar = useRef();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
 
  useEffect(()=>{
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return ()=>{
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    }
  },[])
 
  
    return (
      <div
        className="sidebar"
        data-color={props.bgColor}
        data-active-color={props.activeColor}
      >
        <div className="logo">
          <a
            href="/admin/dashboard"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            href="/admin/dashboard"
            className="simple-text logo-normal"
          >
             Phòng Khám
          </a>
        </div>
        <div className="sidebar-wrapper" ref={sidebar}>
          <Nav>
            {props.routes.map((prop, key) => {
              const {roles} = prop;
              //update thêm
              return   roles.includes(rolesUser[0].authority) ?  (
                  <li
                  className={
                    activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
                 
              )   : null
            })}  
          </Nav>
        </div>
      </div>
    );
  }
 

export default Sidebar;
