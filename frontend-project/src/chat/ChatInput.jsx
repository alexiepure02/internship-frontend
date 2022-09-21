import { TextField, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";

const ChatInput = (props) => {
  const [idSender, setIdSender] = useState(0);
  const [idReceiver, setIdReceiver] = useState(0);
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(idSender, idReceiver, message);

    const isIdSenderProvided = idSender && idSender !== 0;
    const isIdReceiverProvided = idReceiver && idReceiver !== 0;
    const isMessageProvided = message && message !== "";

    if (isIdSenderProvided && isIdReceiverProvided && isMessageProvided) {
      props.sendMessage(idSender, idSender, message);
    } else {
      alert("Please insert an idSender, an idSender and a message.");
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
      <br />
      <TextField
        id="idSender"
        name="idSender"
        label="idSender"
        value={idSender}
        onChange={(event) => setIdSender(event.currentTarget.value)}
      />
      <br />
      <br />
      <TextField
        id="idReceiver"
        name="idReceiver"
        label="idReceiver"
        value={idReceiver}
        onChange={(event) => setIdReceiver(event.currentTarget.value)}
      />
      <br />
      <br />
      <TextField
        type="text"
        id="message"
        name="message"
        label="message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
      <br />
      <br />
      <Button type="submit">send</Button>
    </Box>
  );
};

export default ChatInput;
