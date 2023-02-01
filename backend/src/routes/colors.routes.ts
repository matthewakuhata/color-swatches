import express from "express";
import colorsController from "../controllers/colors.controller";

const router = express.Router();

router.get("/", colorsController.randomColors);

export default router;