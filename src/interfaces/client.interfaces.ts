import { z } from "zod";
import {
    clientSchema, clientCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Client } from "../entities";

type IClient = z.infer<typeof clientSchema>;
type ClientCreate = z.infer<typeof clientCreateSchema>

type ClientRepo = Repository<Client>;

export type { IClient, ClientCreate, ClientRepo };