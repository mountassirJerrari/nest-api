import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Utils {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToMany(() => Recipe)
  @JoinTable()
  recipes: Recipe[];
}
//