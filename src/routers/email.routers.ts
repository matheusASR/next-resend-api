import { Router } from "express";
import middlewares from "../middlewares";
import { emailControllers } from "../controllers";

export const emailRouter: Router = Router();

emailRouter.post("", emailControllers.create);
emailRouter.get("", emailControllers.read);
emailRouter.post("/resend/:id", middlewares.verifyEmailExists, emailControllers.resend);
