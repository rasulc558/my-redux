import axios from "axios";

const request = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

const httpServices = {
  get: request.get,
};

export default httpServices;
