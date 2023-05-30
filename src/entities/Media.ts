import { Entity, PrimaryGeneratedColumn, OneToMany, Column, OneToOne } from 'typeorm';
import { Recipe } from './Recipe';
import { Image } from './Image';
 
@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Image, image => image.media)
  images: Image[];

  @Column()
  video: string;

  @OneToOne(() => Recipe, recipe => recipe.media)
  recipe: Recipe;
  
}
//