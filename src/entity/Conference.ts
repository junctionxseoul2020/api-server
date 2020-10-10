import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";
import {Channel} from "./Channel";

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

    @OneToOne(() => Channel)
    channel!: Channel;

    @CreateDateColumn({type: 'timestamp'})
    createdAt!: Date

    @Column()
    releasedAt!: Date

    @ManyToOne(() => Workspace)
    workspace!: Workspace;
}
