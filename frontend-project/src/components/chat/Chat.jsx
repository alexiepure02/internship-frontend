import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

import ChatPage from "../../pages/ChatPage";
import axios from "axios";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7228/hub/chatter")
      .withAutomaticReconnect()
      .build();

    if (newConnection) {
      newConnection
        .start()
        .then((result) => {
          console.log("Connected!");

          newConnection.on("ReceiveMessage", (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));

      setConnection(newConnection);
    }
  }, []);

  const sendMessage = async (idSender, idReceiver, text) => {
    const chatMessage = {
      idSender: idSender,
      idReceiver: idReceiver,
      text: text,
    };

    if (connection._connectionStarted) {
      try {
        await axios.post(
          "https://localhost:7228/api/messages/msg",
          chatMessage
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return <ChatPage sendMessage={sendMessage} messages={chat} />;
};

export default Chat;
