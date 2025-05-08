import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('api/registro')
  async create(@Body() createUserDto: any) {
    await this.usersService.create(createUserDto);
    
    return {
      success: true,
      message: 'Usuario creado correctamente'
    };
  }
}