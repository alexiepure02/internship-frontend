import Friend from "./Friend";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Avatar, Icon, ListItemAvatar, Typography } from "@mui/material";
import { Container } from "@mui/material";

import useFetchData from "../useFetchData";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FriendsMenu(props) {
  const { idLogged, setIdFriend } = useContext(UserContext);
  const [friends, setFriends] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // reset idFriend when re-entering this page
    setIdFriend(0);

    const fetchFriends = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/users/" + idLogged + "/friends"
      );
      setFriends(response.data);
    };

    fetchFriends();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <List>
          {friends
            ? friends.map((friend, index) => (
                /*<ListItemButton
                  key={index}
                  onClick={(event) => handleListItemClick(event, friend.id)}
                >*/
                <Friend id={friend.id} name={friend.displayName} />
                /*                </ListItemButton>*/
              ))
            : "Not loaded yet."}
        </List>
      </Box>
    </Container>
  );
}

export default FriendsMenu;
