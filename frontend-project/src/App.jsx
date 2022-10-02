import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

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
import PrivateRoutes from "./pages/PrivateRoutes";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";

function App() {
  const [idLogged, setIdLogged] = useState(0);
  const [idFriend, setIdFriend] = useState(0);

  const value = {
    idLogged,
    setIdLogged,
    idFriend,
    setIdFriend,
  };

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#292625",
      },
      secondary: {
        
        main: "#cab9a9",
        light: "#e1d5c9",
        dark: "#977759"
      },
      background: {
        default: "#f7efea",
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route element={<PrivateRoutes />}>
                <Route path="friends" element={<FriendsPage />} />
                <Route path="chat" element={<Chat />} />
                <Route path="account" element={<AccountPage />} />
                <Route
                  path="friend-requests"
                  element={<FriendRequestsPage />}
                />
              </Route>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
