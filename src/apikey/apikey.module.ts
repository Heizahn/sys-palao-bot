import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyController } from './apikey.controller';
import { ApikeyService } from './apikey.service';
import { ApiKey } from './entities/api-key-entity';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApiKey]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ApiKeyController],
  providers: [ApikeyService, AuthGuard],
  exports: [ApikeyService],
})
export class ApikeyModule {}
