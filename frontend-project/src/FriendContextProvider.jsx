import { useState, createContext } from "react";

export const FriendContext = createContext();

export const FriendContextProvider = ({ children }) => {
  const [friendName, setFriendName] = useState(null);

  const value = { friendName, setFriendName };
  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};
