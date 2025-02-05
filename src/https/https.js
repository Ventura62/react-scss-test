import axios from "axios";
import { idTokenKey } from "src/utils/userUtils";

const https = axios.create();

https.interceptors.request.use(
  (config) => {
    const token = idTokenKey();
    const baseURL = process.env.REACT_APP_BASE_URL || "https://zpnp2kapofhzbpq5nknmbrkpwe.appsync-api.us-east-1.amazonaws.com/graphql";

    console.log("Base URL:", baseURL);
    console.log("Auth Token:", token);

    if (!token) {
      console.error("⚠️ Missing Auth Token!");
    }

    config.baseURL = baseURL;
    config.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Only add Authorization if token exists
    };

    return config;
  },
  (error) => Promise.reject(error)
);

https.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default https;
