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
        <Avatar sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
          {props.name[0].charAt(0).toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography>{" #" + props.id + " " + props.name}</Typography>
      </ListItemText>
    </>
  );
}

export default Friend;
