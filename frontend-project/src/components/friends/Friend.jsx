import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function Friend(props) {
  // const setAvatar = () => URL.createObjectURL(props.avatarUri);

  const [avatarPreview, setAvatarPreview] = useState();

  useEffect(() => {
    setInitialAvatar();
  }, []);

  const setInitialAvatar = async () => {
    if (props.avatarUri != null) {
      const blob = await fetch(props.avatarUri).then((r) => r.blob());
      setAvatarPreview(URL.createObjectURL(blob));
    }
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar src={avatarPreview} sx={{ backgroundColor: "primary.main" }}>
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
