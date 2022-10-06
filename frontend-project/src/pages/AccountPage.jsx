import { Avatar, Typography, Container, Box } from "@mui/material";

import { getUserInfo } from "../functions/authentication";

const AccountPage = (props) => {
  const userInfo = getUserInfo();

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
            <Avatar sx={{ width: 100, height: 100 }}></Avatar>
            <Typography variant="h4" sx={{ pt: 2 }}>
              Name: {userInfo.name}
            </Typography>
            <Typography variant="h4">Id: {userInfo.id}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default AccountPage;
