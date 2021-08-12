import axios from "axios";
import { AUTH_BASE_URL } from "@env";

const auth = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
