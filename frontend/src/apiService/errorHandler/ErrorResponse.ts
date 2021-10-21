import { AxiosResponse } from "axios";

export enum StatusCode {
  NotFound = 404,
  Forbidden = 403,
  InternalServerError = 500,
  BadRequest = 400,
}

export type ServerError = { errorMessage: string };

export class ErrorResponse {
	constructor(public message: AxiosResponse<ServerError>, public status: number) { 

  }
}

export  class  BadRequest  implements  ErrorResponse {
	constructor(public  message:   AxiosResponse<ServerError>, public  status:  number) { 

  }
} 

export  class  InternalServerError implements  ErrorResponse {
	constructor(public  message:   AxiosResponse<ServerError>, public  status:  number) { 

  }

}
export  class ForbiddenError implements  ErrorResponse {
  constructor(public  message:   AxiosResponse<ServerError>, public  status:  number) { 

  }
}
export  class NotFoundError implements  ErrorResponse {
  constructor(public  message:  AxiosResponse<ServerError>, public  status:  number) { 

  }
}