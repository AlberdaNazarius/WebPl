import {toast} from "react-toastify";

export interface ApiError extends Error {
  webMessage?: string;
  response?: {
    status: number;
    data: any;
  };
}

const STATUS_CODES_MESSAGES = {
  '400': 'Bad request',
  '401': 'User not authorized',
  '403': 'You do not have permission to access this resource',
  '404': 'Page not Found',
  '500': 'An unexpected error occurred on the server. Please try again later',
  '504': 'The server is not responding. Try again later'
}

class ApiErrorHandler {
  private static errorOccurred = false;

  public static handleApiError(error: ApiError): void {
    this.errorOccurred = true;

    const webMessage = error.webMessage || 'An error occurred';
    const errorMessage = error.message || 'Unknown error';

    toast(`${webMessage}`, {type: 'error'});
    console.error('API Error Handler:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }

  public static handleError(error: ApiError): void {
    this.errorOccurred = true;

    const status = error.response?.status;
    const webMessage = status ? STATUS_CODES_MESSAGES[status] : 'Unknown error occurred';
    const errorMessage = error.message || 'Unknown error';

    toast(`${webMessage}`, {type: 'error'});
    console.error('API Error Handler:', {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }

  public static clearError(): void {
    this.errorOccurred = false;
  }

  public static hasError(): boolean {
    return this.errorOccurred;
  }
}

export const buildApiError = (
  error: any,
  webMessage?: string,
  status?: number
): ApiError => {
  return {
    name: error.name || 'Error',
    message: error.message || 'Unknown error',
    webMessage,
    response: {
      status: error.status || status,
      data: error.data && error.data.message ? error.data.message : 'Unknown error'
    }
  };
};

export default ApiErrorHandler;