import { AppDataSource } from "../data-source";
import { Schedule } from "../entities/index";

export default AppDataSource.getRepository(Schedule);