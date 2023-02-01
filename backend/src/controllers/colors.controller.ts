import { Request, Response, NextFunction } from "express";
import { ColorGenerator } from "../color-generator/color-generator";
import { Colors } from '../types';
import HttpError from "../utils/http-error";

function randomColors(req: Request, res: Response, next: NextFunction) {
   const limit = req.query.limit as string ?? "5";
   const generator = new ColorGenerator();
   try {
      const colors: Colors[] = [];
      for (let numOfColors = parseInt(limit, 10); numOfColors > 0; numOfColors--) {
         colors.push(generator.generate())
      }

      res.status(200).json(colors);
   } catch (err: any) {
      throw new HttpError(err.message || "Unkown error occurred!", 404)
   }
}

export default { randomColors };