import Chat from "./components/chat/Chat";
import Header from "./components/UI/Header";
import AccountPage from "./pages/AccountPage";
import FriendsPage from "./pages/Friendspage";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./pages/PrivateRoutes";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { FriendContextProvider } from "./FriendContextProvider";

function App() {
  const [friendName, setFriendName] = useState(null);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#292625",
      },
      secondary: {
        main: "#cab9a9",
        light: "#e1d5c9",
        dark: "#977759",
      },
      background: {
        default: "#f7efea",
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <FriendContextProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
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
        </div>
      </FriendContextProvider>
    </ThemeProvider>
  );
}

export default App;
