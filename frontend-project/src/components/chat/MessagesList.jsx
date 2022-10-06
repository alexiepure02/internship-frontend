import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Message from "./Message";

const START_INDEX = 500;

function MessagesList({ messages, startReached, virtuoso }) {
  // START_INDEX starting value is the max value, makes figuring out the index in the messages array easier
  const [firstItemIndex, setFirstItemIndex] = useState(
    START_INDEX - messages.length
  );

  console.log("MessagesList: Starting firstItemIndex", firstItemIndex);
  console.log("MessagesList: Starting messages length", messages.length);

  // keep a copy of messages so I can set the next first item index before new messages set
  const internalMessages = useMemo(() => {
    const nextFirstItemIndex = START_INDEX - messages.length;
    setFirstItemIndex(nextFirstItemIndex);
    return messages;
  }, [messages]);

  const itemContent = useCallback((index, message) => {
    //<Grid item container key={index} justifyContent="flex-end">
    return (
      <ListItem>
        <Message
          position="end"
          backgroundColor={(theme) => theme.palette.secondary.dark}
          idSender={message.idSender}
          idReceiver={message.idReceiver}
          text={message.text}
          time={message.dateTime}
        />
      </ListItem>
    );
    // </Grid>
  }, []);

  // setting 'auto' for behavior does help in this sample, but not in my actual code
  const followOutput = useCallback((isAtBottom) => {
    console.log("MessagesList: followOutput isAtBottom", isAtBottom);
    return isAtBottom ? "smooth" : false;
  }, []);

  return (
    <List
      sx={{
        height: 1000,
        pb: 8,
        position: "relative"
      }}
    >
      <Virtuoso
        ref={virtuoso}
        initialTopMostItemIndex={internalMessages.length - 1}
        firstItemIndex={Math.max(0, firstItemIndex)}
        itemContent={itemContent}
        data={internalMessages}
        startReached={startReached}
        followOutput={followOutput}
        style={{ height: "100%", overscrollBehavior: "contain" }}
      />
    </List>
  );
}

export default MessagesList;
