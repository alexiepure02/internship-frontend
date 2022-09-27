import {
  Avatar,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Friend(props) {
  const { idLogged, setIdFriend } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleFriendClick = (event, index) => {
    setIdFriend(index);
    navigate("/chat");
  };

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFriend = async () => {
    const response = await axios.delete(
      "https://localhost:7228/api/users/" + idLogged + "/friends/" + props.id
    );

    console.log(props);

    console.log(props.reloadPage, typeof props.reloadPage);

    props.reloadPage({});
  };

  return (
    <ListItem key={props.id}>
      <ListItemButton onClick={(event) => handleFriendClick(event, props.id)}>
        <ListItemAvatar>
          <Avatar>{props.name[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText>
          <Typography>{props.name + " (" + props.id + ")"}</Typography>
        </ListItemText>
      </ListItemButton>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleOptionsClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={deleteFriend}>Delete</MenuItem>
      </Menu>
    </ListItem>
  );
}

export default Friend;
