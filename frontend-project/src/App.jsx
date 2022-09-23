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

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route
              path="friends"
              element={
                idLogged != 0 ? <FriendsPage /> : <Navigate to="/login" />
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
              element={idLogged != 0 ? <AccountPage /> : <Navigate to="/login" />}
            />
            <Route
              path="friend-requests"
              element={
                idLogged != 0 ? (
                  <FriendRequestsPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
