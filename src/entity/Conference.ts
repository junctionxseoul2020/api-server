import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";

@Entity()
export class Conference {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToMany(() => User, user => user.conferences)
    @JoinTable()
    participants!: User[];

    @CreateDateColumn({type: 'timestamp'})
    createdAt!: Date

    @Column()
    releasedAt!: Date

    @ManyToOne(() => Workspace)
    workspace!: Workspace;
}
