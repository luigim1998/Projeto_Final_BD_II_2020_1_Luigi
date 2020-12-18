import axios from "axios";

const neoApi = axios.create({
  baseURL: "http://localhost:3001",
});

export default neoApi;