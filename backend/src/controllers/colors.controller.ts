import { Request, Response, NextFunction } from "express";
import { ColorType, Colors } from "../types";
import { getRandomColorSpace } from "../colors/utils";
import { Color } from "../colors/Color";
import { RGBColor } from "../colors/RGBColor";
import { HSLColor } from "../colors/HSLColor";
import HttpError from "../utils/http-error";

function randomColors(req: Request, res: Response, next: NextFunction) {
  const limit = (req.query.limit as string) ?? "5";

  try {
    const colors: Colors[] = [];
    for (
      let numOfColors = parseInt(limit, 10);
      numOfColors > 0;
      numOfColors--
    ) {
      const type = getRandomColorSpace();
      let newColor: Color;
      switch (type) {
        case ColorType.RGB:
          newColor = new RGBColor();
          break;
        case ColorType.HSL:
          newColor = new HSLColor();
          break;
        default:
          newColor = new RGBColor();
          break;
      }

      colors.push(newColor.getDetails());
    }

    res.status(200).json(colors);
  } catch (err: any) {
    throw new HttpError(err.message || "Unkown error occurred!", 404);
  }
}

export default { randomColors };
