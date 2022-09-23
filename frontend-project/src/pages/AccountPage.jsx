import { Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Container, Box } from "@mui/material";

const AccountPage = (props) => {
  const { idLogged } = useContext(UserContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        "https://localhost:7228/api/users/" + idLogged
      );
      setUser(response.data);
    };

    fetchUser();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user && (
          <>
            <Typography variant="h2">{user.displayName}</Typography>
            <Typography variant="h4">Id: {user.id}</Typography>
            <Typography variant="h4">Username: {user.username}</Typography>
            <Typography variant="h4">Password: {user.password}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AccountPage;
