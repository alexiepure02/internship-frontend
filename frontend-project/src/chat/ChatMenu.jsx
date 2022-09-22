import Message from "./Message";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { alpha, AppBar, Grid, Typography, Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import axios from "axios";
import { red } from "@mui/material/colors";

function ChatMenu(props) {
  const [message, setMessage] = useState("");
  const { idLogged, idFriend } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(idLogged, idFriend, message);
    }

    setMessage("");
  };

  return (
    <Grid container direction="column">
      <Grid item container direction="column" spacing={1} sx={{ pb: 8 }}>
        {props.messages
          ? props.messages.map((message, index) => {
              if (
                message.idSender == idLogged &&
                message.idReceiver == idFriend
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
                message.idSender == idFriend &&
                message.idReceiver == idLogged
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

export default ChatMenu;
