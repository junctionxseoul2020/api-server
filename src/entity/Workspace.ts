import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Workspace {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => User, (user) => user.workspace)
    participants!: User[];
}