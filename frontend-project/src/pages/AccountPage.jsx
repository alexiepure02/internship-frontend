import {
  Avatar,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Alert,
} from "@mui/material";

import { useEffect, useState, useContext } from "react";

import Footer from "../components/UI/Footer";
import { UserContext } from "../contexts/UserContextProvider";

import { updateDisplayName, updateAvatar } from "../functions/api";

const AccountPage = (props) => {
  const { userId, userName, userAvatar, setUserAvatar } =
    useContext(UserContext);

  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState(false);
  const [newAvatarUri, setNewAvatarUri] = useState(null);
  const [newAvatarPreview, setNewAvatarPreview] = useState(null);
  const [newName, setNewName] = useState();

  useEffect(() => {
    setNewName(userName);
  }, [userName]);

  const handleEditClick = (value) => {
    setEditable(value);
  };

  const handleDoneClick = async (value) => {
    // when the user clicks done
    if (!value) {
      if (newName !== userName) {
        const response = await updateDisplayName(newName);
        setUpdatedName(true);
      }

      if (newAvatarPreview != null) {
        await updateAvatar(newAvatarUri);
        setUserAvatar(URL.createObjectURL(newAvatarUri));
        setNewAvatarPreview(null);
      }
    }

    setEditable(value);
  };

  const handleCancelClick = (value) => {
    setNewAvatarUri(null);
    setNewAvatarPreview(null);
    setEditable(value);
  };

  const handleAvatarChange = (event) => {
    const uri = event.target.files[0];
    setNewAvatarUri(uri);
    setNewAvatarPreview(URL.createObjectURL(uri));
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const editMenu = (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          src={newAvatarPreview ? newAvatarPreview : userAvatar}
          sx={{
            cursor: "pointer",
            width: 100,
            height: 100,
            fontSize: 64,
            color: "primary.main",
            backgroundColor: "secondary.main",
          }}
        >
          {userName && userName.charAt(0).toUpperCase()}
        </Avatar>
        <Button variant="contained" component="label" sx={{ ml: 4 }}>
          Change avatar
          <input hidden type="file" onChange={handleAvatarChange} />
        </Button>
      </Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        Name:
      </Typography>
      <TextField
        value={newName}
        onChange={handleNameChange}
        InputProps={{
          sx: {
            "& input": {
              textAlign: "center",
            },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={(event) => handleDoneClick(false)}
        sx={{ mt: 5 }}
      >
        Done
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={(event) => handleCancelClick(false)}
        sx={{ mt: 3 }}
      >
        Cancel
      </Button>
    </>
  );

  const readMenu = (
    <>
      <Avatar
        src={userAvatar}
        sx={{
          width: 100,
          height: 100,
          fontSize: 64,
          color: "primary.main",
          backgroundColor: "secondary.main",
        }}
      >
        {userName && userName.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Name: {userName}
      </Typography>
      <Typography variant="h4">Id: {userId}</Typography>
      <Button
        variant="contained"
        onClick={(event) => handleEditClick(true)}
        sx={{ mt: 4 }}
      >
        Edit
      </Button>
    </>
  );

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {editable ? editMenu : readMenu}
          {updatedName && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Re-log to display changes
            </Alert>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AccountPage;
