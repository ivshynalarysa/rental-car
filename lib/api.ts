import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
