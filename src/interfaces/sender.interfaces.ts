import { z } from "zod";
import {
    senderSchema, senderCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Sender } from "../entities";

type ISender = z.infer<typeof senderSchema>;
type SenderCreate = z.infer<typeof senderCreateSchema>

type SenderRepo = Repository<Sender>;

export type { ISender, SenderCreate, SenderRepo };