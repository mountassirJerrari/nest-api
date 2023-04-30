import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { CreateUserdto } from 'src/user/dtos/CreateUserDto';
import { Repository } from 'typeorm';
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
    
      async remove(id: number): Promise<void> {
        await this.userRepo.delete(id);
      }
      create(data: CreateUserdto) {
      let user : User =  this.userRepo.create({...data})
      this.userRepo.save(user);
      console.log(user);
      
    }
}
