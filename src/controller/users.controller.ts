// src/users/users.controller.ts
import { Body, Controller, Post, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from 'src/services/create-users.dto';
import { AuthService } from 'src/services/auth.service';


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      console.log("Login ok :" + user.username);
      const token = await this.authService.login(user);
      return { loggedIn: true, ...token };
    } else {
      return { loggedIn: false };
    }
  }

  
}
