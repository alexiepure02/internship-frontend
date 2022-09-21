import React from "react";

import Message from "./Message";

const ChatWindow = (props) => {
  const chat = props.chat.map((m) => (
    <Message>m.message</Message>
  ));

  return <div>{chat}</div>;
};

export default ChatWindow;
