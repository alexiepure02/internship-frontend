import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

import ChatPage from "../../pages/ChatPage";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const token = localStorage.getItem("auth-token");
  const userId = jwtDecode(token).id;

  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  const location = useLocation();
  const friendId = location.state.idFriend;

  latestChat.current = chat;

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7228/api/messages/" + userId + "," + friendId,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setChat(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("logged user id:", userId, "friend id:", friendId);

    fetchMessages();

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7228/hub/chat")
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
          chatMessage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-signalr-connection": connection.connectionId,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return (
    <ChatPage
      sendMessage={sendMessage}
      messages={chat}
      userId={userId}
      friendId={friendId}
    />
  );
};

export default Chat;
