import { AxiosResponse } from "axios";

export enum StatusCode {
  NotFound = 404,
  Forbidden = 403,
  InternalServerError = 500,
  BadRequest = 400,
}

export type ServerError = { title: string; errors: Object };

export class ErrorResponse {
  constructor(
    public message: AxiosResponse<ServerError>,
    public status: number
  ) {
    console.log(message.data.errors);
  }
}

export class BadRequest implements ErrorResponse {
  constructor(
    public message: AxiosResponse<ServerError>,
    public status: number
  ) {
    console.log(message.data.errors);
  }
}

export class InternalServerError implements ErrorResponse {
  constructor(
    public message: AxiosResponse<ServerError>,
    public status: number
  ) {
    console.log(message.data.errors);
  }
}
export class ForbiddenError implements ErrorResponse {
  constructor(
    public message: AxiosResponse<ServerError>,
    public status: number
  ) {
    console.log(message.data.errors);
  }
}
export class NotFoundError implements ErrorResponse {
  constructor(
    public message: AxiosResponse<ServerError>,
    public status: number
  ) {
    console.log(message.data.errors);
  }
}
