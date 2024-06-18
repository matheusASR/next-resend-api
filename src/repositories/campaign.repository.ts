import { AppDataSource } from "../data-source";
import { Campaign } from "../entities/index";

export default AppDataSource.getRepository(Campaign);