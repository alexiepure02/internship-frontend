import { Divider, ListItem, ListItemButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import Friend from "../friends/Friend";

function FriendRequestItem(props) {
  return (
    <>
      <ListItem key={props.index}>
        <Friend
          key={props.id}
          id={props.id}
          name={props.name}
          avatarUri={props.avatarUri}
          clickable={false}
          reloadPage={props.reloadPage}
        />
        <ListItemButton
          onClick={(event) => props.handleListItemClick(event, props.id, true)}
          sx={{ ml: 5 }}
        >
          <CheckIcon />
        </ListItemButton>
        <ListItemButton
          onClick={(event) => props.handleListItemClick(event, props.id, false)}
        >
          <CancelIcon />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default FriendRequestItem;
