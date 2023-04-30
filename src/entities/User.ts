// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Recipe } from './Recipe';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  name: string;

  @Column({unique : true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[];
  @BeforeInsert()
  async hashPassword() { 
    const hashedPassword =await  bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
}