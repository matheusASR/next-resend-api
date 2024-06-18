import { AppDataSource } from "../data-source";
import { Client } from "../entities/index";

export default AppDataSource.getRepository(Client);