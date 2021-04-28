
import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import BookingNext from '../views/Booking/BookingNext'
import routes from "routes.js";
import { useSelector } from "react-redux";

var ps;

function Admin(props) {
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [activeColor, setActiveColor] = useState('info');
  const auth = useSelector(state => state.auth);
  const mainPanel = useRef();
  const history = useHistory();
  const authority = auth.user.roles[0].authority;

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    }
  }, [])

  useEffect(() => {
    if (history.action === "PUSH") {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  })

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
          {
            routes.map((prop, key) => {
              return prop.roles.includes(authority) ? <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
                exact
              /> : <Route /// cùng path cùng layout nhưng khác render
                path={prop.layout + prop.path}
                render={() => (
                  <Redirect to="access-denied" />
                )}
                key={key}
                exact
              />
            })
          }

          {
            authority === 'ROLE_PATIENT' ? <Route path="/admin/booking/:doctorId" component={BookingNext} /> : <Redirect to="/access-denied" />
          }
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );






}


export default Admin;
