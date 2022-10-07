import Sidebar from "./Sidebar";

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

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  logout,
  checkIfTokenExpired,
  checkIfAuthenticated,
  getUserInfo,
} from "../../functions/authentication";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = checkIfAuthenticated();
  const displayName = isAuthenticated ? getUserInfo().name : "";

  useEffect(() => {
    if (isAuthenticated && checkIfTokenExpired()) logout();
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

          <Typography sx={{ flexGrow: 1 }} />

          {checkIfAuthenticated() ? (
            <IconButton
              onClick={(e) => {
                navigate("/account");
              }}
              sx={{ p: 0 }}
            >
              <Avatar
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) => theme.palette.secondary.main,
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
            backgroundColor: (theme) => theme.palette.secondary.light,
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
