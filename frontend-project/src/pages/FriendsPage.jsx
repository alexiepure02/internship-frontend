import Friend from "../components/friends/Friend";
import SearchBar from "../components/UI/SearchBar";

import { Box, List, Typography, Container } from "@mui/material";

import { useState, useEffect } from "react";

import { getFriends } from "../functions/api";
import FriendItem from "../components/friends/FriendItem";

function FriendsPage() {
  const [page, reloadPage] = useState();
  const [friends, setFriends] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await getFriends();
      if (friends.length !== 0) {
        setFriends(friends);
      } else {
        setFriends(null);
      }
    };

    fetchFriends();
  }, [page]);

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

  return (
    <>
      <Container component="main" maxWidth="xs">
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
                      reloadPage={reloadPage}
                    />
                  );
              })
            ) : (
              <Typography>No friends.</Typography>
            )}
          </List>
        </Box>
      </Container>
    </>
  );
}

export default FriendsPage;
