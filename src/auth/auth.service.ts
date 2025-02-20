import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto/login-auth.dto';
import { User } from './entities/auth.entity';
import { AuthResponse } from './interfaces/AuthInterface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const isPassValid = await user.validatePassword(password);

    if (!isPassValid) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      access_token,
    };
  }

  async validateToken(token: string): Promise<AuthResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return {
        user,
        access_token: token,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const user = this.userRepository.create({
      email,
      password,
      name,
    });

    await this.userRepository.save(user);

    return user;
  }
}
