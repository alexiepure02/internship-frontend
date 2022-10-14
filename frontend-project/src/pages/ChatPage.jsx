import { TextField, Button, Grid, Typography, Box } from "@mui/material";

import { useState } from "react";

import { getUserInfo } from "../functions/authentication";
import MessagesList from "../components/chat/MessagesList";

globalThis.VIRTUOSO_LOG_LEVEL = 0;

function ChatPage(props) {
  const [message, setMessage] = useState("");

  const userId = getUserInfo().id;
  const friendId = props.friendId;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(userId, friendId, message);
    }

    setMessage("");
  };

  return (
    <>
      <div style={{ display: "flex" ,flexDirection: "column", flexGrow: 1 }}>
        <MessagesList
          userId={userId}
          friendId={friendId}
          messages={props.messages}
          startReached={props.startReached}
          virtuoso={props.virtuoso}
          startIndex={props.numberOfTotalMessages}
        />
        {/* <Grid container direction="column">
        <Grid item container direction="column"></Grid> */}
        {/* <Grid
        item
        container
        direction="column"
        spacing={1}
        sx={{ pt: 2, pb: 8, pl: 1, pr: 1 }}
      >


        {messages
          ? messages.map((message, index) => {
              if (
                message.idSender == userInfo.id &&
                message.idReceiver == friendId
              ) {
                return (
                  <Grid item container key={index} justifyContent="flex-end">
                    <Message
                      position="end"
                      backgroundColor={(theme) => theme.palette.secondary.dark}
                      idSender={message.idSender}
                      idReceiver={message.idReceiver}
                      text={message.text}
                      time={message.dateTime}
                    />
                  </Grid>
                );
              } else if (
                message.idSender == friendId &&
                message.idReceiver == userInfo.id
              ) {
                return (
                  <Grid item container key={index} justifyContent="flex-start">
                    <Message
                      position="start"
                      backgroundColor={(theme) => theme.palette.secondary.main}
                      idSender={message.idSender}
                      idReceiver={message.idReceiver}
                      text={message.text}
                      time={message.dateTime}
                    />
                  </Grid>
                );
              }
            })
          : "Not loaded yet."}
        <Grid item container ref={bottomRef} />
      </Grid> */}

        {/* <Grid item container> */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          width="1"
          // position="fixed"
          // bottom="0"
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
              backgroundColor: (theme) => theme.palette.secondary.main,
            }}
          />
        </Box>
      </div>
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
}

export default ChatPage;
