import { AppDataSource } from "../data-source";
import { Sender } from "../entities/index";

export default AppDataSource.getRepository(Sender);