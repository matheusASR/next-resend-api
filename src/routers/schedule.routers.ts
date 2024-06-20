import { Router } from "express";
import middlewares from "../middlewares";
import { scheduleControllers } from "../controllers";

export const scheduleRouter: Router = Router();

scheduleRouter.post("/:id", middlewares.verifyEmailExists, scheduleControllers.schedule);
scheduleRouter.get("", scheduleControllers.read);