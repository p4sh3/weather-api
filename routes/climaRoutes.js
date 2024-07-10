import { Router } from "express";
import { getClimaController } from "../controllers/climaController.js";

export const weatherRouter = Router();

weatherRouter.get("/", getClimaController);

