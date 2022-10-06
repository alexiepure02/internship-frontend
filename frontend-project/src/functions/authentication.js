import axios from "axios";
import jwtDecode from "jwt-decode";

export const register = async (username, password, displayName) => {
  await axios.post("https://localhost:7228/api/users/register", {
    userName: username,
    password: password,
    displayName: displayName,
  });
};

export const login = async (username, password) => {
  const response = await axios.post("https://localhost:7228/api/users/login", {
    userName: username,
    password: password,
  });

  localStorage.setItem("auth-token", response.data.token);
};

export const logout = () => {
  localStorage.removeItem("auth-token");
};

export const checkIfTokenExpired = () => {
  const exp = jwtDecode(localStorage.getItem("auth-token")).exp;

  if (exp * 1000 < Date.now()) {
    logout();
  }
};

export const checkIfAuthenticated = () => !!localStorage.getItem("auth-token");

export const getUserInfo = () => jwtDecode(localStorage.getItem("auth-token"));

export const getToken = () => localStorage.getItem("auth-token");
