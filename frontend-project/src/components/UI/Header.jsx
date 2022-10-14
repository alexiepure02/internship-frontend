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
import { useContext } from "react";

import {
  logout,
  checkIfTokenExpired,
  checkIfAuthenticated,
  getUserInfo,
} from "../../functions/authentication";
import { FriendContext } from "../../FriendContextProvider";

const Header = () => {
  const { friendName } = useContext(FriendContext);

  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = checkIfAuthenticated();
  const displayName = isAuthenticated ? getUserInfo().name : "";
  const [avatarPreview, setAvatarPreview] = useState();
  useEffect(() => {
    if (isAuthenticated) {
      if (checkIfTokenExpired()) {
        logout();
      } else {
        const userInfo = getUserInfo();
        setInitialAvatar(userInfo);
      }
    }
  }, [isAuthenticated]);

  const setInitialAvatar = async (userInfo) => {
    if (userInfo.hasOwnProperty("avatarUri")) {
      const blob = await fetch(userInfo.avatarUri).then((r) => r.blob());
      setAvatarPreview(URL.createObjectURL(blob));
    }
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
            {friendName}
          </Typography>

          {isAuthenticated ? (
            <IconButton
              onClick={(e) => {
                navigate("/account");
              }}
              sx={{ p: 0 }}
            >
              <Avatar
                src={avatarPreview}
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
