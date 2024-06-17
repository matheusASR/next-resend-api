/* eslint-disable import/no-anonymous-default-export */
import { handleError } from "./handleError.middlewares";
import { verifyEmailExists } from "./verifyEmailExists.middlewares";
import { validateBody } from "./validateBody.middlewares";

export default {
    handleError,
    verifyEmailExists,
    validateBody
}