import { Router } from "express";
import { emailControllers } from "../controllers";

export const emailRouter: Router = Router();

emailRouter.post("", emailControllers.create);
emailRouter.get("", emailControllers.read);
emailRouter.post("/resend", emailControllers.resend);
emailRouter.post("/resendScheduled", emailControllers.resendScheduled);
