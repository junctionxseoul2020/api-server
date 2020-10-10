import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => User)
    participants!: User[];

    @ManyToOne(() => Workspace)
    workspace!: Workspace;
}
