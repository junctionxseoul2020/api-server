import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

@Entity()
export class Workspace {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}