import {
  Avatar,
  Typography,
  Container,
  Box,
  Button,
  Tooltip,
  TextField,
  Alert,
} from "@mui/material";

import { useEffect, useState } from "react";
import Footer from "../components/UI/Footer";

import { updateDisplayName, updateAvatar } from "../functions/api";
import { getUserInfo } from "../functions/authentication";

const AccountPage = (props) => {
  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);
  const userInfo = getUserInfo();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [newAvatarUri, setNewAvatarUri] = useState(null);
  const [newAvatarPreview, setNewAvatarPreview] = useState(null);
  const [newName, setNewName] = useState(userInfo.name);

  const setInitialAvatar = async () => {
    if (userInfo.hasOwnProperty("avatarUri")) {
      // const blob = await fetch(userInfo.avatarUri).then((r) => r.blob());
      const blob = await fetch(userInfo.avatarUri, {
        cache: "reload",
      }).then((r) => r.blob());
      console.log(URL.createObjectURL(blob));
      setAvatarPreview(URL.createObjectURL(blob));
    }
  };

  useEffect(() => {
    setInitialAvatar();
  }, []);

  const handleEditableClick = async (value) => {
    // when the user clicks done
    if (!value) {
      if (newName !== userInfo.name) {
        const response = await updateDisplayName(newName);

        console.log(response);

        setUpdated(true);
      }

      if (newAvatarUri != null) {
        await updateAvatar(newAvatarUri);
        setAvatarPreview(URL.createObjectURL(newAvatarUri));
        setUpdated(true);
      }
    }

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
          src={newAvatarPreview ? newAvatarPreview : avatarPreview}
          sx={{
            cursor: "pointer",
            width: 100,
            height: 100,
            fontSize: 64,
            color: "primary.main",
            backgroundColor: "secondary.main",
          }}
        >
          {userInfo.name.charAt(0).toUpperCase()}
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
        onClick={(event) => handleEditableClick(false)}
        sx={{ mt: 5 }}
      >
        Done
      </Button>
    </>
  );

  const readMenu = (
    <>
      <Avatar
        src={newAvatarPreview ? newAvatarPreview : avatarPreview}
        sx={{
          width: 100,
          height: 100,
          fontSize: 64,
          color: "primary.main",
          backgroundColor: "secondary.main",
        }}
      >
        {userInfo.name.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Name: {userInfo.name}
      </Typography>
      <Typography variant="h4">Id: {userInfo.id}</Typography>
      <Button
        variant="contained"
        onClick={(event) => handleEditableClick(true)}
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
          {userInfo && editable ? editMenu : readMenu}
          {updated && (
            <Alert severity="warning" sx={{ mt: 3 }}>
              Re-log to display changes
            </Alert>
          )}
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default AccountPage;
