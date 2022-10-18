import { Divider, ListItem, ListItemButton, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import Friend from "../friends/Friend";
import { Box } from "@mui/system";

function FriendRequestItem(props) {
  return (
    <>
      <ListItem key={props.index} sx={{ display: "flex" }}>
        <Friend
          key={props.id}
          id={props.id}
          name={props.name}
          avatarUri={props.avatarUri}
          clickable={false}
          reloadPage={props.reloadPage}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ListItemButton
            onClick={(event) =>
              props.handleListItemClick(event, props.id, true)
            }
            //sx={{ alignSelf: "right" }}
          >
            <CheckIcon />
          </ListItemButton>
          <ListItemButton
            onClick={(event) =>
              props.handleListItemClick(event, props.id, false)
            }
            //sx={{ alignSelf: "right" }}
          >
            <CancelIcon />
          </ListItemButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
}

export default FriendRequestItem;
