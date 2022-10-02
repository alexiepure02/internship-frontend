import Friend from "../components/friends/Friend";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  Avatar,
  Icon,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";

import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Chat from "../components/chat/Chat";

function FriendsPage(props) {
  const { idLogged, setIdFriend } = useContext(UserContext);

  const token = localStorage.getItem("auth-token");
  const userId = jwtDecode(token).id;

  const [page, reloadPage] = useState();
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    // reset idFriend when re-entering this page
    setIdFriend(0);

    const fetchFriends = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/users/" + userId + "/friends",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.length !== 0) {
        setFriends(response.data);
      }
    };

    fetchFriends();
  }, [page]);

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
          {friends ? (
            friends.map((friend, index) => (
              <Friend
                key={friend.id}
                id={friend.id}
                name={friend.displayName}
                reloadPage={reloadPage}
              />
            ))
          ) : (
            <Typography>No friends.</Typography>
          )}
        </List>
      </Box>
    </Container>
  );
}

export default FriendsPage;
