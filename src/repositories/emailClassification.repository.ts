import { AppDataSource } from "../data-source";
import { EmailClassification } from "../entities/index";

export default AppDataSource.getRepository(EmailClassification);