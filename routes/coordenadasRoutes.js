import { Router } from "express";
import { getCoordenadasController } from "../controllers/coordenadasController.js";

export const coordinatesRouter = Router();

coordinatesRouter.get("/", getCoordenadasController);


