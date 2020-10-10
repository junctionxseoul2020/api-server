import {Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @ManyToOne(() => User)
    author!: User;

    @ManyToMany(() => Workspace)
    workspace!: Workspace;

    @CreateDateColumn({type: "timestamp"})
    createdAt!: Date;
}
