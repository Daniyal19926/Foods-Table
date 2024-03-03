import { User, UserLogin } from "@types";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
const TOKEN_KEY = "token";
const API_BASEURL = "https://server.intensivecode.se/api/auth";
const CREDENTIALS = "?username=daniyal&accessCode=aNbuKr";

async function login(user: UserLogin) {
  const { data: token } = await axios.post(API_BASEURL + CREDENTIALS, user);
  localStorage.setItem("token", token);
}

function loginWithJwt(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

function getCurrentUser() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  try {
    const user = jwtDecode<User>(token);
    return user;
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
};
