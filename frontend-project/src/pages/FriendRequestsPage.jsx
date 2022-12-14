import { Box, List, Alert, Container, TextField, Button } from "@mui/material";

import { useState, useEffect } from "react";

import {
  addFriendRequest,
  getFriendRequests,
  updateFriendRequest,
} from "../functions/api";

import SearchBar from "../components/UI/SearchBar";
import FriendRequestItem from "../components/friend-requests/FriendRequestItem";

function FriendRequestsPage() {
  const [friendRequests, setFriendRequests] = useState(null);
  const [requestedId, setRequestedId] = useState("");
  const [message, setMessage] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const friendRequests = await getFriendRequests();
      if (friendRequests.length !== 0) {
        setFriendRequests(friendRequests);
      } else {
        setFriendRequests(null);
      }
    };

    fetchFriendRequests();
  }, []);

  const sendFriendRequest = async (event) => {
    try {
      await addFriendRequest(requestedId);
      setMessage(<Alert>Friend request sent succesfully.</Alert>);
    } catch (err) {
      setMessage(<Alert severity="error">Invalid id.</Alert>);
    }

    setRequestedId("");
  };

  const handleListItemClick = async (event, requesterId, accepted) => {
    await updateFriendRequest(requesterId, accepted);

    setFriendRequests(
      friendRequests.filter((friendRequest) => friendRequest.id !== requesterId)
    );
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const checkElementIsSearched = (friendRequest) => {
    if (searchInput.length === 0) return true;

    if (searchInput.length !== 0)
      if (
        friendRequest.displayName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
        return true;
      else if (friendRequest.id == searchInput) return true;

    return false;
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
        {message}

        <TextField
          margin="normal"
          required
          id="friend-request"
          label="Send a request"
          name="friend-request"
          value={requestedId}
          onChange={(event) => setRequestedId(event.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={(event) => sendFriendRequest(event)}
          sx={{ mt: 1, mb: 2 }}
        >
          Add
        </Button>

        {friendRequests && (
          <>
            <SearchBar
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
            />
          </>
        )}

        <List>
          {friendRequests
            ? friendRequests.map((friendRequest, index) => {
                if (checkElementIsSearched(friendRequest))
                  return (
                    <FriendRequestItem
                      key={friendRequest.id}
                      id={friendRequest.id}
                      name={friendRequest.displayName}
                      avatarUri={friendRequest.avatarUri}
                      handleListItemClick={handleListItemClick}
                    />
                  );
              })
            : "No new friend requests."}
        </List>
      </Box>
    </Container>
  );
}

export default FriendRequestsPage;
