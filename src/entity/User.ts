import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Workspace} from "./Workspace";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    hashcode!: number;

    @ManyToOne(() => Workspace)
    workspace!: Workspace;

}