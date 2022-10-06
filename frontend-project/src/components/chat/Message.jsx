import { Typography, Card, Tooltip } from "@mui/material";

function Message(props) {
  return (
    <Tooltip title={props.time} placement={"left-" + props.position}>
      <Card
        align={props.position}
        elevation={2}
        sx={{ maxWidth: 2 / 3, p: 0.8, backgroundColor: props.backgroundColor }}
      >
        <Typography>{props.text}</Typography>
      </Card>
    </Tooltip>
  );
}

export default Message;
