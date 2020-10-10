import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Workspace} from "./Workspace";
import has = Reflect.has;

@Entity()
export class Chat {

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
}
