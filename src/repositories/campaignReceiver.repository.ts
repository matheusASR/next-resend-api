import { AppDataSource } from "../data-source";
import { CampaignReceiver } from "../entities/index";

export default AppDataSource.getRepository(CampaignReceiver);