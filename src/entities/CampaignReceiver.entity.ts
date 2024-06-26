import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campaign } from "./Campaign.entity";
import { Receiver } from "./Receiver.entity";

@Entity("campaign_receivers")
export class CampaignReceiver {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Campaign, campaign => campaign.campaign_receivers)
    campaign: Campaign;

    @ManyToOne(() => Receiver, receiver => receiver.campaign_receivers)
    receiver: Receiver;
}
