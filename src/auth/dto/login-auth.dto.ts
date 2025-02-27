import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/auth.entity';

export class LoginDto {
  @ApiProperty({ example: 'usuario@example.com' })
  @IsEmail(
    {},
    {
      message: 'Por favor ingrese un correo electrónico válido',
    },
  )
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({ example: 'Juanito Perez' })
  @IsString()
  @MinLength(2, {
    message: 'El nombre debe contener por lo menos dos caracteres',
  })
  name: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.USER;
}
