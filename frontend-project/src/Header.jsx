import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Sidebar from "./Sidebar";

const Header = () => {
  const { idLogged, idFriend, logout } = useContext(UserContext);

  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };

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

          {idLogged == 0 ? (
            <Button color="inherit" onClick={goToLogin}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
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

      <Drawer open={sidebar} onClose={toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      <Outlet />
    </>
  );
};

export default Header;
