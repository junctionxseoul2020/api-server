import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    participants!: User[];

    @Column()
    password!: string;

    @Column()
    hashcode!: string;

    @Column({nullable: true})
    status!: string;

    @ManyToOne(() => Workspace)
    workspace!: Workspace;
}
