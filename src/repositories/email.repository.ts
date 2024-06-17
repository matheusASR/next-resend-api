import { AppDataSource } from "../data-source";
import { Email } from "../entities/index";

export default AppDataSource.getRepository(Email);