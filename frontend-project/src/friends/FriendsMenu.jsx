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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [friends, setFriends] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/users/" + idLogged + "/friends"
      );
      setFriends(response.data);
    };

    fetchFriends();
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    setIdFriend(index);

    navigate("/chat");
  };

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
                <ListItemButton
                  key={index}
                  selected={selectedIndex === friend.id}
                  onClick={(event) => handleListItemClick(event, friend.id)}
                >
                  <Friend id={friend.id} name={friend.displayName} />
                </ListItemButton>
              ))
            : "Not loaded yet."}
        </List>
      </Box>
    </Container>
  );
}

export default FriendsMenu;
