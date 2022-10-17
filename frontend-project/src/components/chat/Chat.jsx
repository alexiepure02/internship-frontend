import * as signalR from "@microsoft/signalr";

import ChatPage from "../../pages/ChatPage";

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import {
  getMessages,
  getNumberOfMessages,
  getSomeMessages,
  postMessage,
} from "../../functions/api";
import { useCallback } from "react";
import { useContext } from "react";
import { FriendContext } from "../../FriendContextProvider";
import { getUserInfo } from "../../functions/authentication";

const Chat = (props) => {
  const { setFriendName } = useContext(FriendContext);

  const [connection, setConnection] = useState(null);
  const [numberOfTotalMessages, setNumberOfTotalMessages] = useState(null);
  const [messages, setMessages] = useState([]);
  const latestChat = useRef(null);
  const [offset, setOffset] = useState(0);

  const location = useLocation();

  let friendId = props.idFriend;
  let friendName = props.nameFriend;

  if (location.state !== null) {
    friendId = location.state.idFriend;
    friendName = location.state.nameFriend;
  }

  const virtuoso = useRef(null);

  const pageSize = 10;

  latestChat.current = messages;

  const fetchTotalMessages = async () => {
    try {
      setMessages(await getMessages(friendId));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNumberOfTotalMessages = async () => {
    const nr = await getNumberOfMessages(friendId);
    setNumberOfTotalMessages(nr);
  };

  const fetchInitialMessages = async () => {
    const initialMessages = await getSomeMessages(friendId, offset, pageSize);
    setMessages(initialMessages);
  };

  useEffect(() => {
    setFriendName(friendName);

    fetchInitialMessages();
    fetchNumberOfTotalMessages();

    setOffset(offset + pageSize);

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
            // debugger
            const userId = parseInt(getUserInfo().id);

            if (
              (message.idSender === userId &&
                message.idReceiver === friendId) ||
              (message.idSender == friendId && message.idReceiver === userId)
            ) {
              const updatedChat = [...latestChat.current];

              updatedChat.push(message);

              setMessages(updatedChat);
            } else {
              console.log("aaaa");
            }
            // setMessages([...latestChat.current, message])
          });
        })
        .catch((e) => console.log("Connection failed: ", e));

      setConnection(newConnection);
    }

    return () => setFriendName(null);
  }, []);

  const sendMessage = async (ifSender, idReceiver, text) => {
    const message = {
      idSender: ifSender,
      idReceiver: idReceiver,
      text: text,
    };

    if (connection._connectionStarted) {
      try {
        // debugger
        await postMessage(message, connection.connectionId);
      } catch (e) {
        console.log("no white space.");
        //console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const startReached = useCallback(async () => {
    console.log("reached start of chat");

    setOffset(offset + pageSize);

    const newMessages = await getSomeMessages(friendId, offset, pageSize);

    const combinedMessages = [...newMessages, ...messages];
    setMessages(combinedMessages);
  }, [messages]);

  return (
    <ChatPage
      sendMessage={sendMessage}
      messages={messages}
      friendId={friendId}
      virtuoso={virtuoso}
      startReached={startReached}
      numberOfTotalMessages={numberOfTotalMessages}
    />
  );
};

export default Chat;
