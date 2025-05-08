import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  usuario!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  clave!: string;

  @IsString()
  @IsNotEmpty()
  confirmar!: string;
}