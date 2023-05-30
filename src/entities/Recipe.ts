import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './Category';
import { Instruction } from './Instruction';
import { Ingredient } from './Ingredient';
import { Media } from './Media';
import { Comment } from './Comment';
import { FavoriteRecipe } from './FavoriteRecipe';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  
  rating: number;

  @Column()
  
  view: number;

  @Column({ default: 10 }) // Set default value to 10
  time: number;


  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.recipes)
  category: Category;

  @OneToMany(() => Instruction, instruction => instruction.recipe)
  instructions: Instruction[];

  @OneToMany(() => FavoriteRecipe, favoriteRecipe => favoriteRecipe.recipe)
  favoriteRecipes: FavoriteRecipe[];

  @OneToMany(() => Comment, comment => comment.recipe)
  comments: Comment[];

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients: RecipeIngredient[];  
}
//