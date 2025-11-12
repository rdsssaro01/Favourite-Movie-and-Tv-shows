import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    return  next();
    } catch (err) {
        console.log("error",err);
        
      if (err instanceof ZodError) {
        // Extract readable errors
        const formattedErrors = err.issues.map(e => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }

      // If some other error
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
