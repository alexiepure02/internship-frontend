import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Alert, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

function RegisterMenu() {
  const { register } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError();

    try {
      await register(username, password, displayName);
    } catch (err) {
      setError(err);
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

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
            }}
          >
            Incorrect 
            {error.response.data.errors.Username && "\n -username"}
            {error.response.data.errors.Password && "\n -password"}
            {error.response.data.errors.DisplayName && "\n -display name"}
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

export default RegisterMenu;
