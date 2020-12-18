import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('history')
export default class History{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userid: number;

  @Column()
  username: string;

  @Column()
  time: string;
}