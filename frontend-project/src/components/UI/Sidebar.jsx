import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Switch,
  Typography,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Sidebar = (props) => {
  const isAuthenticated = !!localStorage.getItem("auth-token");

  const navigate = useNavigate();

  const handleToggleDarkMode = () => {
    console.log("dark mode toggled");
  };

  const elements = [
    {
      name: "Account",
      path: "/account",
    },
    {
      name: "Friends",
      path: "/friends",
    },
    {
      name: "Friend requests",
      path: "/friend-requests",
    },
  ];

  return (
    <Box width={250} onKeyDown={props.toggleDrawer(false)} sx={{ m: 2 }}>
      {isAuthenticated != 0 ? (
        <>
          <List onClick={props.toggleDrawer(false)}>
            {elements.map((element, index) => (
              <ListItem key={index} disablePadding sx={{ mt: 2 }}>
                <ListItemButton
                  onClick={(event) => {
                    props.toggleDrawer(false);
                    navigate(element.path);
                  }}
                >
                  <ListItemText>
                    <Typography>{element.name}</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemText>
                <Typography sx={{ ml: 2 }}>Dark mode</Typography>
              </ListItemText>
              <Switch edge="start" onChange={handleToggleDarkMode} />
            </ListItem>
          </List>
          <Button
            variant="contained"
            color="error"
            onClick={props.logout}
            sx={{ position: "fixed", bottom: 20, left: 94 }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2 }}>You need to log in first.</Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={(event) => {
              navigate("/login");
            }}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default Sidebar;
