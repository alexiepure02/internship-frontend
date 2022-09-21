import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

function Friend(props) {
  return (
    <>
       <ListItemAvatar>
                <Avatar>{props.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText>
                <Typography>{props.name + " (" + props.id + ")"}</Typography>
              </ListItemText>
    </>
  );
}

export default Friend;
