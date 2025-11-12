import { Response } from 'express';

interface ApiResponse {
  status: string;
  message?: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  message?: string,
  data?: any
) => {
  const response: ApiResponse = {
    status: res.statusCode >= 400 ? 'error' : 'success',
    message,
    data,
  };

  return res.status( res.statusCode).json(response);
};
