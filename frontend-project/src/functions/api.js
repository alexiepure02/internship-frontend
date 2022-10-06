import axios from "axios";
import { getToken, getUserInfo } from "./authentication";

export const getMessages = async (friendId) => {
  const token = getToken();
  const userId = getUserInfo().id;

  const response = await axios.get(
    "https://localhost:7228/api/messages/" + userId + "," + friendId,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const getSomeMessages = async (friendId, offset, numberOfMessages) => {
  const token = getToken();
  const userId = getUserInfo().id;

  const response = await axios.get(
    "https://localhost:7228/api/messages/" +
      userId +
      "," +
      friendId +
      "/" +
      offset +
      "," +
      numberOfMessages,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const postMessage = async (message, connectionId) => {
  const token = getToken();

  await axios.post("https://localhost:7228/api/messages/msg", message, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-signalr-connection": connectionId,
    },
  });
};

export const getFriends = async () => {
  const token = getToken();
  const userId = getUserInfo().id;

  const response = await axios.get(
    "https://localhost:7228/api/users/" + userId + "/friends",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const deleteFriend = async (friendId) => {
  const token = getToken();
  const userId = getUserInfo().id;

  await axios.delete(
    "https://localhost:7228/api/users/" + userId + "/friends/" + friendId,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getFriendRequests = async () => {
  const token = getToken();
  const userId = getUserInfo().id;

  const response = await axios.get(
    "https://localhost:7228/api/users/" + userId + "/friend-requests",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const addFriendRequest = async (friendId) => {
  const token = getToken();
  const userId = getUserInfo().id;

  await axios.post(
    "https://localhost:7228/api/users/friend-requests",
    {
      idUser: friendId,
      idRequester: userId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const updateFriendRequest = async (requesterId, accepted) => {
  const token = getToken();
  const userId = getUserInfo().id;

  await axios.put(
    "https://localhost:7228/api/users/friend-requests/" + accepted,
    {
      idUser: userId,
      idRequester: requesterId,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
