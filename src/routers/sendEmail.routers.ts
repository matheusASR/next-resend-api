import { Router } from "express";
import middlewares from "../middlewares";
import { sendEmailControllers } from "../controllers";

export const emailRouter: Router = Router();

emailRouter.post("", sendEmailControllers.create);
