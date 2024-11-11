import { StatusCodes } from "http-status-codes";

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
  accessToken: string | undefined;

  constructor(
    status: ResponseStatus,
    message: string,
    responseObject: T,
    statusCode: number,
    accessToken?: string
  ) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
    this.accessToken = accessToken;
  }

  static failed(errorMessage: string): ServiceResponse {
    return new ServiceResponse(
      ResponseStatus.Failed,
      errorMessage,
      null,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  static notFound(errorMessage: string): ServiceResponse {
    return new ServiceResponse(
      ResponseStatus.Failed,
      errorMessage,
      null,
      StatusCodes.NOT_FOUND
    );
  }

  static success<T>(message: string, responseObject?: T): ServiceResponse<T> {
    const data = responseObject !== undefined ? responseObject : (null as T);
    return new ServiceResponse<T>(
      ResponseStatus.Success,
      message,
      data,
      StatusCodes.OK
    );
  }

  static unauthorized<T>(
    message: string,
    responseObject?: T
  ): ServiceResponse<T> {
    const data = responseObject !== undefined ? responseObject : (null as T);
    return new ServiceResponse<T>(
      ResponseStatus.Failed,
      message,
      data,
      StatusCodes.UNAUTHORIZED
    );
  }

  static create<T>(message: string, responseObject?: T): ServiceResponse<T> {
    const data = responseObject !== undefined ? responseObject : (null as T);
    return new ServiceResponse<T>(
      ResponseStatus.Success,
      message,
      data,
      StatusCodes.CREATED
    );
  }

  static badrequest<T>(
    message: string,
    responseObject?: T
  ): ServiceResponse<T> {
    const data = responseObject !== undefined ? responseObject : (null as T);
    return new ServiceResponse<T>(
      ResponseStatus.Failed,
      message,
      data,
      StatusCodes.BAD_REQUEST
    );
  }
}
