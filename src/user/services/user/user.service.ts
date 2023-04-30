import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { CreateUserdto } from 'src/user/dtos/CreateUserDto';
import { QueryFailedError, Repository } from 'typeorm';
@Injectable()
export class UserService {
   
    constructor(@InjectRepository(User)
    private userRepo: Repository<User>){

    }
    findAll(): Promise<User[]> {
        return this.userRepo.find();
      }
    
      findOne(id: number): Promise<User | null> {
        return this.userRepo.findOneBy({ id });
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
