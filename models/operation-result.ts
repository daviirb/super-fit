export const operationResult = Object.freeze({
  success,
  failure,
  apiFailure,
});

function success<T>(data: T): Success<T> {
  return {
    data,
    error: null,
  };
}

export type Success<T> = {
  data: T;
  error: null;
};

function failure(error: Failure['error']): Failure {
  return {
    data: null,
    error,
  };
}

export type Failure = {
  data: null;
  error: {
    message: string;
  };
};

type ApiFailure<T = unknown> = {
  data: null;
  error: T & {
    message: string;
    status: number;
  };
};

function apiFailure<T>(error: ApiFailure<T>['error']): ApiFailure<T> {
  return {
    data: null,
    error,
  };
}
