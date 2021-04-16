
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import { useHistory } from 'react-router-dom'
import { message } from 'antd'

import routes from "routes.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from '../../redux/action/authAction'


function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const sidebarToggle = useRef();
  const history = useHistory();
  //const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const rolesUser = auth.user.roles;

  function toggle() {
    if (isOpen) {
      setColor("transparent")
    } else {
      setColor("dark")
    }
    setIsOpen(!isOpen)
  }
  function dropdownToggle(e) {
    setDropdownOpen(!dropdownOpen)
  }
  function getBrand() {

    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }
  function openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  function updateColor() {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark")
    } else {
      setColor("transparent")
    }
  }

  useEffect((e) => {
    if (
      window.innerWidth < 993 &&
      history.location.pathname !== history.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  })
  function handleLogout() {
    localStorage.removeItem("auth");
    dispatch(logoutAction())
    message.info("Đăng xuất thành công")
    history.push("/login");
  }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        window.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
          (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/admin/dashboard">{getBrand()}</NavbarBrand>
          {/* link branch */}
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse
          isOpen={isOpen}
          navbar
          className="justify-content-end"
        >
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i className="nc-icon nc-circle-10" />
                <p>
                  <span className="d-lg-none d-md-block">Tài khoản</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right >
                {
                  rolesUser[0].authority.includes('ROLE_ADMIN') ? null : (
                    <Link to="/admin/user-page">
                      <DropdownItem    >
                        Thông tin cá nhân
                        </DropdownItem>
                    </Link>
                  )
                }
                <DropdownItem onClick={handleLogout}>
                  Thoát
                    </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
