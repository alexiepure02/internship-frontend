import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";

const Sidebar = (props) => {

  const handleToggleDarkMode = () => {
    console.log("dark mode toggled");
  }

  return (
    <Box
      role="presentation"
      width={250}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText>
              <Typography>Account</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText>
              <Typography>Friend requests</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemText>
            <Typography sx={{ml: 2}}>Dark mode</Typography>
          </ListItemText>
          <Switch edge="start" onChange={handleToggleDarkMode}/>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText>
              <Typography>Settings</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
