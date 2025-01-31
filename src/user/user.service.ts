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
    ) {}

    private _genUser(user: Partial<UserEntity>) {
        return plainToInstance(UserEntity, user);
    }

    async getUsersOrGetUserById(userId?: number) {
        if (userId) {
            return await this.userRepository.findOneOrFail({
                where: { id: userId },
                relations: ['feedback'],
            });
        }
        return await this.userRepository.find({
            relations: ['feedback'],
            order: {
                feedback: {
                    updateDate: 'DESC', // Сортировка от новых к старым
                },
            },
        });
    }

    create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.saveUser(createUserDto);
    }

    saveUser(user: Partial<UserEntity>) {
        return this.userRepository.save(this._genUser(user));
    }

    findById(id: number) {
        return this.userRepository.findOneBy({ id });
    }
}
