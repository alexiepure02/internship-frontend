import Message from "../components/chat/Message";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { alpha, AppBar, Grid, Typography, Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useState } from "react";
import axios from "axios";
import { red } from "@mui/material/colors";
import { useRef } from "react";

function ChatPage(props) {
  const [message, setMessage] = useState("");

  const userId = props.userId;
  const friendId = props.friendId;
  const messages = props.messages;

  const bottomRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(userId, friendId, message);
    }

    setMessage("");
  };

  useEffect(() => {
    // scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Grid container direction="column">
      <Grid item container direction="column" spacing={1} sx={{ pt: 2, pb: 8 }}>
        {messages
          ? messages.map((message, index) => {
              if (
                message.idSender == userId &&
                message.idReceiver == friendId
              ) {
                return (
                  <Grid item container key={index} justifyContent="flex-end">
                    <Message
                      align="end"
                      backgroundColor={red[300]} // change color
                      text={message.text}
                      idSender={message.idSender}
                      idReceiver={message.idReceiver}
                    />
                  </Grid>
                );
              } else if (
                message.idSender == friendId &&
                message.idReceiver == userId
              ) {
                return (
                  <Grid item container key={index} justifyContent="flex-start">
                    <Message
                      align="start"
                      backgroundColor={red[100]} // change color
                      text={message.text}
                      idSender={message.idSender}
                      idReceiver={message.idReceiver}
                    />
                  </Grid>
                );
              }
            })
          : "Not loaded yet."}
        <Grid item container ref={bottomRef} />
      </Grid>

      <Grid item container>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          width="1"
          position="fixed"
          bottom="0"
        >
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
              backgroundColor: alpha("#CCC", 0.9),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatPage;