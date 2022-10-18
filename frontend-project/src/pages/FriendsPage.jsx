import SearchBar from "../components/UI/SearchBar";
import FriendItem from "../components/friends/FriendItem";
import { FriendContext } from "../contexts/FriendContextProvider";

import { Box, List, Typography } from "@mui/material";

import { useState, useEffect, useContext } from "react";

import { getFriends } from "../functions/api";

function FriendsPage() {
  const [friends, setFriends] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const { setFriendId, setFriendName } = useContext(FriendContext);

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

  const setSelectedFriend = (id, name) => {
    setFriendId(id);
    setFriendName(name);
  };

  return (
    <Box
      sx={{
        ml: 1,
        mr: 1,
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
  );
}

export default FriendsPage;
