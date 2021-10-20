import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../Utils/ApiRoutes";

enum StatusCode {
  NotFound = 404,
  Forbidden = 403,
  InternalServerError = 500,
}


const headers: Readonly<any> = { 
  'Content-Type' : 'application/json; charset=UTF-8',


};


class Http {
  private instance: AxiosInstance | null = null; // instance if undefined = null or AxiosInstance

  private get http(): AxiosInstance {// object
    return this.instance != null ? this.instance : this.initHttp(); // fetching fake data
  }

  initHttp() { // init method
    const http = axios.create({
      baseURL: BASE_URL,
      headers

    });


    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> { // T - our generic type, R - axios config
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>{
      return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }


  private handleError(error: any) { 
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        throw new Error("Server-sided error")
      }
      case StatusCode.Forbidden: {
        throw new Error("You cant access this data")
      }
      case StatusCode.NotFound: {
        throw new Error("Data was not found")
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();