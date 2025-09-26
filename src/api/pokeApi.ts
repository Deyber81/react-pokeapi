import axios from "axios";
import {
  requestInterceptor,
  requestErrorInterceptor,
  responseInterceptor,
  responseErrorInterceptor,
} from "./interceptors";

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

pokeApi.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
pokeApi.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);
