import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { StudentsModule } from './students/students.module';
import { ApikeyModule } from './apikey/apikey.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3000', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    AuthModule,
    StudentsModule,
    ApikeyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
