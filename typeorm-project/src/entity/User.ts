import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tweet } from "./Tweet";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(type => Tweet, tweet => tweet.user)
    tweets: Promise<Tweet[]>;

    @Column({ type: "int" })
    role: number;
}
