import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  @JoinColumn()
  recipe: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  @JoinColumn()
  ingredient: Ingredient;

  @Column()
  quantity: number;

  @Column()
  unit: string;
}
