import { Request, Response, NextFunction } from 'express';
import { Prisma } from '../generated/prisma/client';
import { string } from 'zod';

interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  let statusCode = 500;
  let status = 'error';
  let message = 'Something went wrong';

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
   
    message = 'Invalid input: required fields are missing or invalid.';
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
     message = String(err.meta?.cause || err.message);
   
  } else if (err && typeof err === 'object' && 'statusCode' in err) {
    const appErr = err as AppError;
    statusCode = appErr.statusCode || statusCode;
    status = appErr.status || status;
    message = appErr.message || message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    status,
    message,
    // stack: process.env.NODE_ENV === 'production' ? undefined : (err as any)?.stack,
  });
};
