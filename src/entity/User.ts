import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
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
    hashcode!: string;

    @Column({nullable: true})
    status!: string;

    @ManyToOne(() => Workspace)
    workspace!: Workspace;

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
