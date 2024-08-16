// src/@types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with a specific user type if you have one
    }
  }
}
