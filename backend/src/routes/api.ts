import express, { Request, Response, NextFunction } from "express";
import HttpError from "../utils/http-error";
import colorRouter from './colors.routes';

const api = express.Router();

api.use("/color", colorRouter);

/**
 * Unknown API routes handling
 */
api.use((req, res, next) => {
   throw new HttpError(`Unkown path ${req.method} ${req.path}`, 404);
});

/**
 * Error Handling
 */
api.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
   if (!error.code || !error.message) {
      error = new HttpError(error.message, error.code);
   }

   if (res.headersSent) {
      return next(error);
   }

   res.status(error.code);
   res.json({ message: error.message });
});

export default api;
