import { TextField, Button, Typography, Box } from "@mui/material";

import { useState } from "react";

import MessagesList from "../components/chat/MessagesList";
import { useContext } from "react";
import { FriendContext } from "../FriendContextProvider";
import { UserContext } from "../UserContextProvider";

globalThis.VIRTUOSO_LOG_LEVEL = 0;

function ChatPage(props) {
  const { friendId } = useContext(FriendContext);
  const { userId } = useContext(UserContext);

  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(userId, friendId, message);
    }

    setMessage("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <MessagesList
        messages={props.messages}
        startReached={props.startReached}
        virtuoso={props.virtuoso}
        startIndex={props.numberOfTotalMessages}
      />
      <Box component="form" onSubmit={handleSubmit} noValidate width="1">
        <TextField
          fullWidth
          id="message"
          type="text"
          label="Type a message..."
          margin="dense"
          variant="filled"
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          InputProps={{
            endAdornment: (
              <Button type="submit" variant="contained">
                <Typography>Send</Typography>
              </Button>
            ),
          }}
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        />
      </Box>
    </div>
  );
}

export default ChatPage;
