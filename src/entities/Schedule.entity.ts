import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Email } from "./Email.entity";
import { Receiver } from "./Receiver.entity";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "date" })
    send_date: string;

    @Column({ type: "time" })
    send_time: string;

    @Column({ length: 50 })
    status: string;

    @Column("text", { nullable: true })
    error: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @ManyToOne(() => Email, email => email.id)
    email: Email;

    @ManyToOne(() => Receiver, receiver => receiver.schedules)
    receiver: Receiver;
}
