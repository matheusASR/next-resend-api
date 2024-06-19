import { Router } from "express";
import { emailControllers } from "../controllers";

export const emailRouter: Router = Router();

emailRouter.post("", emailControllers.create);
emailRouter.post("/resend", emailControllers.resend);
emailRouter.post("/resendScheduled", emailControllers.resendScheduled);
