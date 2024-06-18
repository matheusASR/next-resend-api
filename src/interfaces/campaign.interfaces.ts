import { z } from "zod";
import {
    campaignSchema, campaignCreateSchema
} from "../schemas";
import { Repository } from "typeorm";
import { Campaign } from "../entities";

type ICampaign = z.infer<typeof campaignSchema>;
type CampaignCreate = z.infer<typeof campaignCreateSchema>

type CampaignRepo = Repository<Campaign>;

export type { ICampaign, CampaignCreate, CampaignRepo };