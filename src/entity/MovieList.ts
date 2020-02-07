import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieList {
  @PrimaryGeneratedColumn()
  movie_list_id: number;

  @Column()
  title: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column('simple-json')
  movie_id_list: string[];
}
