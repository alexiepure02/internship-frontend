import * as React from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";

import { register } from "../functions/authentication";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError();
    setAccountCreated(false);

    try {
      await register(username, password, displayName);
      setAccountCreated(true);
    } catch (err) {
      setError("Invalid username, password or display name.");
    }

    setUsername("");
    setPassword("");
    setDisplayName("");
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
          Sign up
        </Typography>

        {accountCreated && (
          <Alert
            severity="success"
            sx={{
              mt: 2,
            }}
          >
            Account created succesfully.
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
            }}
          >
            {error}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="displayName"
            label="Display Name"
            id="displayName"
            value={displayName}
            onChange={(event) => setDisplayName(event.currentTarget.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
