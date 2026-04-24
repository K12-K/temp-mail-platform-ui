import axios from "axios";

export const api = axios.create({
  baseURL: process.env.SERVICE_URL, // change this
});
