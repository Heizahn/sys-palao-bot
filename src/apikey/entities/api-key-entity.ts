import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  keyHash: string;

  @Column()
  @IsNotEmpty()
  botId: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @Column('simple-array')
  @IsArray()
  @Transform(
    ({ value }): string[] => (Array.isArray(value) ? value : value.split(',')),
    {
      toClassOnly: true,
    },
  )
  permissions: string[];

  @Column({ type: 'integer', default: 1000 })
  @IsNumber()
  @Min(1)
  rateLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUsed: Date;
}
