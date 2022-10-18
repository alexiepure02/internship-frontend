import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { useContext } from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserInfo, login } from "../functions/authentication";
import { UserContext } from "../UserContextProvider";

function LoginPage(props) {
  const { setUserContext } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError();

    try {
      await login(username, password);
      const userInfo = getUserInfo();
      setUserContext(userInfo);
      navigate("/friends");
    } catch (err) {
      setError(err);
    }
  };

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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
            }}
          >
            Username and password are incorrect.
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link to="/register" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
