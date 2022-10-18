import { Grid } from "@mui/material";
import React, { useMemo, useState, useContext, useCallback } from "react";

import { Virtuoso } from "react-virtuoso";
import { FriendContext } from "../../FriendContextProvider";
import { UserContext } from "../../UserContextProvider";
import Message from "./Message";

function MessagesList({ messages, startReached, virtuoso, startIndex }) {
  const { friendId } = useContext(FriendContext);
  const { userId } = useContext(UserContext);

  const [firstItemIndex, setFirstItemIndex] = useState(
    startIndex - messages.length
  );

  // console.log("MessagesList: Starting firstItemIndex", firstItemIndex);
  // console.log("MessagesList: Starting messages length", messages.length);

  // keep a copy of messages so I can set the next first item index before new messages set
  const internalMessages = useMemo(() => {
    const nextFirstItemIndex = startIndex - messages.length;
    setFirstItemIndex(nextFirstItemIndex);
    return messages;
  }, [messages]);

  const itemContent = (index, message) => {
    let position = "start";
    let tooltip = "right";
    let color = "main";

    if (message.idSender == userId && message.idReceiver == friendId) {
      position = "end";
      tooltip = "left";
      color = "dark";
    }

    return (
      <Grid
        item
        container
        justifyContent={"flex-" + position}
        sx={{ pb: 1, pl: 1, pr: 1 }}
      >
        <Message
          position={position}
          tooltip={tooltip}
          backgroundColor={"secondary." + color}
          idSender={message.idSender}
          idReceiver={message.idReceiver}
          text={message.text}
          time={message.dateTime}
        />
      </Grid>
    );
  };

  const followOutput = useCallback((isAtBottom) => {
    console.log("is at bottom: ", isAtBottom);
    return isAtBottom ? "auto" : false;
  }, []);

  return (
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
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
        style={{ flex: "1 1 auto", overscrollBehavior: "contain" }}
      />
    </div>
  );
}

export default MessagesList;
