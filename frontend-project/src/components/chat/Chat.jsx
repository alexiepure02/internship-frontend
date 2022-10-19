import * as signalR from "@microsoft/signalr";

import { Container } from "@mui/system";

import ChatPage from "../../pages/ChatPage";
import FriendsPage from "../../pages/FriendsPage";
import { FriendContext } from "../../contexts/FriendContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getMessages,
  getNumberOfMessages,
  getSomeMessages,
  postMessage,
} from "../../functions/api";
import useWindowDimensions from "../../hooks/useWindowsDimensions";

const Chat = () => {
  const { friendId, setFriendId, setFriendName } = useContext(FriendContext);
  const { userId } = useContext(UserContext);

  const [connection, setConnection] = useState(null);
  const [numberOfTotalMessages, setNumberOfTotalMessages] = useState(null);
  const [messages, setMessages] = useState([]);
  const latestChat = useRef(null);
  const [offset, setOffset] = useState(0);
  const [newMessage, setNewMessage] = useState(null);

  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  const virtuoso = useRef(null);

  const pageSize = 10;

  latestChat.current = messages;

  const fetchTotalMessages = async () => {
    try {
      setMessages(await getMessages(friendId));
    } catch (e) {
      //console.log(e);
    }
  };

  const fetchNumberOfTotalMessages = async () => {
    const nr = await getNumberOfMessages(friendId);
    setNumberOfTotalMessages(nr);
  };

  const fetchInitialMessages = async () => {
    const initialMessages = await getSomeMessages(friendId, 0, pageSize);
    setMessages(initialMessages);
  };

  useEffect(() => {
    if (newMessage == null) {
      return;
    }

    console.log(messages[messages.length - 1], newMessage);

    if (messages[messages.length - 1].id != newMessage.id) {
      if (
        (newMessage.idSender === userId &&
          newMessage.idReceiver === friendId) ||
        (newMessage.idSender == friendId && newMessage.idReceiver === userId)
      ) {
        const updatedChat = [...latestChat.current];

        updatedChat.push(newMessage);

        setMessages(updatedChat);
        setNewMessage(null);
      }
    }
  }, [newMessage]);

  const createSignalRConnection = () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7228/hub/chat")
      .withAutomaticReconnect()
      .build();

    if (newConnection) {
      newConnection
        .start()
        .then((result) => {
          // connected
          newConnection.on("ReceiveMessage", setNewMessage);
        })
        .catch((e) => console.log("Connection failed: ", e));

      setConnection(newConnection);
    }
  };

  useEffect(() => {
    createSignalRConnection();

    return () => {
      setFriendId(null);
      setFriendName(null);
    };
  }, []);

  useEffect(() => {
    if (friendId === null) navigate("/friends");
    else {
      fetchInitialMessages();
      fetchNumberOfTotalMessages();
      setOffset(10 + pageSize);
    }
  }, [friendId]);

  const sendMessage = async (idSender, idReceiver, text) => {
    const message = {
      idSender: idSender,
      idReceiver: idReceiver,
      text: text,
    };

    if (connection._connectionStarted) {
      try {
        await postMessage(message, connection.connectionId);
      } catch (e) {
        //console.log("no white space.");
        //console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const startReached = useCallback(async () => {
    //console.log("reached start of chat");

    setOffset(offset + pageSize);

    const newMessages = await getSomeMessages(friendId, offset, pageSize);

    const combinedMessages = [...newMessages, ...messages];
    setMessages(combinedMessages);
  }, [messages]);

  return (
    <Container
      component="main"
      disableGutters
      sx={{ display: "flex", flexGrow: 1 }}
    >
      {width > 950 && <FriendsPage />}
      <ChatPage
        sendMessage={sendMessage}
        messages={messages}
        virtuoso={virtuoso}
        startReached={startReached}
        numberOfTotalMessages={numberOfTotalMessages}
      />
    </Container>
  );
};

export default Chat;
