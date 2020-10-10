import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Workspace} from "./Workspace";
import {Channel} from "./Channel";
import {Conference} from "./Conference";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    hashcode!: string;

    @Column({nullable: true})
    status!: string;

    @Column({nullable: true})
    photo!: string;

    @ManyToOne(() => Workspace)
    workspace!: Workspace;

    @ManyToMany(() => Channel, channel => channel.participants)
    channels!: Channel[];

    @ManyToMany(() => Conference, conference => conference.participants)
    conferences!: Conference[];

    toUser(name: string, email: string, password: string, status: string, hashcode: string, workspace: Workspace) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
        this.hashcode = hashcode;
        this.workspace = workspace;
        return this;
    }
}
