 
import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useHistory } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import BookingNext from '../views/Booking/BookingNext'
import routes from "routes.js";
import { useSelector } from "react-redux";

var ps;

function Dashboard (props){
  const [backgroundColor, setBackgroundColor] =  useState('black');
  const [activeColor, setActiveColor] =  useState('info');
  const mainPanel = useRef();
  const history = useHistory();
  const auth = useSelector(state => state.auth);
  const rolesUser = auth.user.roles;

  useEffect(()=>{
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return ()=>{
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    }
  },[])
 
  useEffect(()=>{
    if (history.action === "PUSH") {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  })
  // const handleActiveClick = (color) => {
  //   setActiveColor(color)
  // };
  // const handleBgClick = (color) => {
  //    setBackgroundColor(color);
  // };
   
    return (
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
        />
        <div className="main-panel" ref={mainPanel}>
          <DemoNavbar {...props} />
          <Switch>
            {routes.map((prop, key) => {
              const {roles} = prop;
              
              return    (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                  
                  exact
                />
              )  
            })}

            {
              rolesUser.includes("ROLE_PATIENT") &&  <Route  path="/admin/booking/:doctorId" component={BookingNext}/>
            } 
          </Switch>
          <Footer fluid />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
      </div>
    );
  }
 

export default Dashboard;
