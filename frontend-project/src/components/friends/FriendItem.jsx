import {
  Menu,
  MenuItem,
  IconButton,
  ListItem,
  Divider,
  ListItemButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState } from "react";

import { deleteFriend } from "../../functions/api";
import ConfirmDialog from "./ConfirmDialog";
import Friend from "./Friend";
import { useNavigate } from "react-router-dom";

function FriendItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openDelete = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    "clicked outside of dialog."
  );

  const navigate = useNavigate();

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleClose();
    setOpenDialog(true);
  };

  const handleDeleteClose = async (value) => {
    setOpenDialog(false);
    if (value === "delete clicked") {
      await deleteFriend(props.id);

      props.updateOnDeleteFriend(props.id);
    }
  };

  const handleFriendClick = (event, index) => {
    navigate("/chat", { state: { idFriend: index, nameFriend: props.name } });
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={(event) => handleFriendClick(event, props.id)}>
          <Friend
            key={props.id}
            id={props.id}
            name={props.name}
            clickable={true}
            reloadPage={props.reloadPage}
          />
        </ListItemButton>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={openDelete ? "long-menu" : undefined}
          aria-expanded={openDelete ? "true" : undefined}
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
          open={openDelete}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
        <ConfirmDialog
          selectedValue={selectedValue}
          open={openDialog}
          onClose={handleDeleteClose}
        />
      </ListItem>
      <Divider />
    </>
  );
}

export default FriendItem;
