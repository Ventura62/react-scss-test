import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../general/slice";
import { idTokenKey } from "src/utils/userUtils";
import { formatObject } from "src/utils/others";
import https from "src/https/https";

const fetchGraphQL = async (query, variables = {}) => {
  try {
    const token = idTokenKey();
    if (!token) {
      console.log("Authentication token is missing.");
    }

    console.log("Sending GraphQL Query:", query);
    console.log("Variables:", variables);
    console.log("API Request URL:", https.defaults.baseURL); // Log the request URL

    const response = await https.post(
      "",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Full API Response:", response);
    console.log("Response Data:", response.data);

    if (!response.data || typeof response.data !== "object") {
      throw new Error("API response is invalid or not in JSON format.");
    }

    return response.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
};

const handleThunkError = (error, thunkAPI) => {
  const token = idTokenKey();
  if (!token) {
    return
  }
  console.error("Error:", error);
  const errorMessage = error.message || "An unknown error occurred";
  thunkAPI.dispatch(addNotification({ type: "danger", message: errorMessage, title: "Oops!" }));
  return thunkAPI.rejectWithValue(errorMessage);
};

export const getHealthMetrics = createAsyncThunk(
  "get-health-metrics",
  async (hostname, thunkAPI) => {
    try {
      const query = `query ($hostname: String!) { getHealthMetrics(hostname: $hostname) { client_id, hostname, metrics, timestamp, data } }`;
      const result = await fetchGraphQL(query, { hostname });
      console.log("get-health-metrics:", result);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getInterfaceMetrics = createAsyncThunk(
  "get-interface-metrics",
  async (interfaceName, thunkAPI) => {
    try {
      const query = `query ($interface: String!) { getInterfaceMetrics(interface: $interface) { client_id, interface, timestamp, metrics, data } }`;
      const result = await fetchGraphQL(query, { interface: interfaceName });
      console.log("get-interface-metrics:", result);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getProtocolsMetrics = createAsyncThunk(
  "get-protocols-metrics",
  async (hostname, thunkAPI) => {
    try {
      const query = `query ($hostname: String!) { getProtocolsMetrics(hostname: $hostname) { client_id, hostname, timestamp, metrics, protocol, data } }`;
      const result = await fetchGraphQL(query, { hostname });
      console.log("get-protocols-metrics:", result);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getAllHealthMetrics = createAsyncThunk(
  "get-all-health-metrics",
  async (_, thunkAPI) => {
    try {
      const query = `query { getAllHealthMetrics { client_id, hostname, metrics, timestamp, data } }`;
      const response = await fetchGraphQL(query);
      console.log("get-all-health-metrics response:", response);

      if (!response.data || !response.data.getAllHealthMetrics) {
        throw new Error("getAllHealthMetrics is missing in API response");
      }

      const result = formatObject(response.data.getAllHealthMetrics);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getAllInterfaceMetrics = createAsyncThunk(
  "get-all-interface-metrics",
  async (_, thunkAPI) => {
    try {
      const query = `query { getAllInterfaceMetrics { client_id, interface, timestamp, metrics, data } }`;
      const response = await fetchGraphQL(query);
      console.log("get-all-interface-metrics response:", response);

      if (!response.data || !response.data.getAllInterfaceMetrics) {
        throw new Error("getAllInterfaceMetrics is missing in API response");
      }

      const result = formatObject(response.data.getAllInterfaceMetrics);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const getAllProtocolsMetrics = createAsyncThunk(
  "get-all-protocols-metrics",
  async (_, thunkAPI) => {
    try {
      const query = `query { getAllProtocolsMetrics { client_id, hostname, timestamp, metrics, protocol, data } }`;
      const response = await fetchGraphQL(query);
      console.log("get-all-protocols-metrics response:", response);

      if (!response.data || !response.data.getAllProtocolsMetrics) {
        throw new Error("getAllProtocolsMetrics is missing in API response");
      }

      const result = formatObject(response.data.getAllProtocolsMetrics);
      return result;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);
