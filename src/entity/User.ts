import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Workspace} from "./Workspace";
import has = Reflect.has;

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

    @Column({ nullable: true })
    status!: string;

    @ManyToOne(() => Workspace)
    workspace!: Workspace;

    toUser(name: string, email: string, password: string, hashcode: string, workspace: Workspace) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.hashcode = hashcode;
        this.workspace = workspace;
        return this;
    }
}
