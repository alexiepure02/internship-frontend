import { Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Container, Box } from "@mui/material";
import jwtDecode from "jwt-decode";

const AccountPage = (props) => {
  const userInfo = jwtDecode(localStorage.getItem("auth-token"));

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        {userInfo && (
          <>
          <Typography variant="h2"sx={{mb: 4}}>Account page</Typography>
            <Typography variant="h4">Name: {userInfo.name}</Typography>
            <Typography variant="h4">Id: {userInfo.id}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AccountPage;
