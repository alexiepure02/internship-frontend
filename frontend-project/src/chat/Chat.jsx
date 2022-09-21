import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
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

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            console.log(message + "aaaaa");
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const sendMessage = async (idSender, idReceiver, text) => {
    const chatMessage = {
      idSender: idSender,
      idReceiver: idReceiver,
      message: text,
    };

    console.log(connection);

    if (connection._connectionStarted) {
      try {
        connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
