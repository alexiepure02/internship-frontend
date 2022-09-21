import Message from "./Message";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { alpha, AppBar, Grid, Typography, Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import axios from "axios";

function ChatMenu(props) {
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState(null);
  const { idLogged, idFriend } = useContext(UserContext);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/messages/" + idLogged + "," + idFriend
      );

      console.log(response.data);

      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(message);

    await axios.post("https://localhost:7228/api/messages", {
      idSender: idLogged,
      idReceiver: idFriend,
      text: message,
    });

    setMessage("");
  };

  return (
    <Grid container direction="column">
      <Grid item container direction="column" spacing={1} sx={{ pb: 8 }}>
        {messages
          ? messages.map((message, index) => {
              if (
                message.idSender == idLogged &&
                message.idReceiver == idFriend
              )
                return (
                  <Grid item container justifyContent="flex-end">
                    <Message align="end" text={message.text} />
                  </Grid>
                );
              else if (
                message.idSender == idFriend &&
                message.idReceiver == idLogged
              )
                return (
                  <Grid item container justifyContent="flex-start">
                    <Message align="start" text={message.text} />
                  </Grid>
                );
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
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#505050",
                  }}
                >
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
