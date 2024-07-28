import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Adjust based on your PostgreSQL server location
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Your PostgreSQL username
      password: '1234', // Your PostgreSQL password
      database: 'one-ie', // Name of your database
      autoLoadEntities: true,
      synchronize: true, // Automatically create database schema on every application launch
    }),
  ],
})
export class DatabaseModule {}
