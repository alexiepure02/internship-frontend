import Friend from "../components/friends/Friend";
import SearchBar from "../components/UI/SearchBar";

import { Box, List, Typography, Container } from "@mui/material";

import { useState, useEffect } from "react";

import { getFriends } from "../functions/api";
import FriendItem from "../components/friends/FriendItem";
import Chat from "../components/chat/Chat";

function FriendsPage() {
  const [friends, setFriends] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState({
    idFriend: null,
    nameFriend: null,
  });

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const friends = await getFriends();

    if (friends.length !== 0) {
      setFriends(friends);
    } else {
      setFriends(null);
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const checkElementIsSearched = (friend) => {
    if (searchInput.length === 0) return true;

    if (searchInput.length !== 0)
      if (friend.displayName.toLowerCase().includes(searchInput.toLowerCase()))
        return true;
      else if (friend.id == searchInput) return true;

    return false;
  };

  const updateOnDeleteFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
       // sx={{ display: "flex", minHeight: "100vh" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {friends && (
            <SearchBar
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
            />
          )}
          <List>
            {friends ? (
              friends.map((friend, index) => {
                if (checkElementIsSearched(friend))
                  return (
                    <FriendItem
                      key={friend.id}
                      id={friend.id}
                      name={friend.displayName}
                      avatarUri={friend.avatarUri}
                      setSelectedFriend={setSelectedFriend}
                      updateOnDeleteFriend={updateOnDeleteFriend}
                    />
                  );
              })
            ) : (
              <Typography>No friends.</Typography>
            )}
          </List>
        </Box>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {selectedFriend.idFriend && (
            <Chat
              idFriend={selectedFriend.idFriend}
              nameFriend={selectedFriend.nameFriend}
            />
          )}
        </div> */}
      </Container>
    </>
  );
}

export default FriendsPage;
