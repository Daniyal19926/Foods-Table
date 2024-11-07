import { auth } from "@services";
import { UserRegister } from "@types";
import axios from "axios";

//const API_BASEURL = "https://server.intensivecode.se/api/users";
const API_BASEURL = "http://localhost:5555/api/users";
const CREDENTIALS = "?username=daniyal&accessCode=aNbuKr";
async function register(user: UserRegister) {
  const { headers } = await axios.post(API_BASEURL + CREDENTIALS, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
}

export default { register };
