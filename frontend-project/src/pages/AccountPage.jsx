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

import { useState } from "react";
import Footer from "../components/UI/Footer";

import { updateDisplayName } from "../functions/api";
import { getUserInfo } from "../functions/authentication";

const AccountPage = (props) => {
  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);
  const userInfo = getUserInfo();
  const [selectedImage, setSelectedImage] = useState(null);
  const [newName, setNewName] = useState(userInfo.name);
  const [newId, setNewId] = useState(userInfo.id);

  const handleEditableClick = async (value) => {
    // when the user clicks done
    if (!value) {
      if (newName !== userInfo.name) {
        await updateDisplayName(newName);
        setUpdated(true);
      }

      if (selectedImage != null) {
        // replace null with image from azure storage
        console.log("updated avatar.");
        setUpdated(true);
      }
      setNewName(userInfo.name);
      setSelectedImage(null);
    }

    setEditable(value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

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
          {userInfo && (
            <>
              {editable ? (
                <>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      //onClick={handleUploadImage}
                      src={selectedImage && selectedImage}
                      sx={{
                        cursor: "pointer",
                        width: 100,
                        height: 100,
                        fontSize: 64,
                        color: (theme) => theme.palette.primary.main,
                        backgroundColor: (theme) =>
                          theme.palette.secondary.main,
                      }}
                    >
                      {userInfo.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ ml: 4 }}
                    >
                      Change avatar
                      <input
                        hidden
                        type="file"
                        onChange={(event) =>
                          setSelectedImage(
                            URL.createObjectURL(event.target.files[0])
                          )
                        }
                      />
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
              ) : (
                <>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 64,
                      color: (theme) => theme.palette.primary.main,
                      backgroundColor: (theme) => theme.palette.secondary.main,
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
              )}
            </>
          )}
          {updated && (
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
