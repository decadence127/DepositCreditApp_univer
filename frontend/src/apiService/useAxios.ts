import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { BASE_URL } from "../Utils/ApiRoutes";
import {
  BadRequest,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServerError,
  StatusCode,
} from "./errorHandler/ErrorResponse";

const headers: Readonly<any> = {
  "Content-Type": "application/json; charset=UTF-8",
};

class Http {
  private instance: AxiosInstance | null = null; // instance if undefined = null or AxiosInstance

  private get http(): AxiosInstance {
    // object
    return this.instance != null ? this.instance : this.initHttp(); // fetching fake data
  }

  initHttp() {
    // init method
    const http = axios.create({
      baseURL: BASE_URL,
      headers,
    });

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    // T - our generic type, R - axios config
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  handleError(error: AxiosError<ServerError>) {
    const { response } = error;

    switch (response!.status) {
      case StatusCode.InternalServerError: {
        throw new InternalServerError(response!, response?.status ?? 500);
      }
      case StatusCode.Forbidden: {
        throw new ForbiddenError(response!, response!.status ?? 401);
      }
      case StatusCode.NotFound: {
        throw new NotFoundError(response!, response!.status ?? 404);
      }
      case StatusCode.BadRequest: {
        throw new BadRequest(response!, response?.status ?? 400);
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
