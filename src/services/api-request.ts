import { config } from "@/config/config";
import { HTTP_CODE } from "@/interface";

import type { IError } from "@/interface/response/error-response.interface";
import { getErrorMessage } from "@/utils/error-message";
import axios, { AxiosError, type AxiosResponse } from "axios";

const rootApi = config.BASE_URL;

const api = axios.create({
  baseURL: rootApi,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// request interceptor add header if available

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

// Response interceptor to handle response status

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === HTTP_CODE.OK) {
      console.log("Notify Sucess");
    }
    return response;
  },
  (error: AxiosError<IError>) => {
    if (!error.message) {
      return Promise.reject(error);
    }

    switch (error.response?.status) {
      case HTTP_CODE.BAD_REQUEST:
        break;

      // unauthorized access removed for this current app
      // case HTTP_CODE.UNAUTHORIZED:
      //   if (window.location.pathname !== ERROR_401) {
      //     window.location.href = ERROR_401;
      //   }
      //   break;

      case HTTP_CODE.FORBIDDEN:
        break;

      case HTTP_CODE.INTERNAL_SERVER_ERROR:
        break;
    }

    // getErrorMessage util function to get single string error message

    const errorMessage = getErrorMessage(error);

    return Promise.reject(errorMessage);
  }
);

export default api;
