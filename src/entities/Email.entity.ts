import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EmailClassification } from "./EmailClassification.entity";
import { Sender } from "./Sender.entity";

@Entity("emails")
export class Email {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column("text")
    body: string;

    @Column("bytea", { nullable: true })
    image: Buffer;

    @Column("bytea", { nullable: true })
    html_file: Buffer;  

    @ManyToOne(() => EmailClassification, classification => classification.emails)
    classification: EmailClassification;

    @ManyToOne(() => Sender, sender => sender.emails)
    sender: Sender;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;
}

