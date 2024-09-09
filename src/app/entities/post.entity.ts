import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    category: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}