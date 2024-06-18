import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client.entity";
import { EmailClassification } from "./EmailClassification.entity";
import { CampaignReceiver } from "./CampaignReceiver.entity";

@Entity("campaigns")
export class Campaign {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 50 })
    type: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @OneToMany(() => EmailClassification, classification => classification.campaign)
    classifications: EmailClassification[];

    @OneToMany(() => CampaignReceiver, campaignReceiver => campaignReceiver.campaign)
    campaign_receivers: CampaignReceiver[];

    @ManyToOne(() => Client, client => client.campaigns)
    client: Client;
}

