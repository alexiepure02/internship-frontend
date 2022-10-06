import * as signalR from "@microsoft/signalr";

import ChatPage from "../../pages/ChatPage";

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { getMessages, postMessage } from "../../functions/api";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  const location = useLocation();
  const friendId = location.state.idFriend;

  latestChat.current = chat;

  const fetchMessages = async () => {
    try {
      setChat(await getMessages(friendId));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMessages();

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7228/hub/chat")
      .withAutomaticReconnect()
      .build();

    if (newConnection) {
      newConnection
        .start()
        .then((result) => {
          // connected
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

  const sendMessage = async (ifSender, idReceiver, text) => {
    const message = {
      idSender: ifSender,
      idReceiver: idReceiver,
      text: text,
    };

    if (connection._connectionStarted) {
      try {
        await postMessage(message, connection.connectionId);
      } catch (e) {
        console.log("no white space.");
        //console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  return (
    <ChatPage sendMessage={sendMessage} messages={chat} friendId={friendId} />
  );
};

export default Chat;
