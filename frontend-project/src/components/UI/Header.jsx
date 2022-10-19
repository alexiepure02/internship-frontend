import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  IconButton,
  Avatar,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import {
  logout,
  checkIfTokenExpired,
  checkIfAuthenticated,
  getUserInfo,
} from "../../functions/authentication";

import Sidebar from "./Sidebar";
import { FriendContext } from "../../contexts/FriendContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";

const Header = () => {
  const { userAvatar } = useContext(UserContext);
  const { friendName } = useContext(FriendContext);

  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = checkIfAuthenticated();
  const displayName = isAuthenticated ? getUserInfo().name : "";
  useEffect(() => {
    if (isAuthenticated) {
      if (checkIfTokenExpired()) {
        logout();
      }
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

  const onClickLogout = () => {
    logout();
    navigate("/login");
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

          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {window.location.pathname == "/chat" && friendName}
          </Typography>

          {isAuthenticated ? (
            <IconButton
              onClick={(e) => {
                navigate("/account");
              }}
              sx={{ p: 0 }}
            >
              <Avatar
                src={userAvatar && userAvatar}
                sx={{
                  color: "primary.main",
                  backgroundColor: "secondary.main",
                }}
              >
                {displayName[0].charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <Button
              color="inherit"
              onClick={(e) => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        open={sidebar}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.light",
          },
        }}
      >
        <Sidebar toggleDrawer={toggleDrawer} onClickLogout={onClickLogout} />
      </Drawer>

      <Outlet />
    </>
  );
};

export default Header;
