import { useEffect } from "react";
import { useState, createContext } from "react";
import { checkIfAuthenticated, getUserInfo } from "./functions/authentication";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const isAuthenticated = checkIfAuthenticated();
    if (isAuthenticated) {
      const userInfo = getUserInfo();
      setUserContext(userInfo);
    }
  }, []);

  const setUserContext = async (userInfo) => {
    setUserId(parseInt(userInfo.id));
    setUserName(userInfo.name);

    if (userInfo.hasOwnProperty("avatarUri")) {
      const blob = await fetch(userInfo.avatarUri, {
        cache: "reload",
      }).then((r) => r.blob());
      setUserAvatar(URL.createObjectURL(blob));
    } else setUserAvatar(null);
  };

  const value = {
    userId,
    setUserId,
    userName,
    setUserName,
    userAvatar,
    setUserAvatar,
    setUserContext,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
