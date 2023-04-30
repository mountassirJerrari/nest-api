// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Recipe, recipe => recipe.category)
  recipes: Recipe[];
}
