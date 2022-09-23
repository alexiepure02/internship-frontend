import axios from "axios";
import React from "react";
import { useState } from "react";

export const UserContext = React.createContext({
  idLogged: 0,
  setIdLogged: () => {},
  idFriend: 0,
  setIdFriend: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
});
