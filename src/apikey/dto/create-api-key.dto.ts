import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateApiKeyDto {
  @IsNotEmpty()
  @IsString()
  botId: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  rateLimit?: number;
}
