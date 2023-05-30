// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Comment } from './Comment';
import { FavoriteRecipe } from './FavoriteRecipe';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  username: string;

  @Column({unique : true})
  email: string;

  @Column()
  password: string;
  @Column()
  avatar: string;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => FavoriteRecipe, favoriteRecipe => favoriteRecipe.user)
  favoriteRecipes: FavoriteRecipe[];

  
  @BeforeInsert()
  async hashPassword() { 
    const hashedPassword =await  bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
}
//