import { z } from "zod";
import {
    emailClassificationSchema, emailClassificationCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { EmailClassification } from "../entities";

type IEmailClassification = z.infer<typeof emailClassificationSchema>;
type EmailClassificationCreate = z.infer<typeof emailClassificationCreateSchema>

type EmailClassificationRepo = Repository<EmailClassification>;

export type { IEmailClassification, EmailClassificationCreate, EmailClassificationRepo };