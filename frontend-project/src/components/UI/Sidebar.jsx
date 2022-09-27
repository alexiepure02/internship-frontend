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
  const { idLogged } = useContext(UserContext);

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
      name: "Dark mode",
    },
    {
      name: "Friend requests",
      path: "/friend-requests",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <Box
      role="presentation"
      width={250}
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
      sx={{ m: 2 }}
    >
      {idLogged != 0 ? (
        <List>
          {elements.map((element, index) => (
            <ListItem disablePadding sx={{ mt: 2 }}>
              {element.name === "Dark mode" ? (
                <>
                  <ListItemText>
                    <Typography sx={{ ml: 2 }}>Dark mode</Typography>
                  </ListItemText>
                  <Switch edge="start" onChange={handleToggleDarkMode} />
                </>
              ) : (
                <>
                  <ListItemButton
                    onClick={(event) => {
                      navigate(element.path);
                    }}
                  >
                    <ListItemText>
                      <Typography>{element.name}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
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
