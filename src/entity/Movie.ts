import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  running_time: string;

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column()
  imdb_rating: string;

  @Column()
  actors: string;

  @Column()
  created_at: Date;
}
