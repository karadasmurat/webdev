import axios from "axios";

// Request Config
const instance = axios.create({
  // `baseURL` will be prepended to url
  baseURL: "http://localhost:3000/",
  //   timeout: 1000,
  // `headers` are custom headers to be sent
  //  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
