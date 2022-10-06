import { TextField, Button, Grid, Typography, Box } from "@mui/material";

import { useEffect, useState, useRef } from "react";
import { loremIpsum } from "react-lorem-ipsum";

import { getUserInfo } from "../functions/authentication";
import { useCallback } from "react";
import MessagesList from "../components/chat/MessagesList";
import { getSomeMessages } from "../functions/api";

globalThis.VIRTUOSO_LOG_LEVEL = 0;

function ChatPage(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const [offset, setOffset] = useState(0);

  const virtuoso = useRef(null);

  const userId = getUserInfo().id;
  const friendId = props.friendId;

  const numberOfMessages = 10;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(userId, friendId, message);
    }

    setMessage("");
  };

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await getSomeMessages(
        friendId,
        offset,
        numberOfMessages
      );
      setMessages(initialMessages);
    };

    setOffset(offset + numberOfMessages);

    fetchInitialMessages();
  }, []);

  const startReached = useCallback(async () => {
    setOffset(offset + numberOfMessages);

    const newMessages = await getSomeMessages(
      friendId,
      offset,
      numberOfMessages
    );

    const combinedMessages = [...newMessages, ...messages];
    setMessages(combinedMessages);
  }, [messages]);

  return (
    <>
      <MessagesList
        messages={messages}
        startReached={startReached}
        virtuoso={virtuoso}
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
                message.idSender == userId &&
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
                message.idReceiver == userId
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
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        />
      </Box>
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
}

export default ChatPage;
