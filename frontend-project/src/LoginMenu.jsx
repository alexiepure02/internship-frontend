import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useState } from "react";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginMenu(props) {
  const { login } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError();

    try {
      await login(username, password);
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

export default LoginMenu;
