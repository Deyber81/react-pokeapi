import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

export const requestInterceptor = (config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
  };

  return config;
};

export const requestErrorInterceptor = (error: AxiosError) => {
  console.error("❌ Request error:", error.message);
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error("API error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No hubo respuesta del servidor:", error.message);
  } else {
    console.error("Error inesperado:", error.message);
  }

  return Promise.reject(error);
};
