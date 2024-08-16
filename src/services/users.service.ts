// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../model/users.entity';
import { CreateUserDto } from './create-users.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      // Use bcryptjs to hash the provided password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // If the passwords match, return the user details excluding the password
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
  

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const saltRounds = 10;
    const { username, password, email, admin } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      admin,
    });

    await this.userRepository.save(newUser);
  }
}
