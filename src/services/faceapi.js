import axios from "axios";
import { AZURE_BASE_URL, AZURE_KEY } from "@env";

const faceapi = axios.create({
  baseURL: AZURE_BASE_URL,
  headers: {
    "Ocp-Apim-Subscription-Key": AZURE_KEY,
  },
});

export default faceapi;
