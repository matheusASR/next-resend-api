import { z } from "zod";
import {
    receiverSchema, receiverCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Receiver } from "../entities";

type IReceiver = z.infer<typeof receiverSchema>;
type ReceiverCreate = z.infer<typeof receiverCreateSchema>

type ReceiverRepo = Repository<Receiver>;

export type { IReceiver, ReceiverCreate, ReceiverRepo };