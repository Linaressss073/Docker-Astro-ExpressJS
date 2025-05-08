import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { usuario, clave, confirmar } = createUserDto;
    
    if (clave !== confirmar) {
      throw new ConflictException('Las contraseñas no coinciden');
    }
    
    const existingUser = await this.usersRepository.findOne({ where: { username: usuario } });
    
    if (existingUser) {
      throw new ConflictException('El usuario ya está registrado');
    }
    
    const user = this.usersRepository.create({
      username: usuario,
      password: clave,
      name: usuario
    });
    
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`Usuario ${username} no encontrado`);
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }
}