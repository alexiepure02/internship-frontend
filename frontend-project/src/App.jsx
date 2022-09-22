import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import { UserContext } from "./UserContext";
import { useState } from "react";
import axios from "axios";

import Chat from "./chat/Chat";
import Header from "./Header";
import Account from "./Account";
import FriendsMenu from "./friends/FriendsMenu";
import FriendRequestsMenu from "./friend-requests/FriendRequestsMenu";
import LoginMenu from "./LoginMenu";
import RegisterMenu from "./RegisterMenu";

const messages = [
  { idSender: 1, idReceiver: 2, text: "text1" },
  { idSender: 2, idReceiver: 1, text: "text2" },
  {
    idSender: 1,
    idReceiver: 2,
    text: "a very very very very very looooooooooong text",
  },
  {
    idSender: 2,
    idReceiver: 1,
    text: "another very very very very very looooooooooong text",
  },
  {
    idSender: 1,
    idReceiver: 2,
    text: "This may seem like a normal message. That's because it is a normal message. I'm just testing to see how long a message can get before screwing something up.",
  },
  { idSender: 2, idReceiver: 1, text: "text5" },
  { idSender: 2, idReceiver: 1, text: "text6" },
  { idSender: 2, idReceiver: 1, text: "text7" },
  { idSender: 2, idReceiver: 1, text: "text8" },
  { idSender: 2, idReceiver: 1, text: "text9" },
];

function App() {
  const [idLogged, setIdLogged] = useState(0);
  const [idFriend, setIdFriend] = useState(0);

  const login = async (username, password) => {
    const response = await axios.get(
      "https://localhost:7228/api/users/" + username + "," + password
    );
    setIdLogged(response.data.id);
  };

  const logout = () => {
    setIdLogged(0);
  };

  const register = async (username, password, displayName) => {
    await axios.post("https://localhost:7228/api/users", {
      username: username,
      password: password,
      displayName: displayName,
    });
    login(username, password);
  };

  const value = {
    idLogged,
    setIdLogged,
    idFriend,
    setIdFriend,
    login,
    logout,
    register,
  };

  // CREATE CONNECTIONS BETWEEN THE PAGES
  // SIGNALR

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              path="friends"
              element={
                idLogged != 0 ? <FriendsMenu /> : <Navigate to="/login" />
              }
            />
            <Route
              path="chat"
              element={
                idLogged != 0 ? (
                  idFriend != 0 ? (
                    <Chat />
                  ) : (
                    <Navigate to="/friends" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="account"
              element={idLogged != 0 ? <Account /> : <Navigate to="/login" />}
            />
            <Route
              path="friend-requests"
              element={
                idLogged != 0 ? (
                  <FriendRequestsMenu />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="login" element={<LoginMenu />} />
            <Route path="register" element={<RegisterMenu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
