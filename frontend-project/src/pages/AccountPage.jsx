import { Avatar, Typography } from "@mui/material";
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
          alignItems: "center",
        }}
      >
        {userInfo && (
          <>
          <Avatar sx={{width: 100, height: 100}}></Avatar>
            <Typography variant="h4" sx={{pt: 2}}>Name: {userInfo.name}</Typography>
            <Typography variant="h4">Id: {userInfo.id}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AccountPage;
