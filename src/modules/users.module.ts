// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../model/users.entity';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controller/users.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  ConfigModule.forRoot(), //Load env config
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY, // Replace with your own secret
    signOptions: { expiresIn: '1h' }, // Token expiration time
  }), ], 
  providers: [UsersService, AuthService],
  controllers: [UsersController],
}) 
export class UsersModule {}
