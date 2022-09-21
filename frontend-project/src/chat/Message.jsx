import { Grid, Paper, Box, Typography } from "@mui/material";

function Message(props) {
  return (
    <Paper elevation={2} sx={{ maxWidth: 2 / 3, p: 0.8 }}>
      <Typography align={props.align}>{props.text}</Typography>
    </Paper>
  );
}

export default Message;
