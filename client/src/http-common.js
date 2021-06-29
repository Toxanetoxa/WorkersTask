import axios from "axios";

export default axios.create({
  baseURL: ["http://185.233.2.180:8080/api",
            "http://localhost:8080/api",],
  headers: {
    "Content-type": "application/json"
  }
});
