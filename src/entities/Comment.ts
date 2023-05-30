import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './Recipe';
import { User } from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Recipe, recipe => recipe.comments)
  recipe: Recipe;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
//