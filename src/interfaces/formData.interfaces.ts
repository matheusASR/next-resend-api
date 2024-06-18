import { z } from "zod";
import {
    formDataSchema
} from "../schemas";

type IFormData = z.infer<typeof formDataSchema>;

export type { IFormData };