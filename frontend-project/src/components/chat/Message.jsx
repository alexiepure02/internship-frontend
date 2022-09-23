import { Grid, Paper, Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

function Message(props) {
  return (
    <Paper
      align={props.align}
      elevation={2}
      sx={{ maxWidth: 2 / 3, p: 0.8, backgroundColor: props.backgroundColor }}
    >
      <Typography>{props.text}</Typography>
    </Paper>
  );
}

export default Message;
