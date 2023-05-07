// recipe.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  title: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  @ManyToOne(() => User, user => user.recipes)
  user: User;

  @ManyToOne(() => Category, category => category.recipes)
  category: Category;
}
