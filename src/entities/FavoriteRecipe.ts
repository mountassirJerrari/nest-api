import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

@Entity()
export class FavoriteRecipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favoriteRecipes)
  user: User;

  @ManyToOne(() => Recipe, recipe => recipe.favoriteRecipes)
  recipe: Recipe;
}
