import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "token" })
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: string;

    @Column()
    token!: string;

    @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @Column({precision: null, type: "timestamp"})
    expired_at!: Date;

}