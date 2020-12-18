import axios from "axios";

const mongoApi = axios.create({
  baseURL: "http://localhost:3002",
});

export default mongoApi;