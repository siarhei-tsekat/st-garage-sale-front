export interface Error {
    message: string;
    details: string;
  }
  export interface ApiResponse<T> {
    timestamp: string;
    payload: T;
    error: Error;
  }
  