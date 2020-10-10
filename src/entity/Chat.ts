import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Channel} from "./Channel";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @ManyToOne(() => User)
    author!: User;

    @ManyToOne(() => Channel)
    channel!: Channel;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;
}
