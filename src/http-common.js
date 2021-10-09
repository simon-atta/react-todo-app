import axios from "axios";

export default axios.create({
  baseURL: "https://database-311412.ew.r.appspot.com",
  headers: {
    "Content-type": "application/json"
  }
});