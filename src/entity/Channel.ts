import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {User} from "./User";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({default: false})
    isDM!: boolean;

    @Column({default: false})
    isConference!: boolean;

    @Column({default: false})
    isInstantMessage!: boolean;

    @Column({default: false})
    isPrivate!: boolean;

    @ManyToMany(() => User, user => user.channels)
    @JoinTable()
    participants!: User[];

    @ManyToOne(() => Workspace)
    workspace!: Workspace;
}
