import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Button, Typography } from "@mui/material";

const Layout = () => {
  const { idLogged, idFriend, logout } = useContext(UserContext);

  return (
    // PROVISORY TO SHOW USER IS LOGGED IN
    <>
      {idLogged != 0 && (
        <>
          <Typography>Connected as: {idLogged}</Typography>
          {<Button onClick={logout}>logout</Button>}
        </>
      )}
      {idFriend != 0 && <Typography>Friend is: {idFriend}</Typography>}
      <nav>
        <ul>
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
