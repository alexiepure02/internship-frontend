import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./components/UserContext";
import { useState } from "react";
import axios from "axios";

import Chat from "./components/chat/Chat";
import Header from "./components/UI/Header";
import AccountPage from "./pages/AccountPage";
import FriendsPage from "./pages/Friendspage";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";

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

  const checkIfLogged = (page) =>
    idLogged != 0 ? page : <Navigate to="/login" />;

  const checkIfFriendSelected = (page) => {
    if (idLogged != 0) {
      if (idFriend != 0) {
        console.log(idLogged, idFriend);
        return page;
      } else {
        return <Navigate to="/friends" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="friends" element={checkIfLogged(<FriendsPage />)} />
            <Route path="chat" element={checkIfFriendSelected(<Chat />)} />
            <Route path="account" element={checkIfLogged(<AccountPage />)} />
            <Route
              path="friend-requests"
              element={checkIfLogged(<FriendRequestsPage />)}
            />
            <Route path="settings" element={checkIfLogged(<SettingsPage />)} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
