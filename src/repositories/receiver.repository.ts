import { AppDataSource } from "../data-source";
import { Receiver } from "../entities/index";

export default AppDataSource.getRepository(Receiver);