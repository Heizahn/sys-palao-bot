import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/login-auth.dto';
import { AuthResponse } from './interfaces/AuthInterface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login de usuario',
    description: 'Endpoint para autenticar usuarios con email y contraseña',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        user: {
          id: '1',
          email: 'usuario@ejemplo.com',
          name: 'Usuario Ejemplo',
        },
        access_token: 'eyJhbGciOiJIUzI1NiIs...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registro de usuario',
    description: 'Endpoint para registrar un nuevo usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        user: {
          id: '1',
          email: 'usuario@ejemplo.com',
          name: 'Usuario Ejemplo',
        },
        access_token: 'eyJhbGciOiJIUzI1NiIs...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Ocurrió un error al crear el usuario',
  })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('validate')
  async validateToken(@Body() body: { token: string }): Promise<AuthResponse> {
    return await this.authService.validateToken(body.token);
  }
}
