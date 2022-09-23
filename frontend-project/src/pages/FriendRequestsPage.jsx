import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Avatar, Icon, ListItemAvatar, Typography } from "@mui/material";
import { Container } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FriendRequest from "../components/friend-requests/FriendRequest";

function FriendRequestsPage(props) {
  const { idLogged } = useContext(UserContext);
  const [friendRequests, setFriendRequests] = useState(null);
  const [idFriend, setIdFriend] = useState("");

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/users/" + idLogged + "/friend-requests"
      );
      setFriendRequests(response.data);
    };

    fetchFriendRequests();
  }, []);

  const addFriend = (event) => {
    axios.post("https://localhost:7228/api/users/friend-requests", {
      idUser: idFriend,
      idRequester: idLogged,
    });

    setIdFriend("");
  };

  const handleListItemClick = (event, idRequester, accepted) => {
    axios.put("https://localhost:7228/api/users/friend-requests/" + accepted, {
      idUser: idLogged,
      idRequester: idRequester,
    });
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
        <TextField
          margin="normal"
          required
          id="friend-request"
          label="Send a request"
          name="friend-request"
          value={idFriend}
          onChange={(event) => setIdFriend(event.currentTarget.value)}
        />
        <Button
          variant="contained"
          onClick={(event) => addFriend(event)}
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>

        <List>
          {friendRequests
            ? friendRequests.map((friendRequest, index) => (
                <ListItem key={index}>
                  <FriendRequest
                    id={friendRequest.id}
                    name={friendRequest.displayName}
                  />
                  <ListItemButton
                    onClick={(event) =>
                      handleListItemClick(event, friendRequest.id, true)
                    }
                  >
                    <CheckIcon />
                  </ListItemButton>
                  <ListItemButton
                    onClick={(event) =>
                      handleListItemClick(event, friendRequest.id, false)
                    }
                  >
                    <CancelIcon />
                  </ListItemButton>
                </ListItem>
              ))
            : "Not loaded yet."}
        </List>
      </Box>
    </Container>
  );
}

export default FriendRequestsPage;
