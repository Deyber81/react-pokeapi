import type {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers ?? ({} as AxiosRequestHeaders);

  config.headers["Content-Type"] = "application/json";

  if (import.meta.env.DEV) {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
  }

  return config;
};

export const requestErrorInterceptor = (error: AxiosError) => {
  console.error("❌ Request error:", error.message);
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse) => {
  if (import.meta.env.DEV) {
    console.log("⬅️ Response:", response.config.url, response.status);
  }
  return response;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error("❌ API error:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("⚠️ No hubo respuesta del servidor:", error.message);
  } else {
    console.error("💥 Error inesperado:", error.message);
  }
  return Promise.reject(error);
};
