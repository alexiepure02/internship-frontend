import { AppBar, Typography, Button, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Sidebar from "./Sidebar";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const Header = () => {
  const { idLogged, idFriend } = useContext(UserContext);

  const isAuthenticated = !!localStorage.getItem("auth-token");

  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = jwtDecode(localStorage.getItem("auth-token"));

      console.log(userInfo);
    }
  }, [isAuthenticated]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    console.log("logged out");
    goToLogin();
  };

  const backupNav = (
    <nav>
      <ul>
        <li>
          <Link to="/friends">Friends</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/friend-requests">Friend requests</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {idLogged != 0 && <Typography>Connected as: {idLogged}</Typography>}
            {idFriend != 0 && <Typography>Friend is: {idFriend}</Typography>}
          </Typography>

          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={goToLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={sidebar} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      <Outlet />
    </>
  );
};

export default Header;
