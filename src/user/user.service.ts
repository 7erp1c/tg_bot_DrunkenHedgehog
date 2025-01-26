import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  private _genUser(user: Partial<UserEntity>) {
    console.log('Generated user object:', user);
    return plainToInstance(UserEntity, user);
  }

  async getAll() {
    return this.userRepository.find();
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('create', createUserDto);
    return this.saveUser(createUserDto);
  }

  saveUser(user: Partial<UserEntity>) {
    console.log('Save user:', user);
    return this.userRepository.save(this._genUser(user));
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
