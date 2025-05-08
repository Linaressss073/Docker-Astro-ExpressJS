import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      const isPasswordValid = await user.validatePassword(password);
      
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const { usuario, clave } = loginDto;
    const user = await this.validateUser(usuario, clave);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    const payload = { username: user.username, sub: user.id };
    
    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}