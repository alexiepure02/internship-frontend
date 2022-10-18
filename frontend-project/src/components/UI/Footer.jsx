import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      maxWidth="1"
      sx={{
        position: "absolute",
        bottom: 0,
        bgcolor: "primary.main",
        color: "secondary.light",
      }}
    >
      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Chat App</Typography>
        <Typography sx={{ flexGrow: 1 }} />
        <Typography>Amdaris @ {new Date().getFullYear()}</Typography>
      </Box>
    </Container>
  );
};

export default Footer;
