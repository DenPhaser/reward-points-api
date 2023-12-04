import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customer')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    email: string;
  
    @Column({ length: 20 })
    phone: string;

    @Column()
    points: number;
}
