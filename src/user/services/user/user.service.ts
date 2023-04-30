import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { CreateUserdto } from 'src/dtos/CreateUserDto';
import { QueryFailedError, Repository } from 'typeorm';
@Injectable()
export class UserService {
   
    constructor(@InjectRepository(User)
    private userRepo: Repository<User>){

    }
    findAll(): Promise<User[]> {
        return this.userRepo.find();
      }
      findOne(id: string): Promise<User | null> ;    
      findOne(id: number): Promise<User | null> ;
      findOne(id: any): Promise<User | null> {
        if (typeof id == "number") {
             this.userRepo.findOneBy({ id });

        }
        return this.userRepo.findOneBy({ name : id });

      }
      
    
      async remove(id: number): Promise<User> {
        let user  : User = await this.findOne(id) ; 
        await this.userRepo.delete(id);
        return user ;

      }

      async create(data: CreateUserdto) {
        
      let user : User =  this.userRepo.create({...data})
      try {
        return await this.userRepo.save(user);
      } catch (error) {
        if (error instanceof QueryFailedError  ) {
          throw new HttpException('User with this email already exists' , HttpStatus.BAD_REQUEST);
      }   
    }}
}
